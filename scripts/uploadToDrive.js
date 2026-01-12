/** @format */

const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

// ---- Load secrets from env ----
if (!process.env.GDRIVE_SERVICE_ACCOUNT_JSON) {
	throw new Error("Missing GDRIVE_SERVICE_ACCOUNT_JSON");
}
if (!process.env.GDRIVE_FOLDER_ID) {
	throw new Error("Missing GDRIVE_FOLDER_ID");
}

const credentials = JSON.parse(process.env.GDRIVE_SERVICE_ACCOUNT_JSON);
const folderId = process.env.GDRIVE_FOLDER_ID;

// ---- Create & authorize JWT client (CRITICAL FIX) ----
const auth = new google.auth.JWT({
	email: credentials.client_email,
	key: credentials.private_key,
	scopes: ["https://www.googleapis.com/auth/drive"],
});

async function run() {
	// 🔴 THIS IS WHAT WAS MISSING
	await auth.authorize();

	const drive = google.drive({
		version: "v3",
		auth,
	});

	const zipPath = path.resolve("igotmind/playwright-report.zip");

	if (!fs.existsSync(zipPath)) {
		throw new Error(`Report ZIP not found at ${zipPath}`);
	}

	// ---- Upload file ----
	const uploadResponse = await drive.files.create({
		requestBody: {
			name: `igotmind-report-${Date.now()}.zip`,
			parents: [folderId],
		},
		media: {
			mimeType: "application/zip",
			body: fs.createReadStream(zipPath),
		},
		fields: "id",
	});

	const fileId = uploadResponse.data.id;

	// ---- Make file public ----
	await drive.permissions.create({
		fileId,
		requestBody: {
			type: "anyone",
			role: "reader",
		},
	});

	// ---- Fetch shareable link ----
	const meta = await drive.files.get({
		fileId,
		fields: "webViewLink",
	});

	const link = meta.data.webViewLink;

	// ---- Output for GitHub Actions ----
	console.log(`REPORT_LINK=${link}`);
}

// ---- Execute ----
run().catch((err) => {
	console.error("❌ Google Drive upload failed");
	console.error(err.message || err);
	process.exit(1);
});
