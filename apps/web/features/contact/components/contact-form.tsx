import { ContactFormStatic } from "./contact-form-static";

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export function ContactForm() {
  if (isStaticExport) {
    return <ContactFormStatic />;
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports -- keep server actions out of static export builds
  const { ContactFormServer } = require("./contact-form-server") as typeof import("./contact-form-server");

  return <ContactFormServer />;
}
