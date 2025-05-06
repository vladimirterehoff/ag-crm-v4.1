# Module: Auth Login (Alternative/Internal)

## 1. Overview
This module provides a simplified login interface, primarily for authentication within an existing auth-specific flow (e.g., after a registration or as part of a dedicated `/auth` path). It does not include workspace selection or third-party provider logins like Google Sign-In.
- **Primary Users:** Users in a specific authentication flow (e.g., internal, post-registration).
- **Parent Documentation:** See main [Project Wiki & Technical Documentation](../../README.md)

## 2. Features / User Stories
- As a user, I want to log in with my email and password after completing another auth action (e.g., registration).
- As a user, I want to see clear feedback during the login process.
- As a user, I want to navigate to a "Forgot Password" page.
- As a user, I want to navigate to a "Sign Up" or "Register" page if I landed here by mistake.

## 3. UI Components & Design
- **Page Title:** "Login"
- **Description:** "Enter your credentials to access your account"
- **Email Input Field:**
    - Label: "Email"
    - Placeholder: "you@example.com"
    - Type: `email`
    - Required.
- **Password Input Field:**
    - Label: "Password"
    - Type: `password`
    - Required.
- **Forgot Password Link:**
    - Text: "Forgot password?"
    - Action: Navigates to `/auth/forgot-password` (Document at `../forgot-password.md`)
- **Login Button:**
    - Text: "Login" (default state)
    - Text (Loading State): "Logging in..."
    - Action: Submits the login form.
    - Disabled during loading.
- **Sign Up Link:**
    - Text: "Don't have an account? Sign up"
    - Action: Navigates to `/auth/register` (Document at `../register.md`)
- **Layout:** Centered card using `@/components/ui/card`, `button`, `input`, `label`.

### User Flows
1.  **Email/Password Login:**
    *   User enters email and password.
    *   User clicks "Login".
    *   System validates credentials.
    *   On success: Redirects to a general dashboard (e.g., `/dashboard`). Shows success toast.
    *   On failure: Shows error toast.

## 4. Data Model
- **UserCredentials (Input):**
    - `email`: String (required, format: email)
    - `password`: String (required)
- **AuthenticationResponse (Expected from backend):**
    - `success`: Boolean
    - `token` (optional): String
    - `user`: Object
    - `message` (optional): String

## 5. API Endpoints (Client-Side Module Consumes)
- **POST `/api/auth/login` (Conceptual):**
    - Request Payload: `{ email: "user@example.com", password: "password123" }`
    - Success Response (200): `{ success: true, token: "...", user: {...} }`
    - Error Response (401/400): `{ success: false, message: "Invalid credentials" }`

## 6. Business Logic & Rules
- Email must be a valid email format.
- Password must meet complexity requirements (if defined).
- Successful login redirects to a predefined general dashboard, not a workspace-specific one.

## 7. Interactions & Dependencies
- **@/components/ui/**: Uses `Button`, `Card`, `Input`, `Label`.
- **next/navigation:** `useRouter` for redirection.
- **sonner:** `toast` for notifications.
- **Forgot Password Page (`/auth/forgot-password`):** Links to this page. (Document at `../forgot-password.md`)
- **Register Page (`/auth/register`):** Links to this page. (Document at `../register.md`)
- **General Dashboard (`/dashboard`):** Redirects here. (Document at `../../dashboard/index.md`)

## 8. Acceptance Criteria
```gherkin
Feature: Alternative User Login
  Scenario: Successful login with valid credentials
    Given the user is on the /auth/login page
    And the user has a valid account with "user@example.com"
    When the user enters "user@example.com" in the "Email" field
    And the user enters their correct password in the "Password" field
    And the user clicks the "Login" button
    Then the user should be redirected to the "/dashboard" page
    And a success toast notification "Successfully logged in!" should be displayed.
```

## 9. Error Handling
- Invalid email/password: "Failed to login. Please try again." (toast)
- Server error: Generic error message via toast.

## 10. Security Considerations
- Standard security practices as outlined in the [main Login module documentation](../../login.md#10-security-considerations).

## 11. Future Enhancements / To-Do
- Clarify if this flow is still needed or if it can be merged with the main login flow.

## 12. Notes / Open Questions
- This module uses simulated API calls in `src/app/auth/login/page.tsx`. 