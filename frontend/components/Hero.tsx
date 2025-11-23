"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const headline = "Military grade UAV systems";
  const chars = useMemo(
    () => Array.from(headline).map((c) => (c === " " ? "\u00A0" : c)),
    [headline]
  );

  const charDelay = 0.03;

  const scrollToContent = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative md:h-screen h-[85vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center justify-center md:justify-start">
        <div className="text-white flex justify-center items-center flex-col text-center">
          <h1
            className="hidden md:block text-7xl lg:text-8xl xl:text-9xl font-bold leading-[1.1] tracking-tight"
            aria-label={headline}
          >
            <span aria-hidden style={{ display: "inline-block" }}>
              {chars.map((ch, i) => (
                <motion.span
                  key={`c-${i}-${ch}`}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                  initial={{ y: 40, opacity: 0, rotate: 8 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{
                    delay: i * charDelay,
                    duration: 0.6,
                    type: "spring",
                    damping: 15,
                    stiffness: 150,
                    mass: 0.5,
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:hidden text-5xl font-bold leading-tight tracking-tight"
          >
            Military grade UAV systems
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed"
          >
            Advanced autonomous systems engineered for precision, reliability, and mission-critical performance
          </motion.p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <motion.button
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(255, 123, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Request a demo
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent border-2 border-white/80 text-white font-semibold backdrop-blur-sm hover:border-white transition-all"
            >
              Our Mission
            </motion.button>
          </div>

          <motion.button
            onClick={scrollToContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-16 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-sm uppercase tracking-wider">Explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronDown size={24} />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}