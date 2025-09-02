// Create this file at: src/api/tryon.js or api/tryon.js (depending on your project structure)

const FASHN_API_URL = "https://api.fashn.ai/v1";
const AUTH_HEADER = "Bearer fa-kGtS5NyR8vMR-KUYaqFfjeoCM7xBu9BI6aunh"; // Your API key

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { modelImage, garmentImage } = req.body;

  // Validation
  if (!modelImage || !garmentImage) {
    return res.status(400).json({ error: "Both modelImage and garmentImage URLs are required." });
  }

  try {
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
      throw new Error(`Fashn API error: ${runResponse.status}`);
    }

    const runData = await runResponse.json();
    const predictionId = runData.id;

    // Step 2: Poll the `/status/:id` endpoint
    const pollStatus = async () => {
      for (let i = 0; i < 10; i++) {
        const statusResponse = await fetch(`${FASHN_API_URL}/status/${predictionId}`, {
          headers: {
            'Authorization': AUTH_HEADER,
          },
        });

        if (!statusResponse.ok) {
          throw new Error(`Status check error: ${statusResponse.status}`);
        }

        const statusData = await statusResponse.json();

        if (statusData.status === "completed") {
          return res.status(200).json({ output: statusData.output });
        }

        if (statusData.status === "failed") {
          return res.status(500).json({ error: statusData.error || "Try-on failed." });
        }

        // Wait for 2 seconds before next poll
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      // Timeout case
      return res.status(504).json({ error: "Try-on timed out." });
    };

    await pollStatus();

  } catch (err) {
    console.error("TryOn error:", err.message);
    res.status(500).json({ error: err.message || "Something went wrong." });
  }
}