
# Architecture Overview

This document explains the overall structure of the Playwright TypeScript BDD automation framework.

## High Level Layers

- Feature Files (BDD Scenarios)
- Step Definitions
- Page Objects
- API Layer
- Database Layer
- Utilities
- CI/CD Integration

## Data Flow

Feature → Steps → Pages/API/DB → Assertions

## Key Characteristics

- Hybrid UI + API + DB testing
- Parallel execution
- Environment based configs
- Allure reporting
- Docker and GitHub Actions

## Benefits

- Maintainable
- Scalable
- Reusable
- Enterprise ready
