import { ai } from "@/lib/genkit";

export async function POST(req) {

  const { note } =
  await req.json();

  const response =
  await ai.generate({

    model: "googleai/gemini-2.0-flash",

    prompt: `
      Summarize this note:
      ${note}
    `
  });

  return Response.json({
    result: response.text
  });
}