import { prisma } from "../client";

export class ContactRepository {
  constructor(private readonly db = prisma) {}

  createSubmission(data: { name: string; email: string; message: string }) {
    return this.db.contactSubmission.create({ data });
  }

  countRecentByEmail(email: string, since: Date) {
    return this.db.contactSubmission.count({
      where: {
        email: email.toLowerCase(),
        createdAt: { gte: since },
      },
    });
  }
}

export const contactRepository = new ContactRepository();
