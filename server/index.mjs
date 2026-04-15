import "dotenv/config";
import express from "express";
import { Resend } from "resend";
import { z } from "zod";

const app = express();
const PORT = Number(process.env.PORT ?? 3001);
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;

const requestsByIp = new Map();
let resendClient;

app.use(express.json({ limit: "100kb" }));

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().default(""),
  services: z.array(z.string().trim().min(1).max(100)).max(20).optional().default([]),
  preferredTimes: z.array(z.string().trim().min(1).max(100)).max(20).optional().default([]),
  message: z.string().trim().max(2000).optional().default(""),
  lang: z.enum(["pt", "en"]).optional().default("pt"),
  website: z.string().trim().max(200).optional().default(""),
});

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.length > 0) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.socket.remoteAddress ?? "unknown";
}

function isAllowedByRateLimit(ip) {
  const now = Date.now();
  const previous = requestsByIp.get(ip) ?? [];
  const recent = previous.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestsByIp.set(ip, recent);
    return false;
  }

  recent.push(now);
  requestsByIp.set(ip, recent);
  return true;
}

function getMailTo() {
  return process.env.MAIL_TO || process.env.PSYCHOLOGIST_EMAIL || "";
}

function validateResendConfig() {
  const missing = [];

  if (!process.env.RESEND_API_KEY) {
    missing.push("RESEND_API_KEY");
  }

  if (!getMailTo()) {
    missing.push("MAIL_TO");
  }

  return missing;
}

function getResendClient() {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }

  return resendClient;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function listOrFallback(list, fallback) {
  return list.length > 0 ? list.join(", ") : fallback;
}

function buildMailBody(data, clientIp) {
  const now = new Date();
  const sentAt = now.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const isEnglish = data.lang === "en";

  const labels = {
    title: isEnglish ? "New website contact" : "Novo contato pelo site",
    sentAt: isEnglish ? "Submitted at" : "Data/hora",
    language: isEnglish ? "Language" : "Idioma",
    ip: "IP",
    name: isEnglish ? "Name" : "Nome",
    email: "Email",
    phone: isEnglish ? "Phone" : "Telefone",
    services: isEnglish ? "Areas of interest" : "Areas de interesse",
    preferredTimes: isEnglish ? "Preferred times" : "Horarios preferidos",
    message: isEnglish ? "Message" : "Mensagem",
  };

  const services = listOrFallback(data.services, isEnglish ? "Not informed" : "Nao informado");
  const preferredTimes = listOrFallback(data.preferredTimes, isEnglish ? "Not informed" : "Nao informado");
  const message = data.message || (isEnglish ? "No additional message" : "Sem mensagem adicional");
  const phone = data.phone || (isEnglish ? "Not informed" : "Nao informado");

  const text = [
    labels.title,
    `${labels.sentAt}: ${sentAt}`,
    `${labels.language}: ${data.lang}`,
    `${labels.ip}: ${clientIp}`,
    "",
    `${labels.name}: ${data.name}`,
    `${labels.email}: ${data.email}`,
    `${labels.phone}: ${phone}`,
    `${labels.services}: ${services}`,
    `${labels.preferredTimes}: ${preferredTimes}`,
    "",
    `${labels.message}:`,
    message,
  ].join("\n");

  const html = `
    <h2>${escapeHtml(labels.title)}</h2>
    <p><strong>${escapeHtml(labels.sentAt)}:</strong> ${escapeHtml(sentAt)}</p>
    <p><strong>${escapeHtml(labels.language)}:</strong> ${escapeHtml(data.lang)}</p>
    <p><strong>${escapeHtml(labels.ip)}:</strong> ${escapeHtml(clientIp)}</p>
    <hr />
    <p><strong>${escapeHtml(labels.name)}:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>${escapeHtml(labels.email)}:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>${escapeHtml(labels.phone)}:</strong> ${escapeHtml(phone)}</p>
    <p><strong>${escapeHtml(labels.services)}:</strong> ${escapeHtml(services)}</p>
    <p><strong>${escapeHtml(labels.preferredTimes)}:</strong> ${escapeHtml(preferredTimes)}</p>
    <p><strong>${escapeHtml(labels.message)}:</strong></p>
    <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
  `;

  return { text, html };
}

app.get("/api/health", (_req, res) => {
  const missing = validateResendConfig();

  res.status(200).json({
    ok: true,
    service: "contact-api",
    resendConfigured: missing.length === 0,
    mailTo: getMailTo(),
    missingEnv: missing,
  });
});

app.post("/api/contact", async (req, res) => {
  const clientIp = getClientIp(req);

  if (!isAllowedByRateLimit(clientIp)) {
    return res.status(429).json({
      ok: false,
      error: "too_many_requests",
    });
  }

  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: "invalid_payload",
      details: parsed.error.issues,
    });
  }

  const data = parsed.data;

  if (data.website) {
    return res.status(200).json({ ok: true });
  }

  const missingConfig = validateResendConfig();

  if (missingConfig.length > 0) {
    console.error("[contact-api] Missing Resend env vars:", missingConfig.join(", "));

    return res.status(500).json({
      ok: false,
      error: "email_not_configured",
    });
  }

  const subject = data.lang === "en"
    ? `New website contact - ${data.name}`
    : `Novo contato pelo site - ${data.name}`;

  const { text, html } = buildMailBody(data, clientIp);

  try {
    const { error } = await getResendClient().emails.send({
      from: process.env.MAIL_FROM || "Site Arnaldo <onboarding@resend.dev>",
      to: [getMailTo()],
      reply_to: data.email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[contact-api] Resend error:", error);

      return res.status(502).json({
        ok: false,
        error: "email_send_failed",
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[contact-api] Failed to send email:", error);

    return res.status(502).json({
      ok: false,
      error: "email_send_failed",
    });
  }
});

app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && "status" in error && error.status === 400) {
    return res.status(400).json({
      ok: false,
      error: "invalid_json",
    });
  }

  console.error("[contact-api] Unexpected error:", error);

  return res.status(500).json({
    ok: false,
    error: "internal_error",
  });
});

app.listen(PORT, () => {
  console.log(`[contact-api] Running on http://localhost:${PORT}`);
});
