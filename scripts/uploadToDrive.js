/** @format */

const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const reportZip = process.env.REPORT_ZIP;
const reportNamePrefix = process.env.REPORT_NAME_PREFIX || "report";

function requireEnv(name, value) {
	if (!value) throw new Error(`Missing ${name}`);
	return value;
}

async function run() {
	requireEnv("REPORT_ZIP", reportZip);
	requireEnv(
		"GDRIVE_SERVICE_ACCOUNT_KEY",
		process.env.GDRIVE_SERVICE_ACCOUNT_KEY,
	);

	const zipPath = path.resolve(reportZip);
	if (!fs.existsSync(zipPath)) {
		throw new Error(`Report ZIP not found at: ${zipPath}`);
	}

	const auth = new google.auth.GoogleAuth({
		credentials: JSON.parse(
			Buffer.from(process.env.GDRIVE_SERVICE_ACCOUNT_KEY, "base64").toString(),
		),
		scopes: ["https://www.googleapis.com/auth/drive"],
	});

	const drive = google.drive({ version: "v3", auth });

	const filename = `${reportNamePrefix}-${Date.now()}.zip`;

	const FOLDER_ID = "1zmJTjQCK5KRjzk2lOz76BTosWNI2Fz3B";

	const createRes = await drive.files.create({
		supportsAllDrives: true, // 👈 ADD THIS
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

	await drive.permissions.create({
		fileId,
		requestBody: {
			role: "reader",
			type: "anyone",
		},
	});

	const fileRes = await drive.files.get({
		fileId,
		fields: "webViewLink",
	});

	console.log(`REPORT_LINK=${fileRes.data.webViewLink}`);
}

run().catch((err) => {
	console.error("❌ Drive upload failed");
	console.error(err.message || err);
	process.exit(1);
});
