import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getMatchScore = async (req, res) => {
    try {
        console.log("=== AI DEBUG START ===");

        // ✅ Read data safely
        const { resumeSkills, jobDescription } = req.body;

        console.log("API KEY:", process.env.GEMINI_API_KEY);
        console.log("Skills:", resumeSkills);
        console.log("Job Desc:", jobDescription);

        // ❌ Validate input
        if (!resumeSkills || !jobDescription) {
            return res.status(400).json({
                message: "Missing skills or job description",
                success: false
            });
        }

        // ✅ Use correct model
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-latest"
        });

        const prompt = `
Compare the following User Skills with the Job Requirements.

User Skills: ${resumeSkills}
Job Requirements: ${jobDescription}

Return ONLY valid JSON:
{
  "score": number (0-100),
  "feedback": string,
  "missingSkills": string[]
}
`;

        // ✅ Call Gemini
        const result = await model.generateContent(prompt);
        console.log("RAW RESULT:", result);

        const response = await result.response;
        const text = response.text();

        console.log("AI TEXT:", text);

        // ✅ Extract JSON safely
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("Invalid AI response format");
        }

        const parsedData = JSON.parse(jsonMatch[0]);

        return res.status(200).json({
            data: parsedData,
            success: true
        });

    } catch (error) {
        console.error("AI Matching Error:", error);

        return res.status(500).json({
            message: "AI Analysis failed.",
            error: error.message,
            success: false
        });
    }
};