// Set VERCEL environment variable to indicate serverless environment
process.env.VERCEL = "1";

// Dynamically import the bundled server (dist/index.cjs) so it works on Vercel
// The build step creates dist/index.cjs from server/index.ts
const { app } = await import("../dist/index.cjs");

// Export the Express app as a serverless function for Vercel
export default app;

