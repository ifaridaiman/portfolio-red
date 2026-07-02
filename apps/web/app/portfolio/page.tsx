import type { Metadata } from "next";
import { PortfolioPage } from "@/features/portfolio";

export const metadata: Metadata = {
  title: "Portfolio — Farid",
  description:
    "Professional portfolio of Farid Aiman — companies, services, experience, and skills.",
};

export default function Page() {
  return <PortfolioPage />;
}
