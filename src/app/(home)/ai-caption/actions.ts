"use server";

import { SYSTEM_PROMPT } from "@/constants/ai-prompts";
import { azure } from "@/lib/ai";
import { generateText } from "ai";

export async function generateCaption(formData: FormData) {
	const postDescription = formData.get("postDescription") as string;

	const { response } = await generateText({
		model: azure("gpt-4o"),
		system: SYSTEM_PROMPT,
		messages: [{ role: "user", content: postDescription }],
	});

	const generatedCaption = (response.messages[0].content[0] as { text: string })
		.text;

	return generatedCaption;
}
