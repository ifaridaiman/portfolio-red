import type { MessageRole } from "@prisma/client";
import { prisma } from "../client";

export class ChatRepository {
  constructor(private readonly db = prisma) {}

  findOrCreateSession(publicSessionId: string) {
    return this.db.chatSession.upsert({
      where: { sessionId: publicSessionId },
      create: { sessionId: publicSessionId },
      update: {},
    });
  }

  async createMessage(input: {
    publicSessionId: string;
    role: MessageRole;
    content: string;
    chunkIds?: string[];
  }) {
    const session = await this.findOrCreateSession(input.publicSessionId);

    return this.db.chatMessage.create({
      data: {
        sessionId: session.id,
        role: input.role,
        content: input.content,
        chunkIds: input.chunkIds ?? [],
      },
    });
  }

  async listMessages(publicSessionId: string) {
    const session = await this.db.chatSession.findUnique({
      where: { sessionId: publicSessionId },
    });

    if (!session) {
      return [];
    }

    return this.db.chatMessage.findMany({
      where: { sessionId: session.id },
      orderBy: { createdAt: "asc" },
    });
  }
}

export const chatRepository = new ChatRepository();
