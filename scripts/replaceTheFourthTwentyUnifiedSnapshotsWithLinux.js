/** @format */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

function getRepoRoot() {
	return execFileSync("git", ["rev-parse", "--show-toplevel"], {
		encoding: "utf8",
	}).trim();
}

function gitShowBuffer(repoRoot, relPath) {
	return execFileSync("git", ["show", `HEAD:${relPath}`], {
		cwd: repoRoot,
		encoding: "buffer",
		maxBuffer: 1024 * 1024 * 200,
	});
}

function main() {
	const repoRoot = getRepoRoot();
	const snapshotsDir = path.join(
		repoRoot,
		"thefourthtwenty",
		"tests",
		"visual.spec.js-snapshots",
	);

	if (!fs.existsSync(snapshotsDir)) {
		throw new Error(`Snapshots dir not found: ${snapshotsDir}`);
	}

	const linuxSuffix = "-Desktop-Chrome-Desktop-Chrome-linux.png";
	const targetSuffix = "-Desktop-Chrome.png";

	const linuxFiles = fs
		.readdirSync(snapshotsDir)
		.filter((f) => f.endsWith(linuxSuffix));

	let replaced = 0;
	let skipped = 0;

	for (const linuxFile of linuxFiles) {
		const unifiedFile = linuxFile.replace(linuxSuffix, targetSuffix);
		if (unifiedFile === linuxFile) {
			skipped++;
			continue;
		}

		const linuxAbs = path.join(snapshotsDir, linuxFile);
		const unifiedAbs = path.join(snapshotsDir, unifiedFile);

		const relLinuxPath = path
			.relative(repoRoot, linuxAbs)
			.split(path.sep)
			.join("/");

		let buf;
		try {
			buf = gitShowBuffer(repoRoot, relLinuxPath);
		} catch (e) {
			throw new Error(
				`Failed to read linux snapshot from git: ${relLinuxPath}\n${e?.message || e}`,
			);
		}

		fs.mkdirSync(path.dirname(unifiedAbs), { recursive: true });
		fs.writeFileSync(unifiedAbs, buf);
		replaced++;
	}

	console.log(
		`Replaced ${replaced} unified snapshots with linux baselines. Skipped ${skipped}.`,
	);
}

main();
