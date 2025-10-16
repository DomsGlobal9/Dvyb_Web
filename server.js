// //to test locally

// // // server.js
// import express from "express";
// import bodyParser from "body-parser";
// import tryonHandler from "./api/tryon.js"; // your existing file

// const app = express();
// app.use(bodyParser.json());

// // mount your API route
// app.post("/api/tryon", (req, res) => tryonHandler(req, res));

// // simple health check
// app.get("/", (req, res) => res.send("Backend running 🚀"));

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// server.js - Local development server
import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Fashn API Configuration
const FASHN_API_URL = "https://api.fashn.ai/v1";
const AUTH_HEADER = "Bearer fa-kGtS5NyR8vMR-KUYaqFfjeoCM7xBu9BI6aunh";

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    status: "✅ Backend running",
    endpoints: ["/api/tryon"]
  });
});

// Try-on API endpoint
app.post("/api/tryon", async (req, res) => {
  try {
    const { modelImage, garmentImage, category } = req.body || {};

    // Validation
    if (!modelImage || !garmentImage) {
      return res.status(400).json({ 
        error: "Both modelImage and garmentImage URLs are required." 
      });
    }

    console.log("✅ Received request:");
    console.log("   Model Image:", modelImage.substring(0, 50) + "...");
    console.log("   Garment Image:", garmentImage.substring(0, 50) + "...");
    console.log("   Category:", category || "auto");

    // Use "auto" by default (valid: tops, bottoms, one-pieces, auto)
    const garmentCategory = category || "auto";

    console.log("🔄 Calling Fashn API with category:", garmentCategory);

    // Step 1: Call Fashn API /run endpoint
    const runResponse = await fetch(`${FASHN_API_URL}/run`, {
      method: 'POST',
      headers: {
        'Authorization': AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model_name: "tryon-v1.6",
        inputs: {
          model_image: modelImage,
          garment_image: garmentImage,
          category: garmentCategory,
        },
      })
    });

    if (!runResponse.ok) {
      const errorText = await runResponse.text();
      console.error("❌ Fashn API error:", errorText);
      return res.status(500).json({ 
        error: `Fashn API error: ${runResponse.status}`,
        details: errorText 
      });
    }

    const runData = await runResponse.json();
    const predictionId = runData.id;

    if (!predictionId) {
      return res.status(500).json({ 
        error: "No prediction ID received from Fashn API" 
      });
    }

    console.log(`✅ Prediction started with ID: ${predictionId}`);

    // Step 2: Poll the /status/:id endpoint
    const maxAttempts = 15;
    const pollInterval = 3000; // 3 seconds

    for (let i = 0; i < maxAttempts; i++) {
      console.log(`🔄 Polling attempt ${i + 1}/${maxAttempts}`);
      
      const statusResponse = await fetch(`${FASHN_API_URL}/status/${predictionId}`, {
        headers: {
          'Authorization': AUTH_HEADER,
        },
      });

      if (!statusResponse.ok) {
        console.error(`❌ Status check error: ${statusResponse.status}`);
        return res.status(500).json({ 
          error: `Status check error: ${statusResponse.status}` 
        });
      }

      const statusData = await statusResponse.json();
      console.log(`📊 Status: ${statusData.status}`);

      // Success case
      if (statusData.status === "completed") {
        console.log("✅ Try-on completed successfully!");
        return res.status(200).json({ 
          output: statusData.output,
          category: garmentCategory 
        });
      }

      // Failure case
      if (statusData.status === "failed") {
        console.error("❌ Try-on failed:", statusData.error);
        return res.status(500).json({ 
          error: statusData.error || "Try-on failed." 
        });
      }

      // Wait before next poll (except on last attempt)
      if (i < maxAttempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
      }
    }

    // Timeout case
    console.log("⏱️ Try-on timed out after", maxAttempts, "attempts");
    return res.status(504).json({ 
      error: "Try-on timed out. Please try again." 
    });

  } catch (err) {
    console.error("❌ Server error:", err);
    return res.status(500).json({ 
      error: err.message || "Something went wrong.",
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: "Route not found",
    availableRoutes: ["/", "/api/tryon"]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({ 
    error: "Internal server error",
    message: err.message 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/tryon\n`);
});