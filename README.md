<!-- @format -->

# QA Automation Monorepo

This repository hosts the automated test suites for multiple client websites.
Each site is isolated in its own directory with its own configuration, secrets, and schedule.

## 📂 Project Structure

| Client                                                                                                            | Folder                | Description                         |
| ----------------------------------------------------------------------------------------------------------------- | --------------------- | ----------------------------------- |
| **I Got Mind**<br><br>[https://igotmind.ca/](https://igotmind.ca/)                                              | `/igotmind`           | Authenticated + public flows        |
| **DigiBot App**<br><br>[https://digibotapp.com](https://digibotapp.com)                                         | `/digibotapp`         | Public visual regression            |
| **Naturally Beautiful**<br><br>[https://naturallybeautifulhaircare.com](https://naturallybeautifulhaircare.com) | `/naturallybeautiful` | Smoke + full-page visual regression |
| **Inventor Market**<br><br>[https://www.inventor.market](https://www.inventor.market)                           | `/inventormarket`     | Smoke + full-page visual regression |
| **Microlocs**<br><br>[https://microlocs.com](https://microlocs.com)                                             | `/microlocs`          | Smoke + full-page visual regression |
| **Microloc Directory**<br><br>[https://microlocdirectory.com](https://microlocdirectory.com)                    | `/microlocsdirectory` | Smoke + full-page visual regression |
| **Techwink**<br><br>[https://techwink.net](https://techwink.net)                                                | `/techwink`           | Smoke + full-page visual regression |
| **The Fourth Twenty**<br><br>[https://thefourthtwenty.ca](https://thefourthtwenty.ca)                           | `/thefourthtwenty`    | Smoke + full-page visual regression |

---

## 🚀 How to Run Manually (Cloud)

To trigger a test run immediately (e.g., after a fix or deployment):

1. Go to the **[Actions Tab](https://github.com/sowlab/playwright-visual-suite/actions)**.
2. On the left sidebar, select the specific workflow (e.g., **"DigiBot: Automation"**).
3. Click the **Run workflow** button on the right side.
4. Select the `main` branch and click **Run workflow**.

---

## 📊 How to View Reports

Since reports contain sensitive project data, they are not hosted publicly. Instead, they are securely attached to each test run as a downloadable Artifact.

**To download a report:**

1. Open the email notification you received (Subject: _"QA Report..."_).
2. Click the **"View Run"** link in the email.
3. On the GitHub page, scroll down to the **"Artifacts"** section (at the bottom).
4. Click the report artifact (site-specific name like `microlocs-report`) to download the results as a `.zip` file.
5. Extract the zip and open `index.html` to view the full interactive dashboard.

---

## 📅 Schedules

The automation runs automatically based on the schedules defined in `.github/workflows/`.

| Client                  | Schedule (IST)           |
| ----------------------- | ------------------------ |
| **I Got Mind**          | Mondays @ 9:00 AM IST    |
| **DigiBot App**         | Tuesdays @ 9:00 AM IST   |
| **Naturally Beautiful** | Wednesdays @ 9:00 AM IST |
| **Inventor Market**     | Thursdays @ 9:00 AM IST  |
| **Microlocs**           | Fridays @ 9:00 AM IST    |
| **Microloc Directory**  | Fridays @ 9:00 AM IST    |
| **Techwink**            | Saturdays @ 9:00 AM IST  |
| **The Fourth Twenty**   | Manual Trigger Only      |

### How to Change the Schedule

1. Open the workflow file (e.g., `.github/workflows/naturallybeautiful.yml`).
2. Find the `schedule` block near the top:

```yaml
schedule:
  - cron: "30 3 * * 3"