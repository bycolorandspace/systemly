// app/api/analyze-chart/route.ts
// import { getRandomPlaceholder } from "@/lib/trading/placeholder-user-input";
import buildAnalysisPrompt from "@/lib/trading/trading-analysis-prompt";
import { UserInputs } from "@/schema/trade-analysis-schema";
import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: NextRequest) => {
  //const userInput = getRandomPlaceholder();

  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const userInputString = formData.get("userInputs") as string;

    // Convert image to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imageBase64 = buffer.toString("base64");

    // Parse user inputs from form data
    let userInput: UserInputs;
    try {
      userInput = JSON.parse(userInputString) as UserInputs;
    } catch (error) {
      console.error("Error parsing user inputs:", error);
      return NextResponse.json({ error: "Invalid user iput" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: buildAnalysisPrompt(userInput),
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      max_tokens: 4000,
      temperature: 0.1,
    });
    console.log("OpenAI response:", response);
    const analysisContent = response.choices[0].message.content;

    // Try to parse JSON from response
    let parsedAnalysis;
    try {
      // Step 1: Remove markdown code block wrapper
      let cleanedContent = analysisContent?.trim() || "";

      // Remove ```json at the start and ``` at the end
      if (cleanedContent.startsWith("```json")) {
        cleanedContent = cleanedContent.replace(/^```json\s*/, "");
      }
      if (cleanedContent.endsWith("```")) {
        cleanedContent = cleanedContent.replace(/\s*```$/, "");
      }

      // Step 2: Trim any remaining whitespace
      cleanedContent = cleanedContent.trim();

      // Step 3: Validate it looks like JSON (starts with { and ends with })
      if (!cleanedContent.startsWith("{") || !cleanedContent.endsWith("}")) {
        throw new Error("Content does not appear to be valid JSON");
      }

      // Step 4: Parse the cleaned JSON
      parsedAnalysis = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.warn("Failed to parse JSON from OpenAI response", parseError);

      // Enhanced error logging for debugging
      console.log("First 200 chars:", analysisContent?.substring(0, 200));
      console.log("Last 200 chars:", analysisContent?.substring(-200));

      // Fallback: return raw response
      parsedAnalysis = {
        error: "Failed to parse JSON",
        rawResponse: analysisContent,
      };
    }

    console.log("Parsed Analysis: ", parsedAnalysis);
    return NextResponse.json({
      success: true,
      userInput: userInput,
      analysis: parsedAnalysis,
      rawResponse: analysisContent,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while processing the request.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
