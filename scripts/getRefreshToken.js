/** @format */

const http = require("http");
const { spawn } = require("child_process");

const readline = require("readline");

const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/drive"];

function ask(question) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	return new Promise((resolve) =>
		rl.question(question, (answer) => {
			rl.close();
			resolve(String(answer ?? "").trim());
		}),
	);
}

async function askHidden(question) {
	const mutableStdout = new (require("stream").Writable)({
		write(chunk, encoding, callback) {
			if (!this.muted) process.stdout.write(chunk, encoding);
			callback();
		},
	});
	mutableStdout.muted = false;

	const rl = readline.createInterface({
		input: process.stdin,
		output: mutableStdout,
		terminal: true,
	});

	return new Promise((resolve) => {
		process.stdout.write(question);
		mutableStdout.muted = true;
		rl.question("", (answer) => {
			mutableStdout.muted = false;
			process.stdout.write("\n");
			rl.close();
			resolve(String(answer ?? "").trim());
		});
	});
}

function openInBrowser(url) {
	if (process.env.NO_OPEN === "1") return;

	const platform = process.platform;
	if (platform === "win32") {
		spawn("cmd", ["/c", "start", "", url], { stdio: "ignore" });
		return;
	}
	if (platform === "darwin") {
		spawn("open", [url], { stdio: "ignore" });
		return;
	}
	spawn("xdg-open", [url], { stdio: "ignore" });
}

async function main() {
	const CLIENT_ID = await ask(
		"Google OAuth Client ID (ends with .apps.googleusercontent.com): ",
	);
	const CLIENT_SECRET = await askHidden("Google OAuth Client Secret: ");

	if (!CLIENT_ID || !CLIENT_SECRET) {
		console.error("Client ID/secret are required.");
		process.exit(1);
	}

	let oauth2Client;

	const server = http.createServer(async (req, res) => {
		try {
			const requestUrl = new URL(req.url, "http://localhost");
			if (requestUrl.pathname !== "/oauth2callback") {
				res.statusCode = 404;
				res.end("Not found");
				return;
			}

			const error = requestUrl.searchParams.get("error");
			if (error) {
				res.statusCode = 400;
				res.setHeader("content-type", "text/plain; charset=utf-8");
				res.end(`OAuth error: ${error}`);
				return;
			}

			const code = requestUrl.searchParams.get("code");
			if (!code) {
				res.statusCode = 400;
				res.setHeader("content-type", "text/plain; charset=utf-8");
				res.end("Missing code param");
				return;
			}

			const { tokens } = await oauth2Client.getToken(code);
			oauth2Client.setCredentials(tokens);

			res.statusCode = 200;
			res.setHeader("content-type", "text/html; charset=utf-8");
			res.end(
				"<h2>Auth complete</h2><p>You can close this tab.</p><p>Check your terminal for the refresh token.</p>",
			);

			console.log("\nTOKENS:");
			console.log(JSON.stringify(tokens, null, 2));
			console.log("\nREFRESH TOKEN:");
			console.log(tokens.refresh_token ?? "(none returned)");

			if (!tokens.refresh_token) {
				console.log(
					"\nNo refresh token was returned. This usually happens if you already authorized this client before.\n" +
						"Fix: revoke the app at https://myaccount.google.com/permissions and run again (keep prompt=consent).",
				);
			}

			server.close();
		} catch (e) {
			res.statusCode = 500;
			res.setHeader("content-type", "text/plain; charset=utf-8");
			res.end(String(e?.stack ?? e));
			server.close();
		}
	});

	// Prefer a stable port so "Web application" OAuth clients can whitelist it.
	// If the port is in use, fall back to a random port.
	const preferredPort = 53682;
	await new Promise((resolve) => {
		server.once("error", (err) => {
			if (err && err.code === "EADDRINUSE") {
				server.listen(0, "127.0.0.1", resolve);
				return;
			}
			throw err;
		});
		server.listen(preferredPort, "127.0.0.1", resolve);
	});

	const address = server.address();
	if (!address || typeof address === "string") {
		throw new Error("Failed to start local server");
	}

	const redirectUri = `http://127.0.0.1:${address.port}/oauth2callback`;
	oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, redirectUri);

	const authUrl = oauth2Client.generateAuthUrl({
		access_type: "offline",
		scope: SCOPES,
		prompt: "consent",
	});

	console.log("\nOpen this URL to authorize:\n");
	console.log(authUrl);
	console.log("\nWaiting for OAuth redirect on:", redirectUri);

	openInBrowser(authUrl);

	setTimeout(
		() => {
			console.error("\nTimed out waiting for OAuth redirect.");
			server.close();
			process.exit(1);
		},
		5 * 60 * 1000,
	).unref();
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
