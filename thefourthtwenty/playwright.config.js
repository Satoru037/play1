/** @format */

const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
	testDir: "./tests",

	// Use the same snapshot files across OSes (Windows/Linux) to avoid
	// maintaining separate `-win32` and `-linux` baselines.
	snapshotPathTemplate:
		"{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}{ext}",

	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	workers: process.env.CI ? 2 : undefined,

	reporter: [["html"], ["json", { outputFile: "results.json" }], ["list"]],

	timeout: 5 * 60 * 1000, // 5 minutes per test

	use: {
		baseURL: "https://thefourthtwenty.ca",
		trace: "on-first-retry",
		screenshot: "on",
		video: "retain-on-failure",

		navigationTimeout: 60000,
		actionTimeout: 30000,

		launchOptions: {
			args: [
				"--disable-blink-features=AutomationControlled",
				"--disable-web-security",
				"--disable-features=IsolateOrigins,site-per-process",
			],
			ignoreDefaultArgs: ["--enable-automation"],
		},
	},

	expect: {
		timeout: 30000,
		toHaveScreenshot: {
			maxDiffPixelRatio: 0.02,
			threshold: 0.3,
			timeout: 60000,
		},
	},

	projects: [
		{
			name: "Desktop Chrome",
			use: {
				...devices["Desktop Chrome"],
				viewport: { width: 1280, height: 800 },
			},
		},
	],
});
