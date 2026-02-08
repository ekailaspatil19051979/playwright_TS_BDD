# Step-by-Step Guide: Running Playwright Tests with Docker

This guide explains how to containerize and execute your Playwright tests using Docker from scratch.

## 📋 Prerequisites
1.  **Docker Desktop**: Installed and running on your machine.
2.  **Project Files**: `Dockerfile` and `docker-compose.yml` should be in your project root.

---

## 🏗️ Step 1: Build the Docker Image
Open your terminal in the project root and run:
```bash
docker build -t playwright-tests .
```
*   `-t playwright-tests`: Tags your image with a name for easy reference.
*   `.`: Indicates the current directory contains the `Dockerfile`.

---

## 🚀 Step 2: Run Tests in a Container
Execute the following to run your tests immediately:
```bash
docker run -it --rm --ipc=host playwright-tests
```
*   `-it`: Interactive terminal.
*   `--rm`: Automatically remove the container when tests finish.
*   `--ipc=host`: Prevents browser crashes by giving Chrome more shared memory.

---

## 📊 Step 3: Run with Report Mounting (Persistent Results)
By default, files generated inside the container disappear when it stops. To see the reports on your local machine:
```bash
docker run -it --rm --ipc=host -v ${PWD}/reports:/app/reports playwright-tests
```
*   `-v ${PWD}/reports:/app/reports`: Maps your local `reports` folder to the container's `reports` folder.
*   *Note for Windows PowerShell*: Use `${PWD}` or `$pwd`.

---

## 🛠️ Step 4: Using Docker Compose
If you prefer not to remember long commands, use docker-compose:
```bash
docker-compose up --build
```
This will automatically build the image and start the container as defined in your `docker-compose.yml` file.

---

## 🔍 Step 5: Troubleshooting
*   **Memory Issues**: If browsers fail to launch, ensure Docker has at least 4GB of RAM allocated in settings.
*   **Network**: If tests can't reach your app, ensure the container has access to the host network or the app is also running in a Docker network.
