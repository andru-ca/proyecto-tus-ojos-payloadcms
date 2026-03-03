## 2025-05-14 - Destructive Seeding Route
**Vulnerability:** The `/next/seed` POST route is destructive and can be triggered by any authenticated user. It clears all collections and globals and reseeds the database with demo data.
**Learning:** This template includes a convenience route for seeding during development, but it lacks sufficient guards for production environments or established databases.
**Prevention:** Add environment checks (e.g., `process.env.NODE_ENV !== 'production'`) and check if the database already contains data before proceeding with destructive actions.

## 2025-05-14 - Potential Open Redirect in Preview Route
**Vulnerability:** The `/next/preview` route redirects to a user-provided `path` parameter. While it checks that the path starts with `/`, it doesn't prevent protocol-relative URLs like `//malicious.com`, which browsers interpret as a full URL, leading to an open redirect.
**Learning:** Simple `startsWith('/')` checks are insufficient to prevent open redirects when protocol-relative URLs are possible.
**Prevention:** Use a more robust check to ensure the path is truly relative and does not start with `//`.
