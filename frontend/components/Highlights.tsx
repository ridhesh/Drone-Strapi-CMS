"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

type Stat = {
  metric: string;
  title: string;
  desc: string;
  cta?: string;
  icon?: React.ReactNode;
};

const STATS: Stat[] = [
  {
    metric: "99.9%",
    title: "System Reliability",
    desc: "Military-grade uptime guarantee with redundant failsafe systems",
    cta: "Read report",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="7.5" cy="12" r="1.2" fill="currentColor" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
        <circle cx="16.5" cy="12" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    metric: "12+",
    title: "Hour Flight Duration",
    desc: "Extended mission capabilities with optimized power management",
    cta: "Read case study",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2v6l4-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    metric: "50 km",
    title: "Operational Range",
    desc: "Long-range communication with encrypted secure protocols",
    cta: "Learn more",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 12h3l3 6 4-12 4 8 3-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.995 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Highlights() {
  return (
    <section className="w-full bg-gray-900 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Why Choose VyomGarud</h2>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">Key performance metrics that set us apart</p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {STATS.map((s, i) => (
            <motion.article
              key={s.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="relative rounded-2xl p-8 min-h-60 flex flex-col bg-gray-800/50 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-start gap-4">
                <div className="flex-none w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center shadow-xl text-orange-400">
                  {s.icon}
                </div>

                <div className="flex-1">
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight">
                    {s.metric} <span className="text-white/80">{s.title}</span>
                  </h3>
                  <p className="mt-2 text-white/70 leading-relaxed">{s.desc}</p>
                </div>
              </div>

              <div className="mt-auto pt-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 text-white/90 text-sm font-medium backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors"
                  onClick={() => {
                    window.alert(`${s.title} — ${s.cta ?? "Learn more"}`);
                  }}
                >
                  {s.cta}
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}