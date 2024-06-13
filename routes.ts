/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string}
 */
export const publicRoutes = [
    "/",
    "/pages/home",
    "/api/user",
    "/auth/new-verification",
];

/**
 * An array of routes that are used for authentification
 * These routes will redirect logged in users to /settings
 * @type {string}
 */

export const authRoutes = [
    "/sign-in",
    "/sign-up",
];

/**
 * The prefix for API authentification routes
 * Routes that start with prefix are used for API
 * authentification purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGINREDIRECT = "/pages/home";