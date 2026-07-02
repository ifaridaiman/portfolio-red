"use server";

import { contactRepository } from "@repo/database";
import {
  contactSchema,
  type ContactActionResult,
} from "../schemas/contact-schema";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

export async function submitContact(
  _prevState: ContactActionResult | null,
  formData: FormData,
): Promise<ContactActionResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors,
    };
  }

  const { name, email, message } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  try {
    const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);
    const recentCount =
      await contactRepository.countRecentByEmail(normalizedEmail, since);

    if (recentCount >= RATE_LIMIT_MAX) {
      return {
        success: false,
        error:
          "Too many submissions. Please wait an hour before trying again.",
      };
    }

    await contactRepository.createSubmission({
      name,
      email: normalizedEmail,
      message,
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}
