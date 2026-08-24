import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const componentPath = new URL("../src/components/site/FooterLeadCapture.tsx", import.meta.url);

test("footer lead form submits through the contact API", async () => {
  const source = await readFile(componentPath, "utf8");

  assert.match(source, /<form[^>]+onSubmit=\{handleSubmit\}/s);
  assert.match(source, /type="submit"/);
  assert.match(source, /fetch\(['"]\/api\/contact['"]/);
});
