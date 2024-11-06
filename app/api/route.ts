import * as puppeteer from 'puppeteer';

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response(null, { status: 400, statusText: "Bad Request" });
  }

  try {
    const data = await scrapBadges(url);
    return Response.json({ data })
  } catch {
    return new Response(null, { status: 500, statusText: "Internal server error" });
  }
}

async function scrapBadges(url: string) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(`https://www.cloudskillsboost.google/public_profiles/${url}`);
  console.log('url', url);

  const badges = await page.evaluate(() => {
    const badgesList = [
      // trivia
      {
        title: "The Arcade Trivia October 2024 Week 1",
        type: "trivia",
        points: 1,
      },
      {
        title: "The Arcade Trivia October 2024 Week 2",
        type: "trivia",
        points: 1,
      },
      {
        title: "The Arcade Trivia October 2024 Week 3",
        type: "trivia",
        points: 1,
      },
      {
        title: "The Arcade Trivia October 2024 Week 4",
        type: "trivia",
        points: 1,
      },
      {
        title: "The Arcade Trivia November 2024 Week 1",
        type: "trivia",
        points: 1,
      },
      {
        title: "The Arcade Trivia November 2024 Week 2",
        type: "trivia",
        points: 1,
      },
      // games
      {
        title: "Level 1: Automation and CI/CD Skills",
        type: "game",
        points: 1,
      },
      {
        title: "Level 2: Cloud and Serverless Solutions",
        type: "game",
        points: 1,
      },
      {
        title: "Level 3: Google Cloud Adventures",
        type: "game",
        points: 1,
      },
      {
        title: "The Arcade Base Camp October 2024",
        type: "game",
        points: 1,
      },
      {
        title: "Trick-or-Skills",
        type: "game",
        points: 2,
      },
      {
        title: "The Arcade Base Camp November 2024",
        type: "game",
        points: 1,
      },
      {
        title: "Diwali in The Arcade",
        type: "game",
        points: 2,
      },
      // skill badge
      {
        title: "Manage Kubernetes in Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Classify Images with TensorFlow on Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Share Data Using Google Data Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Get Started with Google Workspace Tools",
        type: "skill",
        points: 0.5,
      },
      {
        title:
          "Migrate MySQL data to Cloud SQL using Database Migration Service",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Use Machine Learning APIs on Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title:
          "Mitigate Threats and Vulnerabilities with Security Command Center",
        type: "skill",
        points: 0.5,
      },
      {
        title:
          "Monitor Environments with Google Cloud Managed Service for Prometheus",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Get Started with Dataplex",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Deploy Kubernetes Applications on Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Set Up an App Dev Environment on Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Develop your Google Cloud Network",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Build a Secure Google Cloud Network",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Implement DevOps Workflows in Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Build a Data Warehouse with BigQuery",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Optimize Costs for Google Kubernetes Engine",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Deploy and Manage Apigee X",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Build and Deploy Machine Learning Solutions on Vertex AI",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Create and Manage Cloud SQL for PostgreSQL Instances",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Build LookML Objects in Looker",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Develop and Secure APIs with Apigee X",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Manage Data Models in Looker",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Detect Manufacturing Defects using Visual Inspection AI",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Automate Data Capture at Scale with Document AI",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Perform Predictive Data Analysis in BigQuery",
        type: "skill",
        points: 0.5,
      },
      {
        title:
          "Protect Cloud Traffic with BeyondCorp Enterprise (BCE) Security",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Build Infrastructure with Terraform on Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Create and Manage Cloud Spanner Instances",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Use Functions, Formulas, and Charts in Google Sheets",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Implement CI/CD Pipelines on Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Create and Manage Bigtable Instances",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Build Google Cloud Infrastructure for AWS Professionals",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Build Google Cloud Infrastructure for Azure Professionals",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Store, Process, and Manage Data on Google Cloud - Command Line",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Monitor and Manage Google Cloud Resources",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Analyze BigQuery Data in Connected Sheets",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Store, Process, and Manage Data on Google Cloud - Console",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Get Started with Looker",
        type: "skill",
        points: 0.5,
      },
      {
        title: "App Building with AppSheet",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Get Started with API Gateway",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Streaming Analytics into BigQuery",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Cloud Functions: 3 Ways",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Create a Streaming Data Lake on Cloud Storage",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Get Started with Cloud Storage",
        type: "skill",
        points: 0.5,
      },
      {
        title: "App Engine: 3 Ways",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Get Started with Eventarc",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Monitoring in Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Analyze Speech and Language with Google APIs",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Create a Secure Data Lake on Cloud Storage",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Tag and Discover BigLake Data",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Secure BigLake Data",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Analyze Images with the Cloud Vision API",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Get Started with Sensitive Data Protection",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Networking Fundamentals on Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "The Basics of Google Cloud Compute",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Use APIs to Work with Cloud Storage",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Using the Google Cloud Speech API",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Develop with Apps Script and AppSheet",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Analyze Sentiment with Natural Language API",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Build a Data Mesh with Dataplex",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Cloud Speech API: 3 Ways",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Integrate BigQuery Data and Google Workspace using Apps Script",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Configure Service Accounts and IAM Roles for Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Build Custom Processors with Document AI",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Explore Generative AI with the Vertex AI Gemini API",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Build Real World AI Applications with Gemini and Imagen",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Create and Manage AlloyDB Instances",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Set Up a Google Cloud Network",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Secure Software Delivery",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Get Started with Pub/Sub",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Implement DevOps in Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Build and Secure Networks in Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Set up and Configure a Cloud Environment in Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Cloud Architecture: Design, Implement, and Manage",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Implement Cloud Security Fundamentals on Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Implement Load Balancing on Compute Engine",
        type: "skill",
        points: 0.5,
      },
      {
        title: "G Suite Essentials",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Perform Foundational Infrastructure Tasks in Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Monitor and Log with Google Cloud Observability",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Build a Website on Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Deploy and Manage Cloud Environments with Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Develop Serverless Apps with Firebase",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Engineer Data for Predictive Modeling with BigQuery ML",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Deploy to Kubernetes in Google Cloud",
        type: "skill",
        points: 0.5,
      },
      {
        title:
          "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Integrate with Machine Learning APIs",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Build a Data Warehouse",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Develop Serverless Applications on Cloud Run",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Create ML Models with BigQuery ML",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Develop GenAI Apps with Gemini and Streamlit",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Derive Insights from BigQuery Data",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Prepare Data for Looker Dashboards and Reports",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Prompt Design in Vertex AI",
        type: "skill",
        points: 0.5,
      },
      {
        title: "Prepare Data for ML APIs on Google Cloud",
        type: "skill",
        points: 0.5,
      },
    ];
    console.log(badgesList.length);
    const textContent = (elem: Element): string => (elem ? elem.textContent!.trim() : "");
    const hrefAtt = (elem: HTMLAnchorElement) => (elem ? elem.href : "");
    const splittedUrl = (url: string) => (url ? url.split("/") : []);
    const lastValueSplitted = (splittedUrl: string[]) =>
      splittedUrl.length ? splittedUrl[splittedUrl.length - 1] : "";

    const h1Name = document.querySelector("h1.ql-display-small")!;
    const name = textContent(h1Name);

    const srcAtt = (elem: HTMLImageElement) => (elem ? elem.src : "");
    const divAvatar: HTMLImageElement = document.querySelector(".profile-avatar")!;
    const avatar = srcAtt(divAvatar);

    const divBadges = [...document.querySelectorAll("div.profile-badge")];
    const badgesInfo = divBadges.map((badge) => ({
      title: textContent(badge.querySelector("span.ql-title-medium")!),
      badgeId: lastValueSplitted(
        splittedUrl(hrefAtt(badge.querySelector("a.badge-image")!))
      ),
      month:
        new Date(
          Date.parse(textContent(badge.querySelector("span.ql-body-medium")!))
        ).getMonth() + 1,
      day: new Date(
        Date.parse(textContent(badge.querySelector("span.ql-body-medium")!))
      ).getDate(),
      year: new Date(
        Date.parse(textContent(badge.querySelector("span.ql-body-medium")!))
      ).getFullYear(),
      points:
        badgesList.find(
          (b) =>
            b.title === textContent(badge.querySelector("span.ql-title-medium")!)
        )?.points ?? 0,
      type:
        badgesList.find(
          (b) =>
            b.title === textContent(badge.querySelector("span.ql-title-medium")!)
        )?.type ?? null,
    }));

    const validTitle = (title: string) =>
      badgesList.map((b) => b.title).includes(title);
    const validDate = (year: number, month: number, day: number) =>
      (year === 2024 && month === 10) ||
      (year === 2024 && month === 11 && day <= 15);
    const validBadges = badgesInfo.filter(
      (badge) =>
        validTitle(badge.title) && validDate(badge.year, badge.month, badge.day)
    );

    //console.log(validBadges);
    const allValidBadges = validBadges.map(
      ({ title, year, month, day, points, badgeId, type }) => ({
        title,
        date: new Date(year, month - 1, day).toISOString().split("T")[0],
        points,
        badgeId,
        type
      })
    );

    // rank: user.games >= 3 && user.trivias >= 3 && user.skillBadges >= 18
    // ? 'gold'
    // : user.games >= 2 && user.trivias >= 2 && user.skillBadges >= 12
    //   ? 'silver'
    //   : user.games >= 1 && user.trivias >= 1 && user.skillBadges >= 6
    //     ? 'bronze'
    //     : 'unranked'

    const games = allValidBadges.reduce((sum, badge) => badge.type === 'game' ? sum + 1 : sum, 0);
    const trivias = allValidBadges.reduce((sum, badge) => badge.type === 'trivia' ? sum + 1 : sum, 0);
    const skillBadges = allValidBadges.reduce((sum, badge) => badge.type === 'skill' ? sum + 1 : sum, 0);
    const arcade = Math.floor(allValidBadges.reduce((sum, badge) => sum + badge.points, 0));
    const bonus = games >= 3 && trivias >= 3 && skillBadges >= 18 
      ? 30 : games >= 2 && trivias >= 2 && skillBadges >= 12
      ? 20 : games >= 1 && trivias >= 1 && skillBadges >= 6
      ? 10 : 0;
    const total = arcade + bonus;
    const milestone = total < 15 
      ? 0 : total < 30
      ? 1 : total < 45
      ? 2 : total < 65
      ? 3 : 4;

    return {
      name,
      avatar,
      badges: allValidBadges,
      totalBadges: {
        games,
        trivias,
        skillBadges,
      },
      points: {
        arcade,
        bonus,
        total
      },
      milestone
    };
  });

  await browser.close();

  return { url, ...badges };
}