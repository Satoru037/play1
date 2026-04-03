/** @format */

const fs = require("fs");
const path = require("path");

function trimText(value, maxLength = 1200) {
	const text = String(value || "");
	if (text.length <= maxLength) return text;
	return `${text.slice(0, maxLength - 3)}...`;
}

function getTestKey(test, projectName) {
	const titlePath =
		typeof test.titlePath === "function" ? test.titlePath() : [];
	const location = test.location || {};
	return [
		projectName || "",
		location.file || "",
		location.line || "",
		location.column || "",
		titlePath.join(" > "),
	].join("|");
}

class SummaryJsonReporter {
	constructor(options = {}) {
		this.outputFile = options.outputFile || "results.json";
		this.tests = new Map();
		this.startTime = new Date();
	}

	onTestEnd(test, result) {
		const projectName =
			result.projectName || test.parent?.project()?.name || "";
		const key = getTestKey(test, projectName);
		const existing = this.tests.get(key) || {
			title: test.title,
			titlePath:
				typeof test.titlePath === "function" ? test.titlePath() : [test.title],
			projectName,
			location: test.location,
			status: result.status,
			hasRetryFailure: false,
			errorMessage: "",
			errorStack: "",
		};

		existing.title = test.title;
		existing.titlePath =
			typeof test.titlePath === "function"
				? test.titlePath()
				: existing.titlePath;
		existing.projectName = projectName;
		existing.location = test.location;
		existing.status = result.status;
		existing.duration = (existing.duration || 0) + (result.duration || 0);
		existing.retry = Math.max(existing.retry || 0, result.retry || 0);

		if (result.status !== "passed") {
			existing.hasRetryFailure = true;
			existing.errorMessage = trimText(
				result.error?.message || existing.errorMessage || "",
			);
			existing.errorStack = trimText(
				result.error?.stack || existing.errorStack || "",
			);
		}

		this.tests.set(key, existing);
	}

	async onEnd(fullResult) {
		let expected = 0;
		let flaky = 0;
		let unexpected = 0;
		let skipped = 0;
		const failedTests = [];

		for (const test of this.tests.values()) {
			if (test.status === "passed") {
				if (test.hasRetryFailure) {
					flaky += 1;
				} else {
					expected += 1;
				}
				continue;
			}

			if (test.status === "skipped") {
				skipped += 1;
				continue;
			}

			unexpected += 1;
			failedTests.push({
				title: test.title,
				titlePath: test.titlePath,
				projectName: test.projectName,
				location: test.location,
				status: test.status,
				errorMessage: test.errorMessage,
				errorStack: test.errorStack,
			});
		}

		const payload = {
			stats: {
				expected,
				flaky,
				unexpected,
				skipped,
				total: expected + flaky + unexpected + skipped,
			},
			status: fullResult.status,
			duration: fullResult.duration,
			startTime: this.startTime.toISOString(),
			failedTests,
		};

		const outputPath = path.resolve(process.cwd(), this.outputFile);
		fs.mkdirSync(path.dirname(outputPath), { recursive: true });
		fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2));
	}
}

module.exports = SummaryJsonReporter;
