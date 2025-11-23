"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";

type Props = {
  onSearch?: (q: string) => void;
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      staggerChildren: 0.06, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    } 
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5 
    } 
  },
};

export default function BlogHero({ onSearch }: Props) {
  const [query, setQuery] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const debounceRef = React.useRef<number | null>(null);

  // Focus shortcut: Cmd/Ctrl + K focuses the search input
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMod = e.ctrlKey || e.metaKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        if (query) {
          handleClear();
        } else {
          inputRef.current?.blur();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [query]);

  // Debounced live-search
  const scheduleDebouncedSearch = React.useCallback(
    (q: string) => {
      if (!onSearch) return;
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
      if (!q.trim()) {
        setStatusMessage(null);
        onSearch("");
        return;
      }

      setStatusMessage("Searching…");
      debounceRef.current = window.setTimeout(() => {
        try {
          onSearch(q);
          setStatusMessage(`Showing results for "${q}"`);
        } catch {
          setStatusMessage("Search failed. Try again.");
        } finally {
          debounceRef.current = null;
        }
      }, 600);
    },
    [onSearch]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setQuery(v);
      scheduleDebouncedSearch(v.trim());
    },
    [scheduleDebouncedSearch]
  );

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const q = query.trim();
    if (!q) {
      inputRef.current?.focus();
      return;
    }

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    setSubmitting(true);
    setStatusMessage("Searching…");
    try {
      if (onSearch) onSearch(q);
      setStatusMessage(`Showing results for "${q}"`);
      await new Promise((r) => setTimeout(r, 300));
    } catch {
      setStatusMessage("Search failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const handleClear = React.useCallback(() => {
    setQuery("");
    setStatusMessage(null);
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    if (onSearch) {
      onSearch("");
    }
    inputRef.current?.focus();
  }, [onSearch]);

  return (
    <motion.section
      className="w-full bg-black text-white py-20 px-6 relative"
      initial="hidden"
      animate="show"
      variants={containerVariants}
      aria-labelledby="blog-hero-title"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          id="blog-hero-title"
          variants={item}
          className="font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-6"
        >
          Blog
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
        >
          Technical writeups, product updates, engineering notes, and operational stories — 
          all focused on UAV systems, autonomy and reliability.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          variants={item}
          className="mt-8 flex items-center justify-center"
          role="search"
          aria-label="Search blog posts"
        >
          <div className="w-full max-w-2xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/60">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
              </div>

              <input
                id="blog-search"
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search posts..."
                aria-label="Search blog posts"
                aria-describedby="search-status"
                className="w-full rounded-xl bg-white/5 border border-white/20 px-12 py-3 placeholder:text-white/50 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-200"
              />

              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear search"
                  className="absolute right-20 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white text-sm hover:bg-orange-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching
                  </>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </div>
        </motion.form>

        <motion.div variants={item} className="mt-6 text-sm text-white/50">
          Try: <span className="text-white/80">autonomy, sensors, flight-tests, case-studies</span>
        </motion.div>

        <div id="search-status" role="status" aria-live="polite" className="sr-only">
          {statusMessage ?? (submitting ? "Searching…" : "")}
        </div>
      </div>

      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>
    </motion.section>
  );
}