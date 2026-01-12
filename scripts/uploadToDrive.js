/** @format */

const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const clientId = process.env.GDRIVE_CLIENT_ID;
const clientSecret = process.env.GDRIVE_CLIENT_SECRET;
const refreshToken = process.env.GDRIVE_REFRESH_TOKEN;

if (!clientId || !clientSecret || !refreshToken) {
	throw new Error("Missing Google Drive OAuth secrets");
}

const oauth2Client = new google.auth.OAuth2(
	clientId,
	clientSecret,
	"urn:ietf:wg:oauth:2.0:oob"
);

oauth2Client.setCredentials({
	refresh_token: refreshToken,
});

async function run() {
	const drive = google.drive({
		version: "v3",
		auth: oauth2Client,
	});

	const zipPath = path.resolve("igotmind/playwright-report.zip");

	if (!fs.existsSync(zipPath)) {
		throw new Error("Report ZIP not found");
	}

	const upload = await drive.files.create({
		requestBody: {
			name: `igotmind-report-${Date.now()}.zip`,
		},
		media: {
			mimeType: "application/zip",
			body: fs.createReadStream(zipPath),
		},
		fields: "id",
	});

	const fileId = upload.data.id;

	await drive.permissions.create({
		fileId,
		requestBody: {
			type: "anyone",
			role: "reader",
		},
	});

	const meta = await drive.files.get({
		fileId,
		fields: "webViewLink",
	});

	console.log(`REPORT_LINK=${meta.data.webViewLink}`);
}

run().catch((err) => {
	console.error("❌ Drive upload failed");
	console.error(err.message || err);
	process.exit(1);
});
