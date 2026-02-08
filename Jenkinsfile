pipeline {
    agent any

    environment {
        CI = 'true'
        NODE_VERSION = '18'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Reporting') {
            steps {
                allure includeProperties: false, jdk: '', results: [[path: 'reports/allure-results']]
            }
        }
    }
}
