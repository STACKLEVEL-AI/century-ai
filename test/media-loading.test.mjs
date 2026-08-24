import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const heroPath = new URL("../src/components/century-home/HeroSection.tsx", import.meta.url);
const casesPath = new URL("../src/components/century-home/CenturySection.tsx", import.meta.url);
const nginxPath = new URL("../nginx.conf", import.meta.url);

test("hero has an immediate poster while case videos load only when active", async () => {
  const [hero, cases, nginx] = await Promise.all([
    readFile(heroPath, "utf8"),
    readFile(casesPath, "utf8"),
    readFile(nginxPath, "utf8"),
  ]);

  assert.match(hero, /poster=\{locale === "ru" \? "\/hero-video\/hero-ru-poster\.jpg" : "\/hero-video\/hero-en-poster\.jpg"\}/);
  assert.match(cases, /src=\{isActive \? src : undefined\}/);
  assert.match(nginx, /Cache-Control "public, max-age=2592000, immutable"/);
});
