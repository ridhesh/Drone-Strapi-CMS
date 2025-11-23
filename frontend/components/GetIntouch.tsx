"use client";
import React, { useState, useEffect } from "react"; // Added useEffect
import { motion, Variants } from "framer-motion";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  useCase: string;
  fleetSize: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  useCase: "",
  fleetSize: "",
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function GetInTouch() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [isClient, setIsClient] = useState(false); // Added client check

  // Set isClient to true after component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  function validate() {
    const next: Partial<FormState> = {};
    if (!form.firstName.trim()) next.firstName = "First name required";
    if (!form.lastName.trim()) next.lastName = "Last name required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Valid email required";
    if (!form.useCase.trim()) next.useCase = "Please tell us the use case";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      setSent(true);
      setForm(initialState);
      setErrors({});
    } catch {
      alert("Submit failed — try again");
    } finally {
      setSubmitting(false);
    }
  }

  // Don't render form until client-side to avoid hydration mismatch
  if (!isClient) {
    return (
      <section id="contact" className="w-full bg-gray-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Loading skeleton */}
          <div className="space-y-6">
            <div className="h-12 bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-800 rounded w-5/6"></div>
          </div>
          <div className="rounded-2xl bg-white text-black p-6 border border-gray-200 shadow-lg h-96"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="w-full bg-gray-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={container}
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold leading-tight">
            Learn how VyomGarud can help your mission
          </motion.h2>

          <motion.p variants={fadeUp} className="text-white/70 max-w-md leading-relaxed">
            Talk to our team about autonomy integration, mission planning, and secure deployments. 
            We design UAV systems for reliability and performance under real operational demands.
          </motion.p>

          <motion.ul variants={fadeUp} className="space-y-3 text-white/80">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange-500">✔</span>
              <span>Hardened airframes & redundant fail-safes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange-500">✔</span>
              <span>Deterministic autonomy & mission planning</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange-500">✔</span>
              <span>Encrypted communications & telemetry</span>
            </li>
          </motion.ul>
        </motion.div>

        <motion.div
          className="rounded-2xl bg-white text-black p-6 border border-gray-200 shadow-lg"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          suppressHydrationWarning // Added suppressHydrationWarning
        >
          {sent ? (
            <motion.div variants={fadeUp} className="text-center py-8">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-2xl">✓</div>
              <h3 className="mt-6 text-2xl font-semibold">Thanks — we'll be in touch</h3>
              <p className="mt-2 text-gray-600">Someone from our team will contact you shortly.</p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 px-5 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate suppressHydrationWarning>
              <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block">
                  <input
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="First name*"
                    aria-invalid={!!errors.firstName}
                    className={`w-full px-3 py-2 rounded-lg border ${errors.firstName ? "border-red-400" : "border-gray-300"} bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50`}
                    suppressHydrationWarning
                  />
                  {errors.firstName && <div className="mt-1 text-xs text-red-500">{errors.firstName}</div>}
                </label>

                <label className="block">
                  <input
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Last name*"
                    aria-invalid={!!errors.lastName}
                    className={`w-full px-3 py-2 rounded-lg border ${errors.lastName ? "border-red-400" : "border-gray-300"} bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50`}
                    suppressHydrationWarning
                  />
                  {errors.lastName && <div className="mt-1 text-xs text-red-500">{errors.lastName}</div>}
                </label>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-3">
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Work email*"
                  aria-invalid={!!errors.email}
                  className={`w-full px-3 py-2 rounded-lg border ${errors.email ? "border-red-400" : "border-gray-300"} bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50`}
                  suppressHydrationWarning
                />
                {errors.email && <div className="mt-1 text-xs text-red-500">{errors.email}</div>}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Work phone"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  suppressHydrationWarning
                />
                <input
                  value={form.fleetSize}
                  onChange={(e) => setForm({ ...form, fleetSize: e.target.value })}
                  placeholder="Planned fleet (12 months)"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  suppressHydrationWarning
                />
              </motion.div>

              <motion.div variants={fadeUp} className="mt-3">
                <textarea
                  value={form.useCase}
                  onChange={(e) => setForm({ ...form, useCase: e.target.value })}
                  placeholder="What's the use case?*"
                  aria-invalid={!!errors.useCase}
                  className={`w-full px-3 py-2 rounded-lg border ${errors.useCase ? "border-red-400" : "border-gray-300"} bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50`}
                  rows={4}
                  suppressHydrationWarning
                />
                {errors.useCase && <div className="mt-1 text-xs text-red-500">{errors.useCase}</div>}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-4 text-sm text-gray-600" suppressHydrationWarning>
                By submitting this form you consent to VyomGarud contacting you about this enquiry.
              </motion.div>

              <motion.div variants={fadeUp} className="mt-6 flex items-center justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={submitting}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold ${
                    submitting ? "bg-gray-400 text-gray-200 cursor-wait" : "bg-orange-500 text-white hover:bg-orange-600"
                  } transition-colors`}
                >
                  {submitting ? "Sending..." : "Get in touch"}
                </motion.button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}