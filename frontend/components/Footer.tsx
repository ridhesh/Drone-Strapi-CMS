"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const footerLinks = {
    company: [
      { name: "About", href: "/about" },
      { name: "Mission", href: "/mission" },
      { name: "Careers", href: "/careers" }
    ],
    products: [
      { name: "UAV Systems", href: "/products" },
      { name: "Autonomy", href: "/capabilities" },
      { name: "Sensors", href: "/sensors" }
    ],
    support: [
      { name: "Documentation", href: "/docs" },
      { name: "Contact", href: "/contact" },
      { name: "Help Center", href: "/support" }
    ]
  };

  return (
    <footer
      ref={ref}
      className="w-full bg-gray-900 text-white border-t border-white/10"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-6 py-12"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-16">
          {/* Brand Section */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              VyomGarud
            </h2>
            <p className="text-white/60 mt-2 max-w-sm text-sm leading-relaxed">
              Advanced UAV systems engineered for the most demanding missions and operational excellence.
            </p>
          </div>

          {/* Links Sections */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section} className="flex flex-col gap-3 text-center lg:text-left">
                <h4 className="font-semibold text-white/90 text-sm uppercase tracking-wider">
                  {section}
                </h4>
                {links.map((link) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} VyomGarud Technologies. All rights reserved.
          </p>
          <p className="text-white/40 text-xs mt-1">
            Built for those who demand excellence.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}