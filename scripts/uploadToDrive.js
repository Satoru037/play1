/** @format */

const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

// =====================
// ENV VARS
// =====================
const reportZip = process.env.REPORT_ZIP;
const reportNamePrefix = process.env.REPORT_NAME_PREFIX || "report";
const serviceAccountKey = process.env.GDRIVE_SERVICE_ACCOUNT_KEY;

// CHANGE THIS ONLY IF YOUR FOLDER CHANGES
const FOLDER_ID = "1zmJTjQCK5KRjzk2lOz76BTosWNI2Fz3B";

// =====================
// HELPERS
// =====================
function requireEnv(name, value) {
	if (!value) {
		throw new Error(`Missing ${name}`);
	}
	return value;
}

// =====================
// MAIN
// =====================
async function run() {
	requireEnv("REPORT_ZIP", reportZip);
	requireEnv("GDRIVE_SERVICE_ACCOUNT_KEY", serviceAccountKey);

	const zipPath = path.resolve(reportZip);
	if (!fs.existsSync(zipPath)) {
		throw new Error(`Report ZIP not found at: ${zipPath}`);
	}

	// Auth using Service Account
	const auth = new google.auth.GoogleAuth({
		credentials: JSON.parse(
			Buffer.from(serviceAccountKey, "base64").toString("utf8"),
		),
		scopes: ["https://www.googleapis.com/auth/drive"],
	});

	const drive = google.drive({ version: "v3", auth });

	const filename = `${reportNamePrefix}-${Date.now()}.zip`;

	// Upload ZIP to shared folder
	const createRes = await drive.files.create({
		supportsAllDrives: true,
		requestBody: {
			name: filename,
			parents: [FOLDER_ID],
		},
		media: {
			mimeType: "application/zip",
			body: fs.createReadStream(zipPath),
		},
	});

	const fileId = createRes.data.id;

	// Make file public (read-only)
	await drive.permissions.create({
		supportsAllDrives: true,
		fileId,
		requestBody: {
			role: "reader",
			type: "anyone",
		},
	});

	// Get public link
	const fileRes = await drive.files.get({
		supportsAllDrives: true,
		fileId,
		fields: "webViewLink",
	});

	// Expose link to GitHub Actions
	console.log(`REPORT_LINK=${fileRes.data.webViewLink}`);
}

// =====================
// EXEC
// =====================
run().catch((err) => {
	console.error("❌ Drive upload failed");
	console.error(err?.message || err);
	process.exit(1);
});
