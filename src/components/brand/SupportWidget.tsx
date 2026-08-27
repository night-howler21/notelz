"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NotelzMark from "./NotelzMark";
import { sendContactMessage } from "@/app/actions/contact";

const inputClasses =
  "w-full rounded-lg border border-mercury-ink/20 bg-white/80 px-3 py-2 text-sm text-ink outline-none transition focus:border-mercury-ink/50 focus:ring-2 focus:ring-mercury-ink/15";

export default function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const result = await sendContactMessage({ name, email, message });
      if (!result.ok) throw new Error(result.message);
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 left-0 w-[calc(100vw-2rem)] max-w-80 rounded-2xl border border-mercury-ink/10 bg-paper p-4 shadow-2xl sm:p-5"
          >
            <div className="mb-3 flex items-center gap-2">
              <NotelzMark className="h-6 w-6 text-mercury-ink" />
              <h3 className="font-serif text-lg text-mercury-ink">Need a hand?</h3>
            </div>

            {status === "sent" ? (
              <p className="py-4 text-sm text-ink-soft">
                Got it — we&apos;ll get back to you soon. Thanks for reaching out!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                <input
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClasses}
                />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                />
                <textarea
                  required
                  placeholder="How can we help?"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClasses} resize-none`}
                />
                {status === "error" && (
                  <p className="text-xs text-red-600">
                    Couldn&apos;t send that — mind trying again?
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-1 rounded-full bg-mercury-ink px-4 py-2 text-sm font-medium text-paper transition hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Contact support"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-mercury-ink text-paper shadow-lg shadow-mercury-ink/30"
      >
        <NotelzMark className="h-6 w-6" />
      </motion.button>
    </div>
  );
}
