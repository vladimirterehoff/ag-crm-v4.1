# Module: Login (Main Flow)

## 1. Overview
This module handles the primary user authentication flow, allowing users to sign into their specific workspace or their default workspace. It provides options for email/password login and Google Sign-In.
- **Primary Users:** End-users attempting to access their workspace.

## 2. Features / User Stories
- As a user, I want to sign in with my email and password to access my workspace.
- As a user, I want to sign in using my Google account for quick access.
- As a user, if I belong to multiple workspaces or want to access a specific one directly, I want to be able to specify a workspace subdomain during login.
- As a user, if I don't specify a workspace subdomain, I want to be redirected to my default workspace upon successful login.
- As a user, I want to see clear feedback (loading states, success/error messages) during the login process.
- As a user, I want to be able to navigate to the "Forgot Password" page if I've forgotten my password.
- As a user, I want to be able to navigate to the "Sign Up" page if I don't have an account.

## 3. UI Components & Design
- **Page Title:** "Sign In"
- **Description:** "Sign in to your workspace to continue"
- **Google Sign-In Button:**
    - Icon: Google logo
    - Text: "Sign in with Google"
    - Action: Initiates Google OAuth flow.
- **Separator:** "Or continue with" text with horizontal lines.
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
    - Action: Navigates to the forgot password page (e.g., `/forgot-password`).
- **Workspace Subdomain Input Field (Optional):**
    - Label: "Workspace Subdomain (optional)"
    - Placeholder: "yourcompany"
    - Suffix Display: ".site.com" (visual cue, not part of input)
    - Helper text: "Leave blank to be redirected to your default workspace."
- **Sign In Button:**
    - Text: "Sign In" (default state)
    - Text (Loading State): "Signing in..."
    - Action: Submits the login form.
    - Disabled during loading.
- **Sign Up Link:**
    - Text: "Don't have an account? Sign up"
    - Action: Navigates to the signup page (e.g., `/signup`).
- **Layout:** Centered card on the page. Uses `@/components/ui/card`, `button`, `input`, `label`.

### User Flows
1.  **Email/Password Login (Default Workspace):**
    *   User enters email and password.
    *   User leaves "Workspace Subdomain" blank.
    *   User clicks "Sign In".
    *   System validates credentials.
    *   On success: Redirects to default workspace dashboard (e.g., `/workspace/default-subdomain/dashboard`). Shows success toast.
    *   On failure: Shows error toast.
2.  **Email/Password Login (Specific Workspace):**
    *   User enters email and password.
    *   User enters "mysubdomain" in "Workspace Subdomain".
    *   User clicks "Sign In".
    *   System validates credentials.
    *   On success: Redirects to `/workspace/mysubdomain/dashboard`. Shows success toast.
    *   On failure: Shows error toast.
3.  **Google Sign-In:**
    *   User clicks "Sign in with Google".
    *   Google OAuth flow is initiated.
    *   On successful Google authentication: System retrieves user info and determines their workspace.
    *   Redirects to the determined workspace dashboard (e.g., `/workspace/google-user-subdomain/dashboard`). Shows success toast.
    *   On failure: Shows error toast.

## 4. Data Model
- **UserCredentials (Input):**
    - `email`: String (required, format: email)
    - `password`: String (required)
    - `workspacePrefix` (optional): String
- **AuthenticationResponse (Expected from backend):**
    - `success`: Boolean
    - `token` (optional): String (JWT or session token)
    - `user`: Object (user details)
    - `workspaceSubdomain`: String (subdomain to redirect to)
    - `message` (optional): String (for errors)

## 5. API Endpoints (Client-Side Module Consumes)
- **POST `/api/auth/login` (Conceptual for email/password):**
    - Request Payload: `{ email: "user@example.com", password: "password123", workspacePrefix: "yourcompany" }`
    - Success Response (200): `{ success: true, token: "...", user: {...}, workspaceSubdomain: "yourcompany" }`
    - Error Response (401/400): `{ success: false, message: "Invalid credentials" }`
- **GET `/api/auth/google` (Conceptual for initiating Google Sign-In):**
    - Redirects to Google OAuth.
- **GET `/api/auth/google/callback` (Conceptual for Google callback):**
    - Handles callback from Google, exchanges code for token.
    - Success Response: `{ success: true, token: "...", user: {...}, workspaceSubdomain: "user-default-workspace" }`

## 6. Business Logic & Rules
- Email must be a valid email format.
- Password must meet complexity requirements (if defined).
- If `workspacePrefix` is provided, attempt to log into that specific workspace.
- If `workspacePrefix` is blank, attempt to log into the user's default or last-used workspace.
- Successful Google Sign-In should correctly identify and redirect to the user's associated workspace.

## 7. Interactions & Dependencies
- **@/components/ui/**: Uses `Button`, `Card`, `Input`, `Label`.
- **next/navigation:** Uses `useRouter` for redirection.
- **sonner:** Uses `toast` for notifications.
- **Signup Page (`/signup`):** Links to this page. (Document at `../signup.md`)
- **Forgot Password Page (`/forgot-password`):** Links to this page. (Document at `../auth/forgot-password.md`)
- **Workspace Dashboard (`/workspace/[subdomain]/dashboard`):** Redirects here on successful login. (Document at `../workspace/_subdomain_/dashboard/index.md`)

## 8. Acceptance Criteria
```gherkin
Feature: User Login via Email/Password
  Scenario: Successful login with valid credentials to default workspace
    Given the user is on the Login page
    And the user has a valid account with "user@example.com"
    When the user enters "user@example.com" in the "Email" field
    And the user enters their correct password in the "Password" field
    And the user leaves the "Workspace Subdomain" field blank
    And the user clicks the "Sign In" button
    Then the user should be redirected to their default workspace dashboard (e.g., "/workspace/demo/dashboard")
    And a success toast notification "Successfully logged in!" should be displayed.

  Scenario: Successful login with valid credentials to a specific workspace
    Given the user is on the Login page
    And the user has a valid account with "user@example.com" and access to "acme" workspace
    When the user enters "user@example.com" in the "Email" field
    And the user enters their correct password in the "Password" field
    And the user enters "acme" in the "Workspace Subdomain" field
    And the user clicks the "Sign In" button
    Then the user should be redirected to the "/workspace/acme/dashboard" page
    And a success toast notification "Successfully logged in!" should be displayed.

  Scenario: Failed login with invalid credentials
    Given the user is on the Login page
    When the user enters "invalid@example.com" in the "Email" field
    And the user enters "wrongpassword" in the "Password" field
    And the user clicks the "Sign In" button
    Then the user should remain on the Login page
    And an error toast notification "Failed to login. Please try again." should be displayed.

Feature: Google Sign-In
  Scenario: Successful sign-in with Google
    Given the user is on the Login page
    When the user clicks the "Sign in with Google" button
    And completes the Google authentication successfully
    Then the user should be redirected to their Google-associated workspace dashboard (e.g., "/workspace/demo/dashboard")
    And a success toast notification "Successfully signed in with Google!" should be displayed.
```

## 9. Error Handling
- Invalid email/password: "Failed to login. Please try again." (toast)
- Workspace not found (if subdomain specified): "Workspace not found." (toast, conceptual)
- Google Sign-In failure: "Failed to sign in with Google. Please try again." (toast, conceptual)
- Server error: Generic error message via toast.

## 10. Security Considerations
- Passwords must be hashed securely on the backend.
- Input sanitization for all fields.
- CSRF protection mechanisms should be in place for form submissions.
- Secure handling of authentication tokens (e.g., JWTs stored in HttpOnly cookies).
- Rate limiting on login attempts to prevent brute-force attacks.

## 11. Future Enhancements / To-Do
- Implement "Remember me" functionality.
- Add multi-factor authentication (MFA).
- More granular error messages from the backend.

## 12. Notes / Open Questions
- The exact redirection logic for "default workspace" needs to be defined by the backend.
- `.site.com` suffix for workspace subdomain is hardcoded in UI; consider making this configurable if needed.
- The current implementation in `src/app/login/page.tsx` has simulated API calls. These need to be replaced with actual API integrations. 