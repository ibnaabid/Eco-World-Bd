"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

const colors = {
  forest: "#1F3D2B",
  forestDeep: "#16301F",
  moss: "#6B8F5C",
  bambooTan: "#C9A876",
  cream: "#F6F2E9",
  ochre: "#B8863B",
  ink: "#2A2A22",
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with your actual API call
    // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 px-5 md:px-8 text-center" style={{ backgroundColor: colors.forest }}>
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-[12px] font-semibold tracking-[0.2em] uppercase mb-4"
          style={{ color: colors.bambooTan }}
        >
          Get In Touch
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl"
          style={{ color: colors.cream }}
        >
          Let&apos;s talk bamboo.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-4 max-w-md mx-auto text-[14.5px]"
          style={{ color: "rgba(246,242,233,0.7)" }}
        >
          Questions about an order, a custom piece, or a partnership — we read every message.
        </motion.p>
      </section>

      {/* Contact grid */}
      <section className="py-20 px-5 md:px-8" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8">
          {/* Info cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="md:col-span-2 flex flex-col gap-4"
          >
            {[
              { icon: <MapPin size={18} />, title: "Visit Us", detail: "Fulbari, Dinajpur, Bangladesh" },
              { icon: <Phone size={18} />, title: "Call Us", detail: "+880 1823-633271" },
              { icon: <Mail size={18} />, title: "Email Us", detail: "mdmosabbirrahman07@gmail.com" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ x: 6 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-black/5"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(31,61,43,0.08)", color: colors.forest }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold mb-1" style={{ color: colors.ink }}>
                    {item.title}
                  </h3>
                  <p className="text-[13px]" style={{ color: "rgba(42,42,34,0.6)" }}>
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 p-7 md:p-9 rounded-3xl bg-white border border-black/5"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                  >
                    <CheckCircle2 size={48} color={colors.moss} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-serif text-2xl mt-5 mb-2" style={{ color: colors.ink }}>
                    Message sent!
                  </h3>
                  <p className="text-[13.5px]" style={{ color: "rgba(42,42,34,0.6)" }}>
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={resetForm}
                    className="mt-6 text-[13px] font-semibold hover:underline"
                    style={{ color: colors.forest }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >
                  {/* Name */}
                  <div>
                    <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: colors.ink }}>
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="User"
                      className="w-full px-4 py-3 rounded-xl text-[14px] outline-none border transition-all"
                      style={{
                        borderColor: focusedField === "name" ? colors.forest : "rgba(0,0,0,0.1)",
                        boxShadow: focusedField === "name" ? "0 0 0 3px rgba(31,61,43,0.1)" : "none",
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: colors.ink }}>
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl text-[14px] outline-none border transition-all"
                      style={{
                        borderColor: focusedField === "email" ? colors.forest : "rgba(0,0,0,0.1)",
                        boxShadow: focusedField === "email" ? "0 0 0 3px rgba(31,61,43,0.1)" : "none",
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: colors.ink }}>
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell us what you need..."
                      className="w-full px-4 py-3 rounded-xl text-[14px] outline-none border resize-none transition-all"
                      style={{
                        borderColor: focusedField === "message" ? colors.forest : "rgba(0,0,0,0.1)",
                        boxShadow: focusedField === "message" ? "0 0 0 3px rgba(31,61,43,0.1)" : "none",
                      }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 py-3.5 rounded-full text-[14px] font-semibold mt-2"
                    style={{ backgroundColor: colors.ochre, color: colors.cream }}
                  >
                    Send Message
                    <Send size={15} strokeWidth={2} />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}