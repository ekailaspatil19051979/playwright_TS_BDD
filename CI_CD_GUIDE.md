# CI/CD & DevOps Setup Guide for Playwright Framework

This guide provides step-by-step instructions for setting up Git, Jenkins, Azure DevOps, and Docker for your Playwright automation framework.

## 1. Creating and Pushing to a Git Repository

### Step 1: Initialize Git
Open your project root (`d:\playwright_TS_BDD`) in the terminal and run:
```bash
git init
```

### Step 2: Create .gitignore
Ensure you have a `.gitignore` file to avoid committing unnecessary files:
```text
node_modules/
test-results/
playwright-report/
allure-results/
allure-report/
.env
.DS_Store
dist/
```

### Step 3: Stage and Commit Files
```bash
git add .
git commit -m "Initial commit of Playwright framework"
```

### Step 4: Create a Repository on GitHub/GitLab/Bitbucket
1.  Go to GitHub (or your provider) and create a new repository.
2.  Copy the remote repository URL (e.g., `https://github.com/your-username/playwright-bdd-framework.git`).

### Step 5: Link and Push
```bash
git remote add origin https://github.com/your-username/playwright-bdd-framework.git
git branch -M main
git push -u origin main
```

---

## 2. Jenkins Setup & Job Creation

### Step 1: Install Node.js Plugin
1.  Go to **Manage Jenkins** > **Plugins** > **Available**.
2.  Search for and install **NodeJS Plugin**.
3.  Go to **Global Tool Configuration** > **NodeJS**.
4.  Add a NodeJS installation (e.g., name it `Node18`) and check "Install automatically".

### Step 2: Create a New Job
1.  **New Item** > Enter Job Name (e.g., "Playwright-Tests") > Select **Pipeline**.
2.  Click **OK**.

### Step 3: Configure Pipeline
1.  Scroll to the **Pipeline** section.
2.  **Definition**: Select "Pipeline script from SCM".
3.  **SCM**: Git.
4.  **Repository URL**: Enter your Repo URL.
5.  **Branch Specifier**: `*/main`.
6.  **Script Path**: `Jenkinsfile` (Ensure you have this file in your root).

### Step 4: Run the Job
1.  Click **Build Now**.
2.  Monitor the **Console Output**.
3.  Once finished, check the **Allure Report** icon on the job dashboard (requires Allure Jenkins plugin).

---

## 3. Azure DevOps Pipeline Setup

### Step 1: Create a Project
1.  Log in to Azure DevOps.
2.  Create a **New Project**.

### Step 2: Connect Code
1.  Go to **Repos** and import your code OR connect your GitHub repo.

### Step 3: Create Pipeline
1.  Go to **Pipelines** > **Create Pipeline**.
2.  Select source (e.g., **GitHub** or **Azure Repos Git**).
3.  Select your repository.
4.  Select **Existing Azure Pipelines YAML file**.
5.  Point to `azure-pipelines.yml` in your repo.

### Step 4: Run Pipeline
1.  Review the YAML.
2.  Click **Run**.
3.  The pipeline will spin up an agent, install dependencies, and run your tests.
4.  View results in the **Tests** tab of the run summary.

*(Note: Ensure your `azure-pipelines.yml` publishes test results using the JUnit reporter configured in `playwright.config.ts`)*

---

## 4. Docker Execution

### Step 1: Build the Image
In the directory containing your `Dockerfile`, run:
```bash
docker build -t playwright-tests .
```

### Step 2: Run Tests in Container
Run the Docker container to execute tests:
```bash
docker run -it --rm --ipc=host playwright-tests
```
*(Note: `--ipc=host` is recommended for browser operations in Docker).*

### Step 3: Run with Reports Mounted
To see the reports generated inside the container on your local machine:
```bash
docker run -it --rm --ipc=host -v ${PWD}/playwright-report:/app/playwright-report playwright-tests
```
(On Windows PowerShell, replace `${PWD}` with `%cd%` or valid absolute path).

### Step 4: Docker Compose (Optional)
If you have `docker-compose.yml`, simply run:
```bash
docker-compose up --build
```
This is useful if you need to spin up other services (like a mock API or database) alongside your tests.
