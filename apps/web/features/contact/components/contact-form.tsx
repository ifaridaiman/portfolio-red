"use client";

import { useActionState } from "react";
import { submitContact } from "../actions/submit-contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, null);

  if (state?.success) {
    return (
      <div
        className="rounded-2xl border border-border/60 bg-card/40 p-6 text-center"
        role="status"
      >
        <p className="font-medium text-foreground">Message sent!</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state?.error && !state.fieldErrors && (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={!!state?.fieldErrors?.name}
          aria-describedby={state?.fieldErrors?.name ? "name-error" : undefined}
        />
        {state?.fieldErrors?.name && (
          <p id="name-error" className="text-xs text-destructive" role="alert">
            {state.fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={!!state?.fieldErrors?.email}
          aria-describedby={
            state?.fieldErrors?.email ? "email-error" : undefined
          }
        />
        {state?.fieldErrors?.email && (
          <p id="email-error" className="text-xs text-destructive" role="alert">
            {state.fieldErrors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          aria-invalid={!!state?.fieldErrors?.message}
          aria-describedby={
            state?.fieldErrors?.message ? "message-error" : undefined
          }
        />
        {state?.fieldErrors?.message && (
          <p
            id="message-error"
            className="text-xs text-destructive"
            role="alert"
          >
            {state.fieldErrors.message[0]}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
