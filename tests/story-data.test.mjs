import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import test from "node:test";

const storySource = readFileSync(new URL("../app/lib/story.ts", import.meta.url), "utf8");
const playerSource = readFileSync(new URL("../app/components/StoryPlayer.tsx", import.meta.url), "utf8");
const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");

const sceneIds = [...storySource.matchAll(/id: "(ch01-sc\d{2}-[^"]+)"/g)].map((match) => match[1]);

test("Chapter 01 contains the 12 locked scenes exactly once", () => {
  assert.equal(sceneIds.length, 12);
  assert.equal(new Set(sceneIds).size, 12);
  for (let number = 1; number <= 12; number += 1) {
    assert.ok(sceneIds.some((id) => id.startsWith(`ch01-sc${String(number).padStart(2, "0")}-`)));
  }
});

test("story content and controls are bilingual", () => {
  assert.match(storySource, /ar: \{/);
  assert.match(storySource, /en: \{/);
  assert.match(playerSource, /language === "ar" \? "en" : "ar"/);
  assert.match(playerSource, /document\.documentElement\.dir/);
});

test("progress, language, sound, motion and quality stay client-side", () => {
  assert.match(playerSource, /localStorage\.getItem/);
  assert.match(playerSource, /localStorage\.setItem/);
  assert.doesNotMatch(playerSource, /firebase|firestore|fetch\(|XMLHttpRequest/i);
});

test("Next build is configured as a portable static export", () => {
  assert.match(nextConfig, /output: "export"/);
  assert.match(nextConfig, /trailingSlash: true/);
  assert.match(nextConfig, /NEXT_PUBLIC_BASE_PATH/);
});

test("optimized runtime art assets are present and bounded", () => {
  for (const name of ["city-workshop", "frame-fall", "margin-blank", "escape-finale"]) {
    for (const extension of ["avif", "webp", "jpg"]) {
      const path = new URL(`../public/assets/art/${name}.${extension}`, import.meta.url);
      assert.ok(existsSync(path));
      const bytes = statSync(path).size;
      assert.ok(bytes > 25_000, `${name}.${extension} is unexpectedly small`);
      assert.ok(bytes < 500_000, `${name}.${extension} is too large for the runtime budget`);
    }
  }
});

test("static production output exists after the build gate", () => {
  const html = new URL("../out/index.html", import.meta.url);
  assert.ok(existsSync(html));
  const output = readFileSync(html, "utf8");
  assert.match(output, /MO — Beyond the Frame/);
  assert.match(output, /MO-IEGY-01/);
});
