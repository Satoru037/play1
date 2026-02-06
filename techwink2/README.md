<!-- @format -->

# Techwink – Automated QA Suite

## 1. Project Overview

This directory contains the **Playwright Automation Suite** for  
👉 **https://techwink.net**

It focuses on **Visual Regression & Core Page Validation**, ensuring that
key pages render consistently across all supported devices.

---

## 2. Architecture

The automation suite follows a **modular and centralized structure** to ensure
maintainability and deterministic visual testing.

| File / Folder                     | Description                                                   |
| :-------------------------------- | :------------------------------------------------------------ |
| `tests/pages.js`                  | Centralized list of all URLs under test                       |
| `tests/visual.spec.js`            | Full-page visual regression tests                             |
| `tests/smoke.spec.js`             | Smoke tests to verify page availability                       |
| `tests/utils/safeGoto.js`         | Navigation helper with retry for transient network drops      |
| `tests/utils/stabilizePage.js`    | Freezes animations, forces eager images, controlled scrolling |
| `tests/visual.spec.js-snapshots/` | Baseline visual snapshots                                     |
| `playwright.config.js`            | Device matrix & execution configuration                       |

---

## 3. Configuration & Specifications

### Global Settings

- **Base URL:** `https://techwink.net`
- **Execution Mode:** Sequential
- **Visual Tolerance:** `maxDiffPixelRatio: 0.03` (visual suite default)
- **Stabilization:** Animations/transitions disabled, images forced eager-load, and pages are scrolled safely to trigger lazy content (some pages skip scrolling for stability).

---

## 4. Test Scope

The following endpoints are validated through **full-page visual regression**
across all configured devices.

### A. Core Pages (12 Endpoints)

- `/` – Home
- `/about/` – About
- `/services/` – Services
- `/clients/` – Clients
- `/partners/` – Partners
- `/blog/` – Blog
- `/careers/` – Careers
- `/contact/` – Contact
- `/press/` – Press
- `/privacy-policy/` – Privacy Policy
- `/legal/` – Legal
- `/web-stories/` – Web Stories

### B. Services (19 Endpoints)

- `/services/artificial-intelligence-development-services/` – AI Development
- `/services/chatgpt-integration-services/` – ChatGPT
- `/services/nft-marketplace-development/` – NFT
- `/services/api-integration/` – API
- `/services/mobile-application-development-services/` – Mobile Apps
- `/services/mvp-development-services/` – MVP
- `/services/web-development/` – Web Dev
- `/services/web-design-services/` – Web Design
- `/services/enterprise-services/` – Enterprise
- `/services/startup-product-development/` – Startup
- `/services/devops-consulting/` – DevOps
- `/services/custom-online-marketplace-development/` – Marketplace
- `/services/product-engineering/` – Product Engineering
- `/services/content-marketing/` – Content Marketing
- `/services/social-media-marketing/` – SMM
- `/services/search-engine-optimization/` – SEO
- `/services/digital-consulting/` – Digital Consulting
- `/services/graphic-design/` – Graphic Design
- `/services/ppc/` – PPC

### C. Industry / Solutions (9 Endpoints)

- `/learning-management-systems/` – LMS
- `/directory-website-design/` – Directory Design
- `/ecommerce-development-services/` – Ecommerce
- `/job-portal-development/` – Job Portal
- `/travel-portal-development-company/` – Travel Portal
- `/healthcare-software-development/` – Healthcare
- `/elearning-software-development/` – Elearning
- `/saas-development-services/` – SaaS
- `/ai-development-services-for-lawyers-and-law-firms/` – AI For Lawyers

### D. Case Studies (7 Endpoints)

- `/case-study/hitachi/` – Hitachi
- `/case-study/farmers-eats/` – Farmers Eats
- `/case-study/ai-copywriting-tool/` – AI Copywriting
- `/case-study/lawyer-pro/` – Lawyer Pro
- `/case-study/legal-help/` – Legal Help
- `/case-study/fetchrocket/` – FetchRocket
- `/case-study/vertex-foods/` – Vertex Foods

### E. Blog Pagination (5 Endpoints)

- `/blog/page/2/` – Blog Page 2
- `/blog/page/3/` – Blog Page 3
- `/blog/page/4/` – Blog Page 4
- `/blog/page/5/` – Blog Page 5
- `/blog/page/6/` – Blog Page 6

### F. Careers (9 Endpoints)

- `/careers/business-development-executive/` – BDE
- `/careers/human-resource-executive/` – HR
- `/careers/digital-marketing-expert/` – Digital Marketing
- `/careers/flutter-developer/` – Flutter
- `/careers/web-developer/` – Web Dev
- `/careers/wordpress-developer/` – WordPress
- `/careers/mobile-app-developer/` – Mobile
- `/careers/unity-developer/` – Unity
- `/careers/web-designer/` – Web Designer

### G. Web Stories (6 Endpoints) REMOVE 

- `/web-stories/ai-chatbot/` – AI Chatbot
- `/web-stories/ai-in-healthcare/` – AI Healthcare
- `/web-stories/ai-role-in-self-driving-car/` – AI Car
- `/web-stories/green-tech-trends/` – Green Tech
- `/web-stories/agentic-ai/` – Agentic AI
- `/web-stories/bigquery-ai/` – BigQuery AI

### H. Press (Detail) (1 Endpoint)

- `/press/vendorland/` – Vendorland

### I. Blog Articles (76 Endpoints)

- `/blog/google-antigravity-your-path-to-a-billion-dollar-company/` – Google Antigravity
- `/blog/software-development-cost-estimation-2026/` – Software Development Cost Estimation 2026
- `/blog/ai-code-review-in-2025-whats-real-and-whats-hype/` – AI Code Review 2025
- `/blog/unleashing-bigquerys-unified-multimodal-power-for-ai/` – BigQuery Unified Multimodal AI
- `/blog/explore-agentic-ai-autonomous-problem-solvers-today/` – Explore Agentic AI
- `/blog/transform-your-business-with-cloud-computing-solutions/` – Cloud Computing Solutions
- `/blog/the-process-of-the-ai-ml-solutions-are-powering-next-gen-business-automation/` – AI ML Solutions Next Gen Automation
- `/blog/the-future-of-remote-work-2025-tools-and-technologies-ahead/` – Remote Work 2025 Tools
- `/blog/ai-in-cybersecurity-the-key-to-future-proof-it-security/` – AI In Cybersecurity
- `/blog/ai-empowering-internet-of-things-revolution-unleashed/` – AI Empowering IoT
- `/blog/the-future-of-ai-in-2025-exploring-use-cases/` – Future Of AI 2025 Use Cases
- `/blog/sustainable-technology-eco-friendly-innovations-shaping-our-world/` – Sustainable Technology Innovations
- `/blog/mastering-ai-cybersecurity-the-modern-defender/` – Mastering AI Cybersecurity
- `/blog/unleashing-ai-chatbot-future-applications-revealed/` – AI Chatbot Future Applications
- `/blog/exploring-the-role-of-ai-in-everyday-lives-from-smartphones-to-smart-homes/` – AI In Everyday Lives
- `/blog/succeeding-in-the-ai-supply-chain-revolution/` – AI Supply Chain Revolution
- `/blog/from-algorithms-to-achievement-exploring-ais-role-in-edtech/` – AI Role In EdTech
- `/blog/ai-chatbots-the-virtual-assistants-redefining-healthcare-accessibility/` – AI Chatbots Healthcare Accessibility
- `/blog/ai-chatbot-for-companies-streamlining-internal-operations/` – AI Chatbot For Companies
- `/blog/ai-vs-human-support-who-provides-better-help/` – AI Vs Human Support
- `/blog/ai-chatbots-the-game-changers/` – AI Chatbots Game Changers
- `/blog/ai-in-document-management/` – AI In Document Management
- `/blog/how-to-choose-the-right-ai-development-company/` – Choose Right AI Development Company
- `/blog/voice-assistants-in-mobile-apps/` – Voice Assistants In Mobile Apps
- `/blog/latest-ai-trends/` – Latest AI Trends
- `/blog/it-outsourcing-trends/` – IT Outsourcing Trends
- `/blog/why-india-is-the-ideal-destination-for-ai-outsourcing/` – India Ideal For AI Outsourcing
- `/blog/ai-in-entertainment-the-future-of-the-industry/` – AI In Entertainment
- `/blog/how-to-build-an-ai-app/` – How To Build AI App
- `/blog/demystifying-ai-a-guide-for-lawyers/` – Demystifying AI For Lawyers
- `/blog/ai-in-healthcare/` – AI In Healthcare
- `/blog/impact-of-ai-on-legal-industry/` – Impact Of AI On Legal Industry
- `/blog/ai-scriptwriting-an-introduction/` – AI Scriptwriting Intro
- `/blog/how-to-use-an-ai-tool-for-script-writing/` – AI Tool For Script Writing
- `/blog/benefits-of-ai-adoption-in-legal-sector/` – Benefits AI Adoption Legal Sector
- `/blog/why-lawyers-should-embrace-ai-for-efficiency/` – Lawyers Embrace AI Efficiency
- `/blog/a-comprehensive-guide-to-ai-prompts/` – Guide To AI Prompts
- `/blog/chatgpt-api-integration/` – ChatGPT API Integration
- `/blog/use-cases-of-ai-in-real-estate/` – AI Use Cases Real Estate
- `/blog/ways-artificial-intelligence-will-transform-your-business/` – AI Transform Your Business
- `/blog/how-can-nfts-in-healthcare-prove-beneficial/` – NFTs In Healthcare Benefits
- `/blog/ai-data-analysis-the-future-of-business-intelligence/` – AI Data Analysis BI
- `/blog/business-problems-ai-can-solve/` – Business Problems AI Can Solve
- `/blog/nft-trends/` – NFT Trends
- `/blog/breakdown-of-man-hours-for-developing-nft-marketplace/` – Man Hours NFT Marketplace
- `/blog/erc-721-vs-erc-1155/` – ERC 721 Vs ERC 1155
- `/blog/what-is-an-nft-drop/` – What Is NFT Drop
- `/blog/whats-an-nft-marketplace-a-guide-for-beginners/` – NFT Marketplace Beginners Guide
- `/blog/top-mobile-app-development-frameworks/` – Top Mobile App Frameworks
- `/blog/how-to-create-nft-marketplace/` – How To Create NFT Marketplace
- `/blog/how-to-achieve-page-speed-scoring-100-by-100/` – Page Speed 100 Scoring
- `/blog/7-best-no-code-app-builder/` – 7 Best No Code App Builder
- `/blog/why-is-a-mobile-app-required-for-online-marketplaces/` – Why Mobile App For Marketplaces
- `/blog/all-you-need-to-know-about-online-marketplaces/` – All About Online Marketplaces
- `/blog/pharmacy-marketplace-deliver-health-to-every-doorstep/` – Pharmacy Marketplace Deliver Health
- `/blog/super-easy-ways-to-immediately-improve-your-seo-rankings/` – Improve SEO Rankings
- `/blog/how-to-build-a-minimum-viable-product-and-save-your-budget/` – Build MVP Save Budget
- `/blog/what-is-minimum-viable-product/` – What Is MVP
- `/blog/10-marketing-strategies-for-online-marketplace/` – 10 Marketing Strategies Online Marketplace
- `/blog/end-to-end-encryption-in-online-marketplace/` – End To End Encryption Online Marketplace
- `/blog/facts-about-payment-processing-options-for-marketplace-that-will-make-you-think-twice/` – Payment Processing Facts Marketplace
- `/blog/how-to-solve-chicken-and-egg-problem/` – Solve Chicken And Egg Problem
- `/blog/types-of-online-marketplaces/` – Types Of Online Marketplaces
- `/blog/ecommerce-vs-marketplace/` – Ecommerce Vs Marketplace
- `/blog/create-a-multi-vendor-marketplace-using-wordpress/` – Multi Vendor Marketplace WordPress
- `/blog/how-to-create-a-udemy-clone/` – Create Udemy Clone
- `/blog/ways-to-quickly-monetize-your-directory-site/` – Monetize Directory Site
- `/blog/5-best-monetization-practices-to-build-a-successful-website/` – Monetization Practices Successful Website
- `/blog/mvp-for-a-saas-startup/` – MVP For SaaS Startup
- `/blog/how-much-does-it-cost-to-build-an-online-marketplace/` – Cost To Build Online Marketplace
- `/blog/5-key-factors-to-save-your-business-time-and-money-through-mvp/` – MVP Save Time And Money
- `/blog/create-a-mobile-app-marketplace/` – Create Mobile App Marketplace
- `/blog/smart-strategies-to-monetize-your-online-marketplace/` – Smart Monetize Online Marketplace
- `/blog/managed-wordpress-hosting/` – Managed WordPress Hosting
- `/blog/how-to-create-lms-using-lifterlms-and-wpengine/` – Create LMS LifterLMS WPEngine
- `/blog/pros-and-cons-of-wfh/` – Pros And Cons WFH

---

## 5. Execution Option A: Cloud (GitHub Actions)

**Schedule:** Manual only (no scheduled automation).

1. Navigate to the **Actions** tab.
2. Select **Techwink: Automation**.
3. Click **Run workflow**.
4. Download the **`techwink-report`** artifact from the run.

---

## 6. Execution Option B: Local Setup (Developer Mode)

### Prerequisites

- **Node.js** (v14 or higher)
- **NPM**

### Step 1: Install

From the repo root:

```bash
npm install
npx playwright install
```

### Step 2: Run Tests

From the Techwink folder:

```bash
cd techwink
npx playwright test
```

### Optional Commands

- **Update Snapshots:** `npx playwright test --update-snapshots`
- **View Report:** `npx playwright show-report`
