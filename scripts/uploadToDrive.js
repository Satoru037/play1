/** @format */

const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const credentials = JSON.parse(process.env.GDRIVE_SERVICE_ACCOUNT_JSON);
const folderId = process.env.GDRIVE_FOLDER_ID;

const auth = new google.auth.JWT(
	credentials.client_email,
	null,
	credentials.private_key,
	["https://www.googleapis.com/auth/drive"]
);

const drive = google.drive({ version: "v3", auth });

async function run() {
	const zipPath = path.resolve("igotmind/playwright-report.zip");

	if (!fs.existsSync(zipPath)) {
		throw new Error("Report ZIP not found");
	}

	const upload = await drive.files.create({
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
	console.error(err);
	process.exit(1);
});
