import http, { Server } from "http";
import app from "./app";
import dotenv from "dotenv";
import { prisma } from "./config/db";

dotenv.config();

let server: Server | null = null;
let isShuttingDown = false;

/**
 * Connect to the database with error handling
 */
async function connectToDatabase(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("✅ Connected to the database.");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
}

/**
 * Start the HTTP server
 */
async function startServer(): Promise<void> {
  try {
    await connectToDatabase();
    
    const port = process.env.PORT || 3000;
    server = http.createServer(app);
    
    server.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });

    handleProcessEvents();
  } catch (error) {
    console.error("❌ Error during server startup:", error);
    process.exit(1);
  }
}

/**
 * Gracefully shutdown the server and close database connections.
 * @param {string} signal - The termination signal received.
 */
async function gracefulShutdown(signal: string): Promise<void> {
  if (isShuttingDown) {
    console.log("⚠️ Shutdown already in progress...");
    return;
  }
  
  isShuttingDown = true;
  console.warn(`🔄 Received ${signal}, shutting down gracefully...`);

  // Set a timeout to force shutdown if graceful shutdown takes too long
  const forceShutdownTimeout = setTimeout(() => {
    console.error("❌ Forced shutdown due to timeout");
    process.exit(1);
  }, 10000); // 10 seconds timeout

  if (server) {
    // Stop accepting new connections
    server.close(async (error) => {
      if (error) {
        console.error("❌ Error closing HTTP server:", error);
      } else {
        console.log("✅ HTTP server closed.");
      }

      try {
        // Disconnect from database
        await prisma.$disconnect();
        console.log("✅ Database disconnected.");
        console.log("✅ Server shutdown complete.");
        
        clearTimeout(forceShutdownTimeout);
        process.exit(0);
      } catch (dbError) {
        console.error("❌ Error during database disconnection:", dbError);
        clearTimeout(forceShutdownTimeout);
        process.exit(1);
      }
    });
  } else {
    // If no server is running, just disconnect from database
    try {
      await prisma.$disconnect();
      console.log("✅ Database disconnected.");
      clearTimeout(forceShutdownTimeout);
      process.exit(0);
    } catch (error) {
      console.error("❌ Error disconnecting database:", error);
      clearTimeout(forceShutdownTimeout);
      process.exit(1);
    }
  }
}

/**
 * Handle system signals and unexpected errors.
 */
function handleProcessEvents(): void {
  // Handle termination signals
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  process.on("SIGQUIT", () => gracefulShutdown("SIGQUIT"));

  // Handle unexpected errors
  process.on("uncaughtException", (error) => {
    console.error("💥 Uncaught Exception:", error);
    gracefulShutdown("uncaughtException");
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("💥 Unhandled Rejection at:", promise, "reason:", reason);
    gracefulShutdown("unhandledRejection");
  });

  // Handle warnings
  process.on("warning", (warning) => {
    console.warn("⚠️ Warning:", warning.message);
  });
}

// Start the application
startServer().catch((error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});

// Export for testing purposes
export { server, gracefulShutdown };