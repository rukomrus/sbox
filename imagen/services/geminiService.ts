
import { GoogleGenAI, GenerateImagesResponse, GeneratedImage } from "@google/genai";

// IMPORTANT: The API key is sourced from the environment variable `process.env.API_KEY`.
// This application assumes `process.env.API_KEY` is set in the execution environment.
const API_KEY = process.env.API_KEY;

export async function generateImageWithImagen(prompt: string): Promise<string> {
  if (!API_KEY) {
    console.error("API Key not configured. Please ensure the API_KEY environment variable is set.");
    throw new Error("API Key not configured. Please set the API_KEY environment variable.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const response: GenerateImagesResponse = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002', // Using the specified Imagen model
      prompt: prompt,
      config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const firstImage: GeneratedImage = response.generatedImages[0];
      if (firstImage.image && firstImage.image.imageBytes) {
        return firstImage.image.imageBytes; // This is the base64 encoded image string
      }
    }
    // This case handles if the API call was successful but no image data was returned as expected.
    throw new Error("No image data received from API. The response might be empty or malformed.");
  } catch (error) {
    console.error("Error generating image with Gemini API:", error);
    if (error instanceof Error) {
      if (error.message.toLowerCase().includes("api key not valid") || error.message.toLowerCase().includes("permission denied")) {
        throw new Error("Invalid or unauthorized API Key. Please check your API_KEY environment variable and ensure it has the correct permissions.");
      }
      if (error.message.toLowerCase().includes("quota")) {
        throw new Error("API quota exceeded. Please check your Google AI Studio project quotas.");
      }
      // For generic errors, pass them along but perhaps with more context
      throw new Error(`Failed to generate image: ${error.message}`);
    }
    // Fallback for non-Error objects thrown
    throw new Error("An unknown error occurred while generating the image.");
  }
}
