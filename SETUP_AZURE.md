# Step-by-Step Guide: Running Playwright Tests in Azure DevOps

This guide details how to set up your Playwright tests using Azure Pipelines from scratch.

## 📋 Prerequisites
1.  **Azure DevOps Account**: Access to an Organization and Project.
2.  **Repo in Azure Repos or GitHub**: Your code pushed and accessible.

---

## 🏗️ Step 1: Import Your Code
1.  Go to **Repos** in your Azure DevOps project.
2.  If your code is in GitHub:
    *   You can skip to Step 2 to connect via the Pipeline wizard.
3.  If importing to Azure Repos:
    *   Click **Import** and provide the Git clone URL of your repository.

---

## 📄 Step 2: Create a New Pipeline
1.  Navigate to **Pipelines** > **Pipelines** and click **New Pipeline**.
2.  **Where is your code?**: Select `GitHub` or `Azure Repos Git`.
3.  **Select a repository**: Choose your Playwright project repo.
4.  **Configure your pipeline**: Select **Existing Azure Pipelines YAML file**.
    *   **Path**: Select `/azure-pipelines.yml` from the dropdown.

---

## 🛠️ Step 3: Configure Environment Variables (Optional)
If your framework requires sensitive data (like `AUTH_PASSWORD`):
1.  While editing the pipeline, click the **Variables** button at the top right.
2.  Add your variables (e.g., Name: `AUTH_PASSWORD`, Value: `yourpassword`).
3.  Ensure you check **"Keep this value secret"**.

---

## 🚀 Step 4: Run the Pipeline
1.  Click **Run**. 
2.  The pipeline will use the `azure-pipelines.yml` file to:
    *   Install Node.js.
    *   Install dependencies and browser binaries.
    *   Execute tests.
    *   Publish results to the **Tests** tab.

---

## 🔍 Step 5: Analyze Results
1.  Go to the **Runs** tab.
2.  Click on the latest run.
3.  View the **Tests** tab for a summary of pass/fail scenarios.
4.  Check **Artifacts** (if configured in YAML) to download the Playwright Trace Viewer zip or HTML reports.
