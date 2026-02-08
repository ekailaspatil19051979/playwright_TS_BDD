# Step-by-Step Guide: Running Playwright Tests in Jenkins

This guide details how to set up and run your Playwright automation from scratch on a Jenkins server.

## 📋 Prerequisites
1.  **Jenkins Server**: Installed and running (Windows, Linux, or Docker).
2.  **Plugins**: Install the following from *Manage Jenkins > Plugins*:
    *   **NodeJS Plugin** (mandatory)
    *   **Allure Jenkins Plugin** (recommended for reporting)
    *   **Git Plugin** (for source control)

---

## 🛠️ Step 1: Global Tool Configuration
1.  Go to **Manage Jenkins** > **Global Tool Configuration**.
2.  Find the **NodeJS** section and click **NodeJS Installations...**.
3.  Add a new installation:
    *   **Name**: `Node18` (or your preferred version).
    *   **Install automatically**: Checked.
    *   **Version**: Select `NodeJS 18.x` or higher.
4.  Click **Save**.

---

## 🏗️ Step 2: Create the Pipeline Job
1.  On the Jenkins Dashboard, click **New Item**.
2.  Enter name: `Playwright-Automation-Framework`.
3.  Select **Pipeline** and click **OK**.

---

## 📄 Step 3: Configure Pipeline from Source Control
1.  In the Job configuration, scroll down to the **Pipeline** section.
2.  **Definition**: Select `Pipeline script from SCM`.
3.  **SCM**: Select `Git`.
4.  **Repository URL**: Enter your Repo URL (e.g., `https://github.com/user/repo.git`).
5.  **Credentials**: Select or add your Git credentials if the repo is private.
6.  **Branch Specifier**: `*/main`.
7.  **Script Path**: `Jenkinsfile`.
8.  Click **Save**.

---

## 🚀 Step 4: Run the Tests
1.  Click **Build Now** on the left sidebar.
2.  Jenkins will:
    *   Provision an agent.
    *   Check out your code.
    *   Install Node.js dependencies (`npm ci`).
    *   Install Playwright browsers (`npx playwright install`).
    *   Execute the tests (`npm test`).
    *   Generate and archive Allure/HTML reports.

---

## 🔍 Step 5: View Results
1.  Once the build finishes, click on the build number.
2.  Click the **Allure Report** icon or **Artifacts** to see the interactive HTML results.
3.  Check the **Console Output** for real-time execution logs.
