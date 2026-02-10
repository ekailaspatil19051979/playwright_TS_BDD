# OOP Concepts in Playwright TypeScript BDD Framework

This document provides a comprehensive explanation of all Object-Oriented Programming (OOP) concepts implemented in this automation framework, with real examples from the codebase and interview-ready explanations.

---

## Table of Contents
1. [Encapsulation](#1-encapsulation)
2. [Abstraction](#2-abstraction)
3. [Inheritance](#3-inheritance)
4. [Polymorphism](#4-polymorphism)
5. [Composition](#5-composition)
6. [Singleton Pattern](#6-singleton-pattern)
7. [Factory Pattern](#7-factory-pattern)
8. [Dependency Injection](#8-dependency-injection)
9. [Interview Q&A](#9-interview-qa)

---

## 1. Encapsulation

### Definition
Encapsulation is the bundling of data (properties) and methods (functions) that operate on that data within a single unit (class), while restricting direct access to some of the object's components.

### Implementation in Our Framework

#### Example 1: Page Object Model (LoginPage.ts)
```typescript
export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
```

**What's Encapsulated:**
- **Data**: `page`, `usernameInput`, `passwordInput`, `loginButton` are private to the class
- **Behavior**: The `login()` method encapsulates the complex logic of filling forms
- **Access Control**: Using `readonly` prevents external modification of locators

**Benefits:**
- Test scripts don't need to know HOW login works, just call `loginPage.login(user, pass)`
- If the login UI changes, we only update the LoginPage class, not 50 test files
- Locators are protected from accidental modification

### Interview Explanation
> "In our framework, we use encapsulation extensively through the Page Object Model. For example, the LoginPage class encapsulates all login-related locators and actions. The test scripts don't directly interact with Playwright locators; instead, they call high-level methods like `login()`. This means if the login form changes from using IDs to using test-ids, I only need to update the LoginPage class, not every test that uses login functionality. This demonstrates data hiding and behavior bundling, which are the core principles of encapsulation."

---

## 2. Abstraction

### Definition
Abstraction means hiding complex implementation details and showing only the essential features of an object. It focuses on WHAT an object does rather than HOW it does it.

### Implementation in Our Framework

#### Example 1: API Service Layer (AuthAPI.ts)
```typescript
export class AuthAPI {
    readonly request: APIRequestContext;
    readonly baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    async getToken(username: string, password: string) {
        const response = await this.request.post(`${this.baseUrl}/auth`, {
            data: { username, password }
        });
        const json = await response.json();
        return json.token;
    }
}
```

**What's Abstracted:**
- The complexity of HTTP POST requests
- JSON parsing logic
- Error handling (could be added)
- The test just calls `authAPI.getToken(user, pass)` and gets a token

#### Example 2: LocatorHelper Utility
```typescript
export class LocatorHelper {
    static getSubmitButton(page: Page): Locator {
        return page.getByRole('button', { name: /submit|save|confirm/i });
    }

    static getEmailInput(page: Page): Locator {
        return page.getByLabel(/email/i).or(page.getByPlaceholder(/email/i));
    }
}
```

**What's Abstracted:**
- Complex regex patterns for flexible matching
- Fallback logic (try label, then placeholder)
- The caller just needs `LocatorHelper.getEmailInput(page)`

### Interview Explanation
> "Abstraction is about hiding complexity. In our framework, the AuthAPI class abstracts away all the HTTP request details. When a test needs an authentication token, it simply calls `authAPI.getToken(username, password)` without worrying about POST requests, headers, or JSON parsing. Similarly, our LocatorHelper class abstracts complex locator strategies—tests just call `getEmailInput()` without knowing whether it's using getByLabel or getByPlaceholder. This makes our tests more readable and maintainable."

---

## 3. Inheritance

### Definition
Inheritance allows a class to inherit properties and methods from another class, promoting code reuse and establishing a hierarchical relationship.

### Implementation in Our Framework

#### Example 1: Base Page Class (Conceptual)
```typescript
// BasePage.ts - Parent class with common functionality
export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `screenshots/${name}.png` });
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }
}

// LoginPage.ts - Child class inheriting from BasePage
export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;

    constructor(page: Page) {
        super(page); // Call parent constructor
        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        // Can use inherited methods
        await this.waitForPageLoad();
    }
}

// BookingPage.ts - Another child class
export class BookingPage extends BasePage {
    readonly firstNameInput: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.getByPlaceholder('First Name');
    }

    async fillBooking(firstName: string) {
        await this.firstNameInput.fill(firstName);
        await this.waitForPageLoad(); // Inherited method
    }
}
```

**Benefits:**
- Common methods like `goto()`, `waitForPageLoad()`, `takeScreenshot()` are written once
- All page classes inherit these utilities automatically
- Reduces code duplication across 10+ page objects

### Interview Explanation
> "We use inheritance through a BasePage class that contains common functionality like navigation, waiting for page load, and screenshot capture. All our page objects—LoginPage, BookingPage, ContactPage—extend this BasePage. This means I write the `waitForPageLoad()` method once in BasePage, and all child classes can use it. This follows the DRY principle and creates a clear hierarchy where BasePage defines the contract that all pages must follow."

---

## 4. Polymorphism

### Definition
Polymorphism allows objects of different classes to be treated as objects of a common parent class. The same method name can behave differently based on the object calling it.

### Implementation in Our Framework

#### Example 1: Method Overriding
```typescript
// BasePage.ts
export class BasePage {
    async goto(url: string) {
        await this.page.goto(url);
    }
}

// LoginPage.ts - Overrides goto with custom behavior
export class LoginPage extends BasePage {
    async goto() {
        await this.page.goto('/#/admin');
        // Additional login-specific logic
        await this.page.waitForSelector('#username', { timeout: 10000 });
    }
}

// BookingPage.ts - Different implementation of goto
export class BookingPage extends BasePage {
    async goto() {
        await this.page.goto('/');
        // Check for 404 errors specific to booking page
        if (await this.page.getByText('404').isVisible()) {
            throw new Error('Page not found');
        }
    }
}
```

**Polymorphic Behavior:**
```typescript
// In test code
const pages: BasePage[] = [new LoginPage(page), new BookingPage(page)];

for (const pageObj of pages) {
    await pageObj.goto(); // Calls the appropriate version based on actual type
}
```

#### Example 2: Interface-based Polymorphism
```typescript
// Define a common interface
interface Submittable {
    submit(): Promise<void>;
    verifySuccess(): Promise<void>;
}

// ContactPage implements the interface
export class ContactPage implements Submittable {
    async submit() {
        await this.submitButton.click();
    }

    async verifySuccess() {
        await expect(this.successMessage).toBeVisible();
    }
}

// BookingPage implements the same interface
export class BookingPage implements Submittable {
    async submit() {
        await this.submitBookingButton.click();
    }

    async verifySuccess() {
        await expect(this.confirmationMessage).toBeVisible();
    }
}

// Test code can treat both polymorphically
async function submitForm(form: Submittable) {
    await form.submit();
    await form.verifySuccess();
}
```

### Interview Explanation
> "Polymorphism in our framework is demonstrated through method overriding. For example, every page class has a `goto()` method, but each implements it differently. LoginPage's goto navigates to '/#/admin' and waits for the username field, while BookingPage's goto navigates to '/' and checks for 404 errors. This allows us to write generic code that works with any page object, but the behavior adapts based on the actual page type. We also use interface-based polymorphism where different form pages implement a common Submittable interface, allowing us to write generic form submission logic."

---

## 5. Composition

### Definition
Composition is a design principle where a class contains instances of other classes as members, establishing a "has-a" relationship rather than "is-a" (inheritance).

### Implementation in Our Framework

#### Example 1: Page Objects Composing Locators
```typescript
export class ContactPage {
    readonly page: Page;           // ContactPage HAS-A Page
    readonly nameInput: Locator;   // ContactPage HAS-A Locator
    readonly emailInput: Locator;  // ContactPage HAS-A Locator
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByPlaceholder('Name');
        this.emailInput = page.getByPlaceholder('Email');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
    }
}
```

#### Example 2: Service Composition
```typescript
export class AuthAPI {
    readonly request: APIRequestContext;  // AuthAPI HAS-A APIRequestContext
    readonly baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }
}
```

#### Example 3: Complex Composition
```typescript
// A test scenario class that composes multiple page objects
export class BookingFlowScenario {
    readonly loginPage: LoginPage;      // HAS-A LoginPage
    readonly bookingPage: BookingPage;  // HAS-A BookingPage
    readonly adminPage: AdminPage;      // HAS-A AdminPage

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.bookingPage = new BookingPage(page);
        this.adminPage = new AdminPage(page);
    }

    async executeCompleteBookingFlow(user: string, pass: string) {
        await this.loginPage.login(user, pass);
        await this.bookingPage.fillBookingDetails('John', 'Doe');
        await this.adminPage.verifyDashboardVisible();
    }
}
```

**Composition vs Inheritance:**
- **Inheritance**: "BookingPage IS-A BasePage"
- **Composition**: "BookingPage HAS-A Page, HAS-A Locator"

### Interview Explanation
> "We favor composition over inheritance in many cases. For example, our ContactPage class doesn't inherit from a Form class; instead, it composes multiple Locator objects. This 'has-a' relationship is more flexible than 'is-a'. Similarly, our AuthAPI class composes an APIRequestContext rather than extending it. This gives us more control and avoids the fragile base class problem. We also use composition in scenario classes that combine multiple page objects to execute complex workflows."

---

## 6. Singleton Pattern

### Definition
Singleton ensures a class has only one instance throughout the application and provides a global point of access to it.

### Implementation in Our Framework

#### Example 1: Page Fixture Singleton
```typescript
// pageFixture.ts
import { Page } from '@playwright/test';

export const pageFixture = {
    page: undefined as Page
};
```

**Usage in Hooks:**
```typescript
// hooks.ts
import { pageFixture } from './pageFixture';

Before(async function() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    pageFixture.page = await context.newPage(); // Single instance
});

// All step definitions use the same page instance
Given('I am on the login page', async function() {
    const loginPage = new LoginPage(pageFixture.page);
    await loginPage.goto();
});
```

#### Example 2: Logger Singleton (Conceptual)
```typescript
// Logger.ts
export class Logger {
    private static instance: Logger;
    private logFile: string;

    private constructor() {
        this.logFile = 'reports/logs/execution.log';
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public log(message: string) {
        // Write to log file
        console.log(`[LOG] ${message}`);
    }
}

// Usage
const logger = Logger.getInstance();
logger.log('Test started');
```

**Benefits:**
- Only one browser page instance exists per scenario
- All step definitions share the same page state
- Prevents memory leaks from creating multiple browser instances

### Interview Explanation
> "We use the Singleton pattern for our page fixture. In BDD, multiple step definitions need to interact with the same browser page instance. Instead of passing the page object around, we use a singleton pageFixture that's initialized once in the Before hook and accessed by all steps. This ensures state consistency—when one step navigates to a page, the next step sees that navigation. We also use Singleton for our Logger class to ensure all logs go to a single file with proper sequencing."

---

## 7. Factory Pattern

### Definition
Factory pattern provides an interface for creating objects without specifying their exact class. It encapsulates object creation logic.

### Implementation in Our Framework

#### Example 1: Data Factory
```typescript
// DataFactory.ts
export class DataFactory {
    static getContactDetails() {
        return {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number().substring(0, 11),
            subject: faker.lorem.sentence(3),
            message: faker.lorem.paragraph()
        };
    }

    static getBookingDetails() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            totalPrice: faker.number.int({ min: 100, max: 1000 }),
            depositPaid: true,
            checkin: faker.date.soon({ days: 10 }).toISOString().split('T')[0],
            checkout: faker.date.soon({ days: 20 }).toISOString().split('T')[0]
        };
    }

    static getInvalidContactDetails() {
        return {
            name: 'AB', // Too short
            email: 'invalid-email',
            phone: '123', // Too short
            subject: '',
            message: ''
        };
    }
}

// Usage in tests
const validData = DataFactory.getContactDetails();
const invalidData = DataFactory.getInvalidContactDetails();
```

#### Example 2: Page Factory (Conceptual)
```typescript
// PageFactory.ts
export class PageFactory {
    static createPage(pageType: string, page: Page) {
        switch(pageType) {
            case 'login':
                return new LoginPage(page);
            case 'booking':
                return new BookingPage(page);
            case 'contact':
                return new ContactPage(page);
            case 'admin':
                return new AdminPage(page);
            default:
                throw new Error(`Unknown page type: ${pageType}`);
        }
    }
}

// Usage
const loginPage = PageFactory.createPage('login', page);
const bookingPage = PageFactory.createPage('booking', page);
```

**Benefits:**
- Centralized object creation logic
- Easy to add new data types or page types
- Tests don't need to know the complex construction logic

### Interview Explanation
> "We implement the Factory pattern through our DataFactory class. Instead of manually creating test data objects in every test, we call factory methods like `DataFactory.getContactDetails()` which encapsulates the creation logic using Faker.js. This is especially powerful for data-driven testing—we can easily generate 100 unique contact records by calling the factory in a loop. The factory also provides different variants like `getInvalidContactDetails()` for negative testing. This centralizes data creation and makes it easy to modify data structure across all tests."

---

## 8. Dependency Injection

### Definition
Dependency Injection is a design pattern where an object receives its dependencies from external sources rather than creating them itself.

### Implementation in Our Framework

#### Example 1: Constructor Injection in Page Objects
```typescript
// Instead of creating Page internally, we inject it
export class LoginPage {
    readonly page: Page; // Dependency

    constructor(page: Page) { // Injected via constructor
        this.page = page;
        // ...
    }
}

// Usage
const page = await context.newPage(); // Created externally
const loginPage = new LoginPage(page); // Injected
```

**Without DI (Bad):**
```typescript
export class LoginPage {
    readonly page: Page;

    constructor() {
        // Creating dependency internally - TIGHT COUPLING
        this.page = await chromium.launch().newPage();
    }
}
```

#### Example 2: API Service Dependency Injection
```typescript
export class AuthAPI {
    readonly request: APIRequestContext; // Dependency
    readonly baseUrl: string;            // Dependency

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request; // Both injected
        this.baseUrl = baseUrl;
    }
}

// Usage
const request = await playwright.request.newContext();
const authAPI = new AuthAPI(request, 'https://api.example.com');
```

#### Example 3: Method Injection
```typescript
export class ContactPage {
    async submitContactForm(details: ContactDetails) { // details injected
        await this.nameInput.fill(details.name);
        await this.emailInput.fill(details.email);
        // ...
    }
}

// Usage
const contactData = DataFactory.getContactDetails();
await contactPage.submitContactForm(contactData); // Injected
```

**Benefits:**
- **Testability**: Easy to inject mock objects for unit testing
- **Flexibility**: Can inject different implementations (e.g., different browsers)
- **Loose Coupling**: Classes don't depend on concrete implementations

### Interview Explanation
> "Dependency Injection is fundamental to our framework's design. For example, our LoginPage class doesn't create its own Page instance; instead, it receives it through the constructor. This means we can inject different page contexts—one for Chrome, one for Firefox, or even a mock page for unit testing. Similarly, our AuthAPI receives the APIRequestContext and baseUrl as dependencies, allowing us to easily switch between dev, staging, and production environments by injecting different URLs. This makes our code highly testable and loosely coupled."

---

## 9. Interview Q&A

### Q1: "Explain how you've used OOP in your automation framework."
**Answer:**
> "Our framework is built on OOP principles. We use **Encapsulation** through the Page Object Model where each page class encapsulates its locators and actions. We implement **Abstraction** in our API service layer to hide HTTP complexity. We use **Inheritance** with a BasePage class that provides common functionality to all page objects. **Polymorphism** allows us to override methods like `goto()` differently for each page. We favor **Composition** over inheritance for flexibility, and we use design patterns like **Singleton** for the page fixture, **Factory** for data generation, and **Dependency Injection** for loose coupling."

### Q2: "What's the difference between Inheritance and Composition? Which do you prefer?"
**Answer:**
> "Inheritance creates an 'is-a' relationship (LoginPage IS-A BasePage), while Composition creates a 'has-a' relationship (LoginPage HAS-A Page). I prefer Composition because it's more flexible and avoids the fragile base class problem. For example, if I change the BasePage, all child classes are affected with inheritance. With composition, I can swap out dependencies easily. In our framework, we use inheritance for BasePage to share common utilities, but we use composition for most other relationships—like how ContactPage composes Locator objects rather than inheriting from a Locator class."

### Q3: "How does the Singleton pattern help in your framework?"
**Answer:**
> "We use Singleton for the page fixture to ensure all step definitions in a BDD scenario interact with the same browser page instance. Without Singleton, each step might create a new page, losing the state from previous steps. For example, if the 'Given' step logs in and the 'When' step tries to click a button, they need to share the same page. The Singleton pattern guarantees this. We also use it for the Logger to ensure all logs are written to a single file in the correct sequence."

### Q4: "Explain Dependency Injection with an example from your framework."
**Answer:**
> "In our framework, every Page Object receives the Page instance through constructor injection. For example, `new LoginPage(page)` injects the page dependency. This makes our code testable—I can inject a mock page for unit testing. It also makes it flexible—I can inject pages from different browser contexts or even different browsers. Similarly, our AuthAPI receives the APIRequestContext and baseUrl as dependencies, allowing us to easily switch environments by injecting different URLs. This follows the Dependency Inversion Principle from SOLID."

### Q5: "How do you implement the Factory pattern?"
**Answer:**
> "We use the Factory pattern in our DataFactory class. Instead of creating test data objects manually in each test, we call `DataFactory.getContactDetails()` which uses Faker.js to generate unique data. This centralizes the creation logic—if we need to change the data structure, we update it in one place. We also have methods like `getInvalidContactDetails()` for negative testing. This makes our tests cleaner and more maintainable. We could extend this to a PageFactory that creates page objects based on a string identifier."

### Q6: "What's the benefit of Encapsulation in Page Object Model?"
**Answer:**
> "Encapsulation in POM means test scripts don't directly interact with locators or Playwright APIs. For example, instead of writing `page.getByTestId('username').fill('admin')` in every test, we call `loginPage.login('admin', 'password')`. This has three benefits: First, if the username locator changes, I update one place (LoginPage) instead of 50 tests. Second, it makes tests more readable—business stakeholders can understand `login()` but not Playwright syntax. Third, it allows us to add complex logic like retry mechanisms or logging inside the method without changing test code."

### Q7: "How would you explain Polymorphism to a non-technical person?"
**Answer:**
> "Polymorphism means 'many forms'. Imagine a remote control with a 'Play' button. When you point it at a TV, it plays a video. When you point it at a speaker, it plays music. Same button, different behavior based on the device. In our framework, we have a `goto()` method in multiple page classes. When called on LoginPage, it navigates to the admin page. When called on BookingPage, it navigates to the home page and checks for errors. Same method name, different behavior based on the object. This allows us to write generic code that works with any page object."

### Q8: "What SOLID principles do you follow?"
**Answer:**
> "We follow all five SOLID principles:
> - **S (Single Responsibility)**: Each page class handles only one page. LoginPage doesn't handle booking logic.
> - **O (Open/Closed)**: Our BasePage is open for extension (child classes can override methods) but closed for modification.
> - **L (Liskov Substitution)**: Any child of BasePage can replace BasePage without breaking functionality.
> - **I (Interface Segregation)**: We create small, focused interfaces like `Submittable` rather than one giant interface.
> - **D (Dependency Inversion)**: Our classes depend on abstractions (Page interface) not concrete implementations, achieved through Dependency Injection."

---

## Summary Table: OOP Concepts in Framework

| OOP Concept | Implementation | Example File | Interview Keyword |
|-------------|----------------|--------------|-------------------|
| **Encapsulation** | Page Object Model | `LoginPage.ts`, `ContactPage.ts` | "Data hiding, bundling behavior" |
| **Abstraction** | Service Layer | `AuthAPI.ts`, `LocatorHelper.ts` | "Hide complexity, show essentials" |
| **Inheritance** | BasePage pattern | `BasePage.ts` → `LoginPage.ts` | "Code reuse, IS-A relationship" |
| **Polymorphism** | Method overriding | `goto()` in different pages | "Same interface, different behavior" |
| **Composition** | Page has Locators | `ContactPage` has `nameInput` | "HAS-A relationship, flexibility" |
| **Singleton** | Page Fixture | `pageFixture.ts` | "Single instance, global access" |
| **Factory** | Data generation | `DataFactory.ts` | "Centralized object creation" |
| **Dependency Injection** | Constructor injection | All Page Objects | "Loose coupling, testability" |

---

## Final Interview Tips

1. **Always give real examples** from your framework, not textbook definitions
2. **Explain the "why"** - Why did you choose composition over inheritance?
3. **Connect to benefits** - How does this make tests more maintainable?
4. **Use analogies** for complex concepts when talking to non-technical interviewers
5. **Be ready to code** - Can you write a quick Page Object on a whiteboard?
6. **Know the tradeoffs** - When would you NOT use a pattern?

**Pro Tip**: Print this document and practice explaining each concept out loud. The best answers combine theory + real example + benefit in under 2 minutes.
