# Project Wiki & Technical Documentation

## Table of Contents

| Module / Feature                                                                      | Status      |
| :------------------------------------------------------------------------------------ | :---------- |
| **Core Application**                                                                    |             |
| &nbsp;&nbsp;&nbsp;&nbsp;[Application Root & Global Setup](./app/README.md)              | [To Do]     |
| &nbsp;&nbsp;&nbsp;&nbsp;**Authentication & Authorization**                                        |             |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Login (Main Flow)](./app/login.md)       | [Done]      |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Signup](./app/signup.md)                 | [Draft]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Auth Login (Alternative/Internal)](./app/auth/login.md) | [Done]      |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Forgot Password](./app/auth/forgot-password.md) | [Draft]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Register (Alternative/Internal)](./app/auth/register.md) | [Draft]     |
| &nbsp;&nbsp;&nbsp;&nbsp;**Top-Level Dashboard (Admin/General)**                                   |             |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[General Dashboard](./app/dashboard/index.md)   | [Draft]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[General Projects](./app/dashboard/projects.md) | [Draft]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[General Tasks](./app/dashboard/tasks.md)     | [Draft]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[General Team](./app/dashboard/team.md)       | [Draft]     |
| **Workspace (`[subdomain]`)**                                                             |             |
| &nbsp;&nbsp;&nbsp;&nbsp;[Workspace Overview](./app/workspace/_subdomain_/index.md)          | [Draft]     |
| &nbsp;&nbsp;&nbsp;&nbsp;**Workspace-Specific Dashboard**                                            |             |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Dashboard](./app/workspace/_subdomain_/dashboard/index.md) | [Draft]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Projects](./app/workspace/_subdomain_/dashboard/projects.md) | [Draft]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Tasks](./app/workspace/_subdomain_/dashboard/tasks.md) | [Draft]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Team](./app/workspace/_subdomain_/dashboard/team.md) | [Draft]     |
| &nbsp;&nbsp;&nbsp;&nbsp;**Native Workspace Modules**                                              |             |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Analytics](./app/workspace/_subdomain_/analytics.md) | [Draft]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Badges](./app/workspace/_subdomain_/badges.md) | [Draft]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Bench](./app/workspace/_subdomain_/bench.md)   | [Draft]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Calendar](./app/workspace/_subdomain_/calendar.md) | [Draft]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Files](./app/workspace/_subdomain_/files.md)     | [To Do]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Leaderboard](./app/workspace/_subdomain_/leaderboard.md) | [To Do]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Onboarding](./app/workspace/_subdomain_/onboarding.md) | [To Do]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Profile](./app/workspace/_subdomain_/profile.md) | [To Do]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Projects (Native)](./app/workspace/_subdomain_/projects.md) | [To Do]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Settings](./app/workspace/_subdomain_/settings.md) | [To Do]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Sprints](./app/workspace/_subdomain_/sprints.md) | [To Do]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Store](./app/workspace/_subdomain_/store.md)   | [To Do]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Tasks (Native)](./app/workspace/_subdomain_/tasks.md) | [To Do]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Team (Native)](./app/workspace/_subdomain_/team.md) | [To Do]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Time Tracking](./app/workspace/_subdomain_/time-tracking.md) | [To Do]     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Vacations](./app/workspace/_subdomain_/vacations.md) | [To Do]     |
| **Shared Libraries & Components**                                                         |             |
| &nbsp;&nbsp;&nbsp;&nbsp;[Components Overview](./components/README.md)                       | [To Do]     |
| &nbsp;&nbsp;&nbsp;&nbsp;[Lib Overview](./lib/README.md)                                   | [To Do]     |

*(This Table of Contents will be updated as module pages are created/modified. Ensure all links are relative.)*

---

This wiki contains the technical documentation for the project, organized by module. Its purpose is to ensure clarity for both human developers and AI tools, facilitating development, onboarding, and maintenance.

## Documentation Guidelines

To ensure consistency and utility, all module documentation pages should adhere to the following structure and principles:

1.  **Module Title:** Use the format: `Module: [Descriptive Module Name]`. If it's a sub-module, indicate parentage, e.g., `Module: Workspace Dashboard - Projects`.
2.  **Overview:**
    *   A concise summary of the module's purpose, its core value, and its role in the overall application.
    *   Identify the primary users or actors interacting with this module (e.g., end-users, administrators, other modules).
3.  **Features / User Stories:**
    *   Enumerate specific functionalities.
    *   Employ user stories for clarity (e.g., "As a [type of user], I want to [perform an action] so that [I can achieve a goal].").
    *   Break down complex features into granular, testable units.
4.  **UI Components & Design:**
    *   **Description:** Detail each distinct UI view, page, or significant component (e.g., forms, tables, modals, navigation bars).
    *   **Key Elements:** List all interactive elements: input fields (specify type, e.g., text, email, password, dropdown, checkbox), buttons (specify type: primary, secondary, destructive), links, data displays.
    *   **User Flows:** Describe step-by-step user interactions and screen transitions. Diagrams or flowcharts (can be text-based if images are not supported) are encouraged for complex flows.
    *   **States:** Document different UI states (e.g., empty, loading, error, success, disabled, partial data).
    *   **Accessibility:** Briefly note any specific accessibility considerations (e.g., ARIA attributes, keyboard navigation).
5.  **Data Model:**
    *   Define key data entities the module creates, reads, updates, or deletes (CRUD).
    *   Specify attributes for each entity, including data types (string, number, boolean, date, array, object), constraints (e.g., required, unique, min/max length), and relationships with other entities (e.g., one-to-one, one-to-many, many-to-many).
    *   Example: `User { id: UUID (PK), email: String (unique, required), hashedPassword: String, ... }`
6.  **API Endpoints (Client-Side Modules):**
    *   List backend API endpoints consumed by this module.
    *   Specify: HTTP method (GET, POST, PUT, DELETE, PATCH), full URL (or path pattern), expected request payload structure (with data types), and expected response structure (success and error, with status codes and data types).
7.  **API Endpoints (Server-Side Modules / API Itself):**
    *   List API endpoints exposed by this module.
    *   Specify: HTTP method, URL path, request parameters (path, query, body with data types and validation rules), response structures (success and error, with status codes and data types), and authentication/authorization requirements.
8.  **Business Logic & Rules:**
    *   Detail any specific algorithms, calculations, validation rules (beyond basic data type checks), or conditional logic critical to the module's operation.
    *   Example: "If user role is 'Editor', they can edit posts but not delete them."
9.  **Interactions & Dependencies:**
    *   How does this module interact with other modules (both UI and data flow)?
    *   What events does it emit or listen to?
    *   What data does it require from other modules, or provide to them?
    *   Are there any prerequisites for its use (e.g., "User must be authenticated")?
    *   List external services or libraries it depends on.
10. **Acceptance Criteria (Gherkin Format Recommended):**
    *   For each key feature or user story, define clear, testable acceptance criteria using Gherkin (Given-When-Then).
    *   Example:
        ```gherkin
        Feature: User Login
          Scenario: Successful login with valid credentials
            Given the user is on the Login page
            And the user has a valid account
            When the user enters their email "user@example.com"
            And the user enters their password "password123"
            And the user clicks the "Sign In" button
            Then the user should be redirected to the "/workspace/demo/dashboard" page
            And a success toast notification "Successfully logged in!" should be displayed.
        ```
11. **Error Handling:**
    *   Describe how errors are handled and displayed to the user (e.g., inline field errors, toast notifications, error pages).
    *   List common error scenarios and their expected outcomes.
12. **Security Considerations:**
    *   Note any specific security measures relevant to this module (e.g., input sanitization, XSS prevention, CSRF protection, role-based access control enforcement).
13. **Future Enhancements / To-Do (Optional):**
    *   A brief list of planned improvements or features not yet implemented.
14. **Notes / Open Questions (Optional):**
    *   Any other relevant information, assumptions made, or questions to be resolved.

**Interlinking:** All module documents should be interlinked. Use relative Markdown links to refer to other module pages (e.g., `[Workspace Dashboard](./workspace/_subdomain_/dashboard/index.md)`). The Table of Contents above serves as the primary entry point. 