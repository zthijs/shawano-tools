import { createAzure } from "@ai-sdk/azure";

export const azure = createAzure({
	resourceName: "zthijs-dev",
	apiKey: process.env.AZURE_API_KEY,
});
