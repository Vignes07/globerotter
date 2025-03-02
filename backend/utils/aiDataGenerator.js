require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateDataWithRetry(city, retries = 5, initialDelay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Generate the country 3 travel clues, 2 fun facts, and 2 trivia questions about ${city}. 
      Return ONLY a valid JSON object with this exact structure:
      {
        "city": "${city}",
        "country": "country",
        "clues": ["clue1", "clue2", "clue3"],
        "fun_facts": ["fact1", "fact2"],
        "trivia": ["question1", "question2"]
      }
      Do not include any markdown formatting or backticks in the response.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      // Clean the response
      text = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      return JSON.parse(text);
    } catch (error) {
      if (error.status === 429) {
        // Rate limit hit: Use Exponential Backoff with Jitter
        const delay = initialDelay * (Math.pow(2, i) + Math.random() * 1000);
        console.log(
          `Rate limit hit for ${city}, retrying in ${Math.round(
            delay / 1000
          )}s...`
        );
        await sleep(delay);
        continue;
      }
      console.error(`Error generating data for ${city}:`, error);
      return null;
    }
  }
  return null;
}

module.exports = generateDataWithRetry;
