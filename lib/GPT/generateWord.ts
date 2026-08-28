// import { Groq } from "groq-sdk";

// export async function getRandomWord(length = 5){
//     const groq = new Groq({
//         apiKey: process.env.GROQ_API_KEY,
//     });
    
//     const completion = await groq.chat.completions.create({
//         model: "openai/gpt-oss-120b",
//         temperature: 1.2,
//         response_format: {type: "json_object"},
//         messages: [
//             {
//                 role: "user",
//                 content: `Generate a random English word that is exactly of ${length} letters long
//                 return JSON: {
//                     "word" : "",
//                     "part_of_speech" : "",
//                     "definition" : "",
//                     "example" : "",
//                 }`
//             },
//         ],
//     });
//     const content = completion.choices[0].message.content;
//     if(!content){
//         throw new Error("No response from GROQ");
//     }

//     return JSON.parse(content);
// };




import words from "an-array-of-english-words";

// Keep track of used words across the session/game (adjust storage to your needs —
// in-memory Set works for a single server instance; use Redis/DB if you scale horizontally)
const usedWords = new Set<string>();

type WordData = {
    word: string;
    part_of_speech: string;
    definition: string;
    example: string;
};

function pickRandomWord(length: number): string {
    // Filter once per length if you want to cache this — words.length is ~275k,
    // so filtering every call is fine for occasional use but cache if called often
    const candidates = words.filter(
        (w: string) => w.length === length && !usedWords.has(w) && /^[a-z]+$/.test(w)
    );

    if (candidates.length === 0) {
        // Ran out of unused words at this length — reset and start reusing
        usedWords.clear();
        return pickRandomWord(length);
    }

    const word = candidates[Math.floor(Math.random() * candidates.length)];
    usedWords.add(word);
    return word;
}

async function lookupWord(word: string): Promise<WordData | null> {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    if (!res.ok) {
        return null; // word not found in dictionary — caller should retry with a new word
    }

    const data = await res.json();
    const entry = data[0];
    const meaning = entry.meanings?.[0];
    const definition = meaning?.definitions?.[0];

    if (!meaning || !definition) {
        return null;
    }

    return {
        word: entry.word,
        part_of_speech: meaning.partOfSpeech,
        definition: definition.definition,
        example: definition.example ?? "",
    };
}

export async function getRandomWord(length = 5, maxAttempts = 8): Promise<WordData> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const word = pickRandomWord(length);
        const info = await lookupWord(word);

        if (info) {
            return info;
        }
        // word had no dictionary entry — loop tries a different word
    }

    throw new Error(`Could not find a valid ${length}-letter word after ${maxAttempts} attempts`);
}