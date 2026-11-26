import { Groq } from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

type WordData = {
    word: string;
    part_of_speech: string;
    definition: string;
    example: string;
};

export async function getRandomWord(
    length = 5,
    maxAttempts = 3
): Promise<WordData> {

    for (let attempt = 0; attempt < maxAttempts; attempt++) {

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            temperature: 1.2,
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "user",
                    content: `Generate one valid, commonly recognized English word with exactly ${length} letters.

Return JSON in this format:
{
    "word": "",
    "part_of_speech": "",
    "definition": "",
    "example": ""
}`
                }
            ],
        });

        const content = completion.choices[0]?.message?.content;

        if (!content) continue;

        try {
            const result = JSON.parse(content) as WordData;

            if (
                typeof result.word === "string" &&
                result.word.trim().length === length &&
                /^[a-zA-Z]+$/.test(result.word.trim()) &&
                typeof result.definition === "string" &&
                typeof result.part_of_speech === "string" &&
                typeof result.example === "string"
            ) {
                return {
                    ...result,
                    word: result.word.trim().toLowerCase(),
                };
            }
        } catch {
            console.log("Invalid JSON received from Groq");
        }
    }

    throw new Error("Could not generate a valid word");
}