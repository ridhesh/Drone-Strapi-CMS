"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
      duration: 0.6,
    },
  },
};

const headingVariant: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const subtextVariant: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.08 } },
};

const btnVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, delay: 0.16 } },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export default function About() {
  return (
    <motion.div
      id="about"
      className="min-h-screen flex items-center justify-center bg-black text-white px-6 py-20"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="w-full max-w-5xl text-center">
        <motion.h1
          variants={headingVariant}
          className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight mb-6"
        >
          <span className="block text-white">Our systems are built for organizations</span>
          <span className="block text-white/80 mt-2">that demand the highest standards of performance,</span>
          <span className="block text-white/80">security, and operational excellence.</span>
        </motion.h1>

        <motion.p variants={subtextVariant} className="mt-8 text-white/60 max-w-3xl mx-auto text-lg md:text-xl">
          VyomGarud delivers cutting-edge autonomous UAV systems designed for the most demanding operational environments.
        </motion.p>

        <motion.div variants={btnVariants} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          <div className="flex flex-col items-center">
            <motion.button
              type="button"
              aria-label="Precision Engineering"
              whileHover="hover"
              whileTap="tap"
              variants={btnVariants}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold text-base shadow-lg ring-1 ring-white/10 transition-all duration-200 hover:shadow-xl"
            >
              <svg
                className="w-5 h-5 flex-shrink-0 transform transition-transform duration-200 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09c.7 0 1.27-.38 1.51-1a1.65 1.65 0 0 0-.33-1.82L4.31 4.1A2 2 0 1 1 7.14 1.27l.06.06c.45.45 1.14.6 1.72.38.5-.18 1.05-.27 1.6-.27h.14c.55 0 1.1.09 1.6.27.58.22 1.27.07 1.72-.38l.06-.06A2 2 0 1 1 19.69 4.1l-.06.06c-.45.45-.6 1.14-.38 1.72.18.5.27 1.05.27 1.6v.14c0 .55-.09 1.1-.27 1.6-.22.58-.07 1.27.38 1.72l.06.06z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="whitespace-nowrap">Precision Engineering</span>
            </motion.button>
            <p className="mt-3 text-sm text-white/60 max-w-xs text-center leading-relaxed">
              High-fidelity control systems, deterministic performance and rigorous verification.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <motion.button
              type="button"
              aria-label="Advanced Autonomy"
              whileHover="hover"
              whileTap="tap"
              variants={btnVariants}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-base shadow-lg ring-1 ring-white/10 transition-all duration-200 hover:shadow-xl"
            >
              <svg
                className="w-5 h-5 flex-shrink-0 transform transition-transform duration-200 group-hover:-translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M12 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 4l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12a9 9 0 1 1-9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="whitespace-nowrap">Advanced Autonomy</span>
            </motion.button>
            <p className="mt-3 text-sm text-white/60 max-w-xs text-center leading-relaxed">
              Robust machine intelligence, resilient perception stacks and secure mission autonomy.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}