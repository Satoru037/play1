/** @format */

const { test, expect } = require("@playwright/test");
const stabilizePage = require("./utils/stabilizePage");
const safeGoto = require("./utils/safeGoto");
const pages = require("./pages");

// 🔥 CRITICAL FIX: Visual tests are slow by nature
test.setTimeout(120000); // 2 minutes per visual test

test.describe("TechWink – Visual Regression", () => {
	for (const p of pages) {
		test(`Visual: ${p.name}`, async ({ page }) => {
			// ✅ Navigation with retry for mobile/network drops
			await safeGoto(page, p.path);

			// ✅ Fully deterministic page settling
			await stabilizePage(page, p.path);

			// ✅ Visual assertion
			await expect(page).toHaveScreenshot(`${p.name}.png`, {
				fullPage: true,
				scale: "css",
				maxDiffPixelRatio: 0.03,
				timeout: 60000, // screenshot budget
			});
		});
	}
});
