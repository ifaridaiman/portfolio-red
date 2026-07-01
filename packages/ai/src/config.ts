import type { AiConfig } from "./types.js";

export function loadAiConfig(): AiConfig {
  const provider = process.env.AI_PROVIDER ?? "openai";

  if (provider !== "openai" && provider !== "anthropic") {
    throw new Error(`Unsupported AI provider: ${provider}`);
  }

  return {
    provider,
    model: process.env.AI_MODEL ?? "gpt-4o",
    maxTokens: Number(process.env.AI_MAX_TOKENS ?? "2048"),
    embeddingModel:
      process.env.EMBEDDING_MODEL ?? "text-embedding-3-small",
  };
}
