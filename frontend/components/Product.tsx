"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

type Feature = {
  title: string;
  subtitle?: string;
  desc: string;
  cta: string;
  filled?: boolean;
};

const FEATURES: Feature[] = [
  {
    title: "Autonomous Operations",
    subtitle: "network",
    desc: "Full autonomous flight with adaptive mission planning and real-time decision making.",
    cta: "Learn more",
  },
  {
    title: "Precision Targeting",
    subtitle: "VyomGarud for field ops",
    desc: "Advanced sensor fusion and stabilization for pinpoint accuracy in any condition.",
    cta: "See sensors",
    filled: true,
  },
  {
    title: "Secure Communications",
    subtitle: "encrypted",
    desc: "Military-grade encrypted data links and secure telemetry systems.",
    cta: "Learn more",
  },
  {
    title: "Extended Endurance",
    subtitle: "power systems",
    desc: "Optimized power management for extended mission durations and reliability.",
    cta: "See specs",
    filled: true,
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function ProductCards() {
  return (
    <section className="w-full bg-black py-16 px-6">
      <div className="flex justify-center items-center flex-col gap-3 md:mb-10">
        <p className="text-xl text-gray-300">It's connectivity made easy</p>
        <h1 className="text-3xl text-white text-center font-bold">
          Comprehensive systems engineered for operational excellence
        </h1>
      </div>
      <div className="max-w-7xl mx-auto mt-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title + i}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className={
                "relative overflow-hidden rounded-2xl border border-white/10 p-8 min-h-80 flex flex-col " +
                (f.filled ? "bg-gradient-to-b from-orange-500/10 to-orange-600/5" : "bg-gradient-to-b from-gray-900 to-gray-800")
              }
            >
              <div className="relative z-10 flex-1 flex flex-col">
                <div>
                  <h3 className="text-3xl leading-tight font-bold text-white">
                    <span className="block">{f.title}</span>
                    {f.subtitle && <span className="block mt-1 text-xl capitalize font-medium text-white/80">{f.subtitle}</span>}
                  </h3>
                  <p className="mt-6 text-white/70 max-w-xl leading-relaxed">{f.desc}</p>
                </div>

                <div className="mt-auto">
                  {f.filled ? (
                    <button
                      onClick={() => alert(`${f.title} — ${f.cta}`)}
                      className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-600 transition-colors"
                    >
                      {f.cta}
                    </button>
                  ) : (
                    <button
                      onClick={() => alert(`${f.title} — ${f.cta}`)}
                      className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-white/30 text-white font-medium backdrop-blur-sm hover:bg-white/10 transition-colors"
                    >
                      {f.cta}
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}