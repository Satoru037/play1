/** @format */

const fs = require("fs");
const path = require("path");

function trimText(value, maxLength = 1200) {
	const text = String(value || "");
	if (text.length <= maxLength) return text;
	return `${text.slice(0, Math.max(0, maxLength - 3))}...`;
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
		const projectName = test.parent?.project()?.name || "";
		const key = getTestKey(test, projectName);
		let existing = this.tests.get(key);

		if (!existing) {
			existing = {
				title: test.title,
				titlePath:
					typeof test.titlePath === "function"
						? test.titlePath()
						: [test.title],
				projectName,
				location: test.location,
				expectedStatus: test.expectedStatus || "passed",
				status: result.status,
				hasRetryFailure: false,
				errorMessage: "",
				errorStack: "",
			};
			this.tests.set(key, existing);
		}

		existing.status = result.status;

		if (
			result.status !== existing.expectedStatus &&
			result.status !== "skipped"
		) {
			existing.hasRetryFailure = true;
			existing.errorMessage = trimText(
				result.error?.message || existing.errorMessage || "",
			);
			existing.errorStack = trimText(
				result.error?.stack || existing.errorStack || "",
			);
		}
	}

	async onEnd(fullResult) {
		let expected = 0;
		let flaky = 0;
		let unexpected = 0;
		let skipped = 0;
		const failedTests = [];
		const flakyTests = [];

		for (const test of this.tests.values()) {
			if (test.status === "skipped") {
				skipped += 1;
				continue;
			}

			if (test.status === test.expectedStatus) {
				if (test.hasRetryFailure) {
					flaky += 1;
					flakyTests.push({
						title: test.title,
						titlePath: test.titlePath,
						projectName: test.projectName,
						location: test.location,
						status: "flaky",
						errorMessage: test.errorMessage,
						errorStack: test.errorStack,
					});
				} else {
					expected += 1;
				}
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
			flakyTests,
		};

		const outputPath = path.resolve(process.cwd(), this.outputFile);
		try {
			await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
			await fs.promises.writeFile(outputPath, JSON.stringify(payload, null, 2));
		} catch (error) {
			const reason = error && error.message ? error.message : String(error);
			console.error(
				`[SummaryJsonReporter] Failed to write summary JSON to ${outputPath}: ${reason}`,
			);
			// Keep reporter write failures non-fatal so CI reflects test outcomes.
		}
	}
}

module.exports = SummaryJsonReporter;
