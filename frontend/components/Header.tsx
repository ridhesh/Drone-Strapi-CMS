"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const navbar = [
  { text: "About", link: "/#about" },
  { text: "Capabilities", link: "/capabilities" },
  { text: "Blog", link: "/blog" },
  { text: "Contact", link: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const navItemVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.06 * i, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const btnVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
    hover: { scale: 1.03 },
    tap: { scale: 0.98 },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-lg border-b border-white/10"
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-black/20 to-white/2 border border-white/5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15 9H9L12 2Z" fill="#ff7b00" />
                <path d="M4 15L12 22L20 15" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <motion.span
              className="text-xl font-semibold select-none bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
            >
              vyomgarud
            </motion.span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/85">
          {navbar.map((item, i) => {
            if (item.text === "Blog") {
              return (
                <Link key={i} href={item.link}>
                  <motion.div
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                    className="relative flex items-center gap-2 px-2 py-1 hover:text-white transition-colors"
                  >
                    <span className="relative flex size-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex size-3 rounded-full bg-red-600"></span>
                    </span>
                    <span className="font-semibold">{item.text}</span>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-white text-black font-semibold">
                      new
                    </span>
                  </motion.div>
                </Link>
              );
            }

            return (
              <Link key={i} href={item.link}>
                <motion.p
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                  className="relative px-2 py-1 hover:text-white transition-colors font-medium"
                >
                  {item.text}
                </motion.p>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <motion.a
            href="/contact"
            initial="hidden"
            animate="visible"
            variants={btnVariants}
            whileHover="hover"
            whileTap="tap"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white font-medium shadow-sm hover:bg-orange-600 transition-colors"
          >
            Get in touch
          </motion.a>

          <button
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            className="inline-flex md:hidden items-center justify-center rounded-lg p-2 hover:bg-white/10 transition-colors"
          >
            <div className="flex flex-col gap-1">
              <motion.span
                initial={false}
                animate={open ? { rotate: -45, y: 1 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-white"
              />
              <motion.span
                initial={false}
                animate={open ? { rotate: 45, y: -1 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-white"
              />
            </div>
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, height: 0 }}
        animate={open ? { opacity: 1, scale: 1, height: "auto" } : { opacity: 0, scale: 0.98, height: 0 }}
        className="absolute left-4 right-4 top-16 rounded-2xl bg-black/90 backdrop-blur-lg border border-white/10 shadow-lg md:hidden overflow-hidden"
      >
        <div className="flex flex-col gap-1 py-3 px-4">
          {navbar.map((item) => (
            <Link
              key={item.text}
              href={item.link}
              className="px-3 py-2 rounded-md hover:bg-white/10 text-sm transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.text}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
            onClick={() => setOpen(false)}
          >
            Get in touch
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
}