import test from "node:test";
import assert from "node:assert/strict";
import { formatTelegramMessage, loadConfig, normalizeLead, siteHostFromUrl } from "./server.mjs";

test("siteHostFromUrl distinguishes RU and BY", () => {
  assert.equal(siteHostFromUrl("https://century-ai.ru"), "century-ai.ru");
  assert.equal(siteHostFromUrl("https://century-ai.by/"), "century-ai.by");
  assert.throws(() => siteHostFromUrl("https://example.com"));
});

test("normalizes a valid lead and rejects bad email", () => {
  const valid = normalizeLead({ name: " Ivan ", email: " i@example.com ", company: "Acme" });
  assert.equal(valid.ok, true);
  assert.equal(valid.lead.name, "Ivan");
  assert.equal(valid.lead.email, "i@example.com");
  assert.equal(normalizeLead({ name: "Ivan", email: "bad" }).ok, false);
});

test("honeypot is treated as spam", () => {
  const result = normalizeLead({ name: "Ivan", email: "i@example.com", website: "spam.example" });
  assert.deepEqual(result, { ok: false, reason: "spam" });
});

test("Telegram formatter marks both production sites", () => {
  const ruText = formatTelegramMessage("century-ai.ru", { name: "Ivan", email: "i@example.com", company: "", role: "", message: "A&B" }, new Date("2026-08-24T08:00:00.000Z"));
  const byText = formatTelegramMessage("century-ai.by", { name: "Alexey", email: "a@example.by", company: "Example BY", role: "CEO", message: "Consultation" }, new Date("2026-08-24T08:00:00.000Z"));
  assert.match(ruText, /Сайт: century-ai\.ru/);
  assert.match(byText, /Сайт: century-ai\.by/);
  assert.match(ruText, /Задача: A&B/);
});

test("loadConfig keeps site identity server-side and parses all recipients", () => {
  const config = loadConfig({ TELEGRAM_BOT_TOKEN: "token", TELEGRAM_CHAT_ID: "8562745319, 435948288, 699352926", SITE_URL: "https://century-ai.by", PORT: "3001" });
  assert.equal(config.siteHost, "century-ai.by");
  assert.deepEqual(config.chatIds, ["8562745319", "435948288", "699352926"]);
});
