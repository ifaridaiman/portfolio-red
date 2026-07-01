import { loadAiConfig } from "./config";
import type { ChatRequest, ChatResponse } from "./types";

/**
 * Single entry point for LLM calls. Provider integration lands in M3.
 */
export class AiGateway {
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const config = loadAiConfig();

    async function* stream(): ChatResponse {
      yield {
        type: "text",
        delta: `AI gateway scaffold is ready (${config.provider}/${config.model}). Session: ${request.sessionId}`,
      };
      yield {
        type: "done",
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0,
        },
      };
    }

    return stream();
  }
}

export const aiGateway = new AiGateway();
