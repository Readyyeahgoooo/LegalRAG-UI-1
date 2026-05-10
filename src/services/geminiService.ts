import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateLegalAnswer(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a Legal GraphRAG system for Hong Kong law. 
Current legal context provided via graph retrieval: 
- Topic: Criminal Law
- Relevant sub-topics: Police Powers, Arrest, Human Rights
- Authorities: Police Powers Ordinance (Cap. 232), R v Leung Chi Keung [2016] HKCA 998, Interpretation and General Clauses Ordinance (Cap. 1).

Question: ${query}

Provide a "Grounded Answer" with:
1. Issue (A one sentence question summarizing the legal issue)
2. Answer Summary (A concise summary in professional legal tone)
3. Key Authorities (List 2-3 specific case or statute references)
4. Supporting Citations (List 3-5 specific numbered citations/paragraph references)

Format as a JSON object so I can parse it easily:
{
  "issue": "...",
  "summary": "...",
  "authorities": [{"name": "...", "description": "..."}],
  "citations": [{"id": 1, "text": "...", "ref": "..."}]
}
Return ONLY the JSON.`,
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}
