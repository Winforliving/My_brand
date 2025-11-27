// Set VERCEL environment variable to indicate serverless environment
process.env.VERCEL = "1";

// Import the app after setting the environment variable
// This ensures the server doesn't try to start listening
import { app } from "../server/index";

// Export the Express app as a serverless function for Vercel
// Vercel will automatically handle the Express app
export default app;

