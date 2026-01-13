/** @format */

const pages = [
	{ path: "/", name: "Home" },

	// Core Pages
	{ path: "/about/", name: "About" },
	{ path: "/services/", name: "Services" },
	{ path: "/clients/", name: "Clients" },
	{ path: "/partners/", name: "Partners" },
	{ path: "/blog/", name: "Blog" },
	{ path: "/careers/", name: "Careers" },
	{ path: "/contact/", name: "Contact" },
	{ path: "/press/", name: "Press" },
	{ path: "/privacy-policy/", name: "Privacy_Policy" },
	{ path: "/legal/", name: "Legal" },
	{ path: "/web-stories/", name: "Web_Stories" },

	// Services
	{
		path: "/services/artificial-intelligence-development-services/",
		name: "Svc_AI_Development",
	},
	{ path: "/services/chatgpt-integration-services/", name: "Svc_ChatGPT" },
	{ path: "/services/nft-marketplace-development/", name: "Svc_NFT" },
	{ path: "/services/api-integration/", name: "Svc_API" },
	{
		path: "/services/mobile-application-development-services/",
		name: "Svc_Mobile_Apps",
	},
	{ path: "/services/mvp-development-services/", name: "Svc_MVP" },
	{ path: "/services/web-development/", name: "Svc_Web_Dev" },
	{ path: "/services/web-design-services/", name: "Svc_Web_Design" },
	{ path: "/services/enterprise-services/", name: "Svc_Enterprise" },
	{ path: "/services/startup-product-development/", name: "Svc_Startup" },
	{ path: "/services/devops-consulting/", name: "Svc_DevOps" },
	{
		path: "/services/custom-online-marketplace-development/",
		name: "Svc_Marketplace",
	},
	{ path: "/services/product-engineering/", name: "Svc_Product_Engineering" },
	{ path: "/services/content-marketing/", name: "Svc_Content_Marketing" },
	{ path: "/services/social-media-marketing/", name: "Svc_SMM" },
	{ path: "/services/search-engine-optimization/", name: "Svc_SEO" },
	{ path: "/services/digital-consulting/", name: "Svc_Digital_Consulting" },
	{ path: "/services/graphic-design/", name: "Svc_Graphic_Design" },
	{ path: "/services/ppc/", name: "Svc_PPC" },

	// Industry / Solutions
	{ path: "/learning-management-systems/", name: "LMS" },
	{ path: "/directory-website-design/", name: "Directory_Design" },
	{ path: "/ecommerce-development-services/", name: "Ecommerce" },
	{ path: "/job-portal-development/", name: "Job_Portal" },
	{ path: "/travel-portal-development-company/", name: "Travel_Portal" },
	{ path: "/healthcare-software-development/", name: "Healthcare" },
	{ path: "/elearning-software-development/", name: "Elearning" },
	{ path: "/saas-development-services/", name: "SaaS" },
	{
		path: "/ai-development-services-for-lawyers-and-law-firms/",
		name: "AI_For_Lawyers",
	},

	// Case Studies
	{ path: "/case-study/hitachi/", name: "CS_Hitachi" },
	{ path: "/case-study/farmers-eats/", name: "CS_Farmers_Eats" },
	{ path: "/case-study/ai-copywriting-tool/", name: "CS_AI_Copywriting" },
	{ path: "/case-study/lawyer-pro/", name: "CS_Lawyer_Pro" },
	{ path: "/case-study/legal-help/", name: "CS_Legal_Help" },
	{ path: "/case-study/fetchrocket/", name: "CS_FetchRocket" },
	{ path: "/case-study/vertex-foods/", name: "CS_Vertex_Foods" },

	// Blog Pagination
	{ path: "/blog/page/2/", name: "Blog_Page_2" },
	{ path: "/blog/page/3/", name: "Blog_Page_3" },
	{ path: "/blog/page/4/", name: "Blog_Page_4" },
	{ path: "/blog/page/5/", name: "Blog_Page_5" },
	{ path: "/blog/page/6/", name: "Blog_Page_6" },

	// Careers
	{ path: "/careers/business-development-executive/", name: "Career_BDE" },
	{ path: "/careers/human-resource-executive/", name: "Career_HR" },
	{
		path: "/careers/digital-marketing-expert/",
		name: "Career_Digital_Marketing",
	},
	{ path: "/careers/flutter-developer/", name: "Career_Flutter" },
	{ path: "/careers/web-developer/", name: "Career_Web_Dev" },
	{ path: "/careers/wordpress-developer/", name: "Career_WordPress" },
	{ path: "/careers/mobile-app-developer/", name: "Career_Mobile" },
	{ path: "/careers/unity-developer/", name: "Career_Unity" },
	{ path: "/careers/web-designer/", name: "Career_Web_Designer" },

	// Web Stories
	{ path: "/web-stories/ai-chatbot/", name: "Story_AI_Chatbot" },
	{ path: "/web-stories/ai-in-healthcare/", name: "Story_AI_Healthcare" },
	{ path: "/web-stories/ai-role-in-self-driving-car/", name: "Story_AI_Car" },
	{ path: "/web-stories/green-tech-trends/", name: "Story_Green_Tech" },
	{ path: "/web-stories/agentic-ai/", name: "Story_Agentic_AI" },
	{ path: "/web-stories/bigquery-ai/", name: "Story_BigQuery_AI" },

	// Press (detail)
	{ path: "/press/vendorland/", name: "Press_Vendorland" },
	{
		path: "/blog/google-antigravity-your-path-to-a-billion-dollar-company/",
		name: "Blog_Google_Antigravity",
	},
	{
		path: "/blog/software-development-cost-estimation-2026/",
		name: "Blog_Software_Development_Cost_Estimation_2026",
	},
	{
		path: "/blog/ai-code-review-in-2025-whats-real-and-whats-hype/",
		name: "Blog_AI_Code_Review_2025",
	},
	{
		path: "/blog/unleashing-bigquerys-unified-multimodal-power-for-ai/",
		name: "Blog_BigQuery_Unified_Multimodal_AI",
	},
	{
		path: "/blog/explore-agentic-ai-autonomous-problem-solvers-today/",
		name: "Blog_Explore_Agentic_AI",
	},
	{
		path: "/blog/transform-your-business-with-cloud-computing-solutions/",
		name: "Blog_Cloud_Computing_Solutions",
	},
	{
		path: "/blog/the-process-of-the-ai-ml-solutions-are-powering-next-gen-business-automation/",
		name: "Blog_AI_ML_Solutions_Next_Gen_Automation",
	},
	{
		path: "/blog/the-future-of-remote-work-2025-tools-and-technologies-ahead/",
		name: "Blog_Remote_Work_2025_Tools",
	},
	{
		path: "/blog/ai-in-cybersecurity-the-key-to-future-proof-it-security/",
		name: "Blog_AI_In_Cybersecurity",
	},
	{
		path: "/blog/ai-empowering-internet-of-things-revolution-unleashed/",
		name: "Blog_AI_Empowering_IoT",
	},
	{
		path: "/blog/the-future-of-ai-in-2025-exploring-use-cases/",
		name: "Blog_Future_Of_AI_2025_Use_Cases",
	},
	{
		path: "/blog/sustainable-technology-eco-friendly-innovations-shaping-our-world/",
		name: "Blog_Sustainable_Technology_Innovations",
	},
	{
		path: "/blog/mastering-ai-cybersecurity-the-modern-defender/",
		name: "Blog_Mastering_AI_Cybersecurity",
	},
	{
		path: "/blog/unleashing-ai-chatbot-future-applications-revealed/",
		name: "Blog_AI_Chatbot_Future_Applications",
	},
	{
		path: "/blog/exploring-the-role-of-ai-in-everyday-lives-from-smartphones-to-smart-homes/",
		name: "Blog_AI_In_Everyday_Lives",
	},
	{
		path: "/blog/succeeding-in-the-ai-supply-chain-revolution/",
		name: "Blog_AI_Supply_Chain_Revolution",
	},
	{
		path: "/blog/from-algorithms-to-achievement-exploring-ais-role-in-edtech/",
		name: "Blog_AI_Role_In_EdTech",
	},
	{
		path: "/blog/ai-chatbots-the-virtual-assistants-redefining-healthcare-accessibility/",
		name: "Blog_AI_Chatbots_Healthcare_Accessibility",
	},
	{
		path: "/blog/ai-chatbot-for-companies-streamlining-internal-operations/",
		name: "Blog_AI_Chatbot_For_Companies",
	},
	{
		path: "/blog/ai-vs-human-support-who-provides-better-help/",
		name: "Blog_AI_Vs_Human_Support",
	},
	{
		path: "/blog/ai-chatbots-the-game-changers/",
		name: "Blog_AI_Chatbots_Game_Changers",
	},
	{
		path: "/blog/ai-in-document-management/",
		name: "Blog_AI_In_Document_Management",
	},
	{
		path: "/blog/how-to-choose-the-right-ai-development-company/",
		name: "Blog_Choose_Right_AI_Development_Company",
	},
	{
		path: "/blog/voice-assistants-in-mobile-apps/",
		name: "Blog_Voice_Assistants_In_Mobile_Apps",
	},
	{ path: "/blog/latest-ai-trends/", name: "Blog_Latest_AI_Trends" },
	{ path: "/blog/it-outsourcing-trends/", name: "Blog_IT_Outsourcing_Trends" },
	{
		path: "/blog/why-india-is-the-ideal-destination-for-ai-outsourcing/",
		name: "Blog_India_Ideal_For_AI_Outsourcing",
	},
	{
		path: "/blog/ai-in-entertainment-the-future-of-the-industry/",
		name: "Blog_AI_In_Entertainment",
	},
	{ path: "/blog/how-to-build-an-ai-app/", name: "Blog_How_To_Build_AI_App" },
	{
		path: "/blog/demystifying-ai-a-guide-for-lawyers/",
		name: "Blog_Demystifying_AI_For_Lawyers",
	},
	{ path: "/blog/ai-in-healthcare/", name: "Blog_AI_In_Healthcare" },
	{
		path: "/blog/impact-of-ai-on-legal-industry/",
		name: "Blog_Impact_Of_AI_On_Legal_Industry",
	},
	{
		path: "/blog/ai-scriptwriting-an-introduction/",
		name: "Blog_AI_Scriptwriting_Intro",
	},
	{
		path: "/blog/how-to-use-an-ai-tool-for-script-writing/",
		name: "Blog_AI_Tool_For_Script_Writing",
	},
	{
		path: "/blog/benefits-of-ai-adoption-in-legal-sector/",
		name: "Blog_Benefits_AI_Adoption_Legal_Sector",
	},
	{
		path: "/blog/why-lawyers-should-embrace-ai-for-efficiency/",
		name: "Blog_Lawyers_Embrace_AI_Efficiency",
	},
	{
		path: "/blog/a-comprehensive-guide-to-ai-prompts/",
		name: "Blog_Guide_To_AI_Prompts",
	},
	{
		path: "/blog/chatgpt-api-integration/",
		name: "Blog_ChatGPT_API_Integration",
	},
	{
		path: "/blog/use-cases-of-ai-in-real-estate/",
		name: "Blog_AI_Use_Cases_Real_Estate",
	},
	{
		path: "/blog/ways-artificial-intelligence-will-transform-your-business/",
		name: "Blog_AI_Transform_Your_Business",
	},
	{
		path: "/blog/how-can-nfts-in-healthcare-prove-beneficial/",
		name: "Blog_NFTs_In_Healthcare_Benefits",
	},
	{
		path: "/blog/ai-data-analysis-the-future-of-business-intelligence/",
		name: "Blog_AI_Data_Analysis_BI",
	},
	{
		path: "/blog/business-problems-ai-can-solve/",
		name: "Blog_Business_Problems_AI_Can_Solve",
	},
	{ path: "/blog/nft-trends/", name: "Blog_NFT_Trends" },
	{
		path: "/blog/breakdown-of-man-hours-for-developing-nft-marketplace/",
		name: "Blog_Man_Hours_NFT_Marketplace",
	},
	{ path: "/blog/erc-721-vs-erc-1155/", name: "Blog_ERC_721_Vs_ERC_1155" },
	{ path: "/blog/what-is-an-nft-drop/", name: "Blog_What_Is_NFT_Drop" },
	{
		path: "/blog/whats-an-nft-marketplace-a-guide-for-beginners/",
		name: "Blog_NFT_Marketplace_Beginners_Guide",
	},
	{
		path: "/blog/top-mobile-app-development-frameworks/",
		name: "Blog_Top_Mobile_App_Frameworks",
	},
	{
		path: "/blog/how-to-create-nft-marketplace/",
		name: "Blog_How_To_Create_NFT_Marketplace",
	},
	{
		path: "/blog/how-to-achieve-page-speed-scoring-100-by-100/",
		name: "Blog_Page_Speed_100_Scoring",
	},
	{
		path: "/blog/7-best-no-code-app-builder/",
		name: "Blog_7_Best_No_Code_App_Builder",
	},
	{
		path: "/blog/why-is-a-mobile-app-required-for-online-marketplaces/",
		name: "Blog_Why_Mobile_App_For_Marketplaces",
	},
	{
		path: "/blog/all-you-need-to-know-about-online-marketplaces/",
		name: "Blog_All_About_Online_Marketplaces",
	},
	{
		path: "/blog/pharmacy-marketplace-deliver-health-to-every-doorstep/",
		name: "Blog_Pharmacy_Marketplace_Deliver_Health",
	},
	{
		path: "/blog/super-easy-ways-to-immediately-improve-your-seo-rankings/",
		name: "Blog_Improve_SEO_Rankings",
	},
	{
		path: "/blog/how-to-build-a-minimum-viable-product-and-save-your-budget/",
		name: "Blog_Build_MVP_Save_Budget",
	},
	{
		path: "/blog/what-is-minimum-viable-product/",
		name: "Blog_What_Is_MVP",
	},
	{
		path: "/blog/10-marketing-strategies-for-online-marketplace/",
		name: "Blog_10_Marketing_Strategies_Online_Marketplace",
	},
	{
		path: "/blog/end-to-end-encryption-in-online-marketplace/",
		name: "Blog_End_To_End_Encryption_Online_Marketplace",
	},
	{
		path: "/blog/facts-about-payment-processing-options-for-marketplace-that-will-make-you-think-twice/",
		name: "Blog_Payment_Processing_Facts_Marketplace",
	},
	{
		path: "/blog/how-to-solve-chicken-and-egg-problem/",
		name: "Blog_Solve_Chicken_And_Egg_Problem",
	},
	{
		path: "/blog/types-of-online-marketplaces/",
		name: "Blog_Types_Of_Online_Marketplaces",
	},
	{
		path: "/blog/ecommerce-vs-marketplace/",
		name: "Blog_Ecommerce_Vs_Marketplace",
	},
	{
		path: "/blog/create-a-multi-vendor-marketplace-using-wordpress/",
		name: "Blog_Multi_Vendor_Marketplace_WordPress",
	},
	{
		path: "/blog/how-to-create-a-udemy-clone/",
		name: "Blog_Create_Udemy_Clone",
	},
	{
		path: "/blog/ways-to-quickly-monetize-your-directory-site/",
		name: "Blog_Monetize_Directory_Site",
	},
	{
		path: "/blog/5-best-monetization-practices-to-build-a-successful-website/",
		name: "Blog_Monetization_Practices_Successful_Website",
	},
	{
		path: "/blog/mvp-for-a-saas-startup/",
		name: "Blog_MVP_For_SaaS_Startup",
	},
	{
		path: "/blog/how-much-does-it-cost-to-build-an-online-marketplace/",
		name: "Blog_Cost_To_Build_Online_Marketplace",
	},
	{
		path: "/blog/5-key-factors-to-save-your-business-time-and-money-through-mvp/",
		name: "Blog_MVP_Save_Time_And_Money",
	},
	{
		path: "/blog/create-a-mobile-app-marketplace/",
		name: "Blog_Create_Mobile_App_Marketplace",
	},
	{
		path: "/blog/smart-strategies-to-monetize-your-online-marketplace/",
		name: "Blog_Smart_Monetize_Online_Marketplace",
	},
	{
		path: "/blog/managed-wordpress-hosting/",
		name: "Blog_Managed_WordPress_Hosting",
	},
	{
		path: "/blog/how-to-create-lms-using-lifterlms-and-wpengine/",
		name: "Blog_Create_LMS_LifterLMS_WPEngine",
	},
	{ path: "/blog/pros-and-cons-of-wfh/", name: "Blog_Pros_And_Cons_WFH" },
];

module.exports = pages;
