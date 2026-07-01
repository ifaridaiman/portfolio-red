export type TokenUsage = {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
};

export type ChatChunk =
  | { type: "text"; delta: string }
  | { type: "citation"; sourceId: string; title: string; url: string }
  | { type: "done"; usage: TokenUsage };

export type ChatRequest = {
  sessionId: string;
  message: string;
  metadata?: {
    userAgent?: string;
    locale?: string;
  };
};

export type ChatResponse = AsyncIterable<ChatChunk>;

export type AiProvider = "openai" | "anthropic";

export type AiConfig = {
  provider: AiProvider;
  model: string;
  maxTokens: number;
  embeddingModel: string;
};
