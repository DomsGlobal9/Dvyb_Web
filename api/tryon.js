// api/tryon.js (at root level, NOT in src/)

const FASHN_API_URL = "https://api.fashn.ai/v1";
const AUTH_HEADER = "Bearer fa-kGtS5NyR8vMR-KUYaqFfjeoCM7xBu9BI6aunh";

export default async function handler(req, res) {
  // Set proper headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { modelImage, garmentImage } = req.body || {};

    // Validation
    if (!modelImage || !garmentImage) {
      return res.status(400).json({ error: "Both modelImage and garmentImage URLs are required." });
    }

    console.log("Received modelImage:", modelImage);
    console.log("Received garmentImage:", garmentImage);

    // Step 1: Call the Fashn API `/run` endpoint
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
        },
      })
    });

    if (!runResponse.ok) {
      const errorText = await runResponse.text();
      console.error("Fashn API error:", errorText);
      return res.status(500).json({ error: `Fashn API error: ${runResponse.status}` });
    }

    const runData = await runResponse.json();
    const predictionId = runData.id;

    if (!predictionId) {
      return res.status(500).json({ error: "No prediction ID received from Fashn API" });
    }

    // Step 2: Poll the `/status/:id` endpoint
    for (let i = 0; i < 10; i++) {
      console.log(`Polling attempt ${i + 1} for prediction ${predictionId}`);
      
      const statusResponse = await fetch(`${FASHN_API_URL}/status/${predictionId}`, {
        headers: {
          'Authorization': AUTH_HEADER,
        },
      });

      if (!statusResponse.ok) {
        console.error(`Status check error: ${statusResponse.status}`);
        return res.status(500).json({ error: `Status check error: ${statusResponse.status}` });
      }

      const statusData = await statusResponse.json();
      console.log(`Status: ${statusData.status}`);

      if (statusData.status === "completed") {
        console.log("Try-on completed successfully");
        return res.status(200).json({ output: statusData.output });
      }

      if (statusData.status === "failed") {
        console.error("Try-on failed:", statusData.error);
        return res.status(500).json({ error: statusData.error || "Try-on failed." });
      }

      // Wait for 2 seconds before next poll
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Timeout case
    console.log("Try-on timed out after 10 attempts");
    return res.status(504).json({ error: "Try-on timed out." });

  } catch (err) {
    console.error("TryOn error:", err);
    return res.status(500).json({ error: err.message || "Something went wrong." });
  }
}