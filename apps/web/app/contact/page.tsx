import type { Metadata } from "next";
import { ContactPage } from "@/features/contact";

export const metadata: Metadata = {
  title: "Contact — Farid",
  description:
    "Get in touch with Farid for project inquiries, collaboration, or engineering discussions.",
};

export default function Page() {
  return <ContactPage />;
}
