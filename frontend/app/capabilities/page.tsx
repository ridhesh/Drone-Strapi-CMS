'use client';
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type Capability = {
    title: string;
    desc: string;
    color: string;
    tags: string[];
    icon: React.ReactNode;
};

export default function CapabilitiesPage() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'relevance' | 'alpha'>('relevance');
    const [selected, setSelected] = useState<Capability | null>(null);

    const items = useMemo<Capability[]>(
        () => [
            {
                title: 'Autonomous Flight Systems',
                desc: 'Advanced AI-powered navigation and mission planning for complex operational environments.',
                color: 'from-purple-700 to-indigo-600',
                tags: ['autonomy'],
                icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v6m0 8v6M5 7l7 7 7-7" />
                    </svg>
                ),
            },
            {
                title: 'Precision Targeting',
                desc: 'High-accuracy positioning and real-time data fusion for precision tasks.',
                color: 'from-rose-600 to-pink-500',
                tags: ['targeting'],
                icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                ),
            },
            {
                title: 'Secure Communications',
                desc: 'Encrypted links and telemetry systems for reliable, mission-critical data exchange.',
                color: 'from-sky-600 to-cyan-500',
                tags: ['communications'],
                icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 11v6a6 6 0 006 6 6 6 0 006-6v-6" />
                    </svg>
                ),
            },
            {
                title: 'Real-time Analytics',
                desc: 'Live data processing and visualization for immediate operational insights.',
                color: 'from-green-600 to-emerald-500',
                tags: ['analytics'],
                icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                ),
            },
            {
                title: 'Swarm Intelligence',
                desc: 'Coordinated multi-UAV operations with distributed decision-making capabilities.',
                color: 'from-orange-600 to-red-500',
                tags: ['autonomy', 'swarm'],
                icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                ),
            },
            {
                title: 'Extended Endurance',
                desc: 'Optimized power management and aerodynamic designs for maximum flight duration.',
                color: 'from-blue-600 to-violet-500',
                tags: ['power', 'endurance'],
                icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                ),
            },
        ],
        []
    );

    const tags = useMemo(() => {
        const set = new Set<string>();
        items.forEach((it) => it.tags.forEach((t) => set.add(t)));
        return Array.from(set);
    }, [items]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let list = items.filter((it) => {
            const matchQ = !q || it.title.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q);
            const matchTag = !activeTag || it.tags.includes(activeTag);
            return matchQ && matchTag;
        });
        if (sortBy === 'alpha') {
            list = [...list].sort((a, b) => a.title.localeCompare(b.title));
        }
        return list;
    }, [items, query, activeTag, sortBy]);

    function goToContact(withItem?: Capability | null) {
        const subject = encodeURIComponent(withItem?.title ?? 'General Inquiry');
        const url = `/contact${subject ? `?subject=${subject}` : ''}`;
        router.push(url);
    }

    return (
        <div className="min-h-screen bg-black text-white pt-20">
            <div className="max-w-7xl mx-auto px-6 py-16 relative">
                <svg
                    className="absolute -top-20 -right-20 w-96 h-96 opacity-10 pointer-events-none"
                    viewBox="0 0 600 600"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="g1" x1="0" x2="1">
                            <stop offset="0" stopColor="#7c3aed" />
                            <stop offset="1" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>
                    <circle cx="300" cy="300" r="300" fill="url(#g1)" />
                </svg>

                <header className="mb-10">
                    <h1 className="text-5xl font-extrabold mb-3">Our Capabilities</h1>
                    <p className="text-gray-300 max-w-2xl">
                        Intelligent systems and integrated platforms designed for reliability, security, and extendable performance.
                    </p>
                </header>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1">
                        <label htmlFor="capabilities-search" className="sr-only">
                            Search capabilities
                        </label>

                        <div className="flex items-center space-x-2 mb-3">
                            <button
                                type="button"
                                onClick={() => setActiveTag(null)}
                                className={`px-3 py-1 rounded-full ${!activeTag ? 'bg-indigo-700 text-white' : 'bg-gray-800 text-gray-300'} text-sm`}
                            >
                                All
                            </button>

                            {tags.map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setActiveTag((cur) => (cur === t ? null : t))}
                                    className={`px-3 py-1 rounded-full text-sm ${activeTag === t ? 'bg-gradient-to-r from-indigo-600 to-teal-400 text-black' : 'bg-gray-800 text-gray-300'}`}
                                >
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}

                            <div className="ml-auto flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setSortBy((s) => (s === 'relevance' ? 'alpha' : 'relevance'))}
                                    className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm"
                                    aria-pressed={sortBy === 'alpha'}
                                >
                                    Sort: {sortBy === 'alpha' ? 'A→Z' : 'Relevance'}
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                                </svg>
                            </div>

                            <input
                                id="capabilities-search"
                                type="search"
                                placeholder="Search capabilities..."
                                aria-label="Search capabilities"
                                className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-10 pr-20 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
                                onChange={(e) => setQuery(e.target.value)}
                                value={query}
                            />

                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
                                {query ? (
                                    <button
                                        type="button"
                                        onClick={() => setQuery('')}
                                        aria-label="Clear search"
                                        className="p-1 rounded-md text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                ) : null}

                                <span className="hidden sm:inline-flex items-center bg-gray-800 text-gray-200 text-sm px-3 py-1 rounded-full">
                                    {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => goToContact(selected)}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-400 text-black font-semibold shadow hover:scale-105 transform transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            title={selected ? `Contact about ${selected.title}` : 'Contact Sales'}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12v6M8 12v6M3 7l9 6 9-6" />
                            </svg>
                            Contact Sales
                        </button>

                        <a href="#learn" className="text-sm text-gray-400 hover:text-gray-200 transition">
                            Learn more →
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {filtered.map((item) => {
                        const active = selected?.title === item.title;
                        return (
                            <button
                                key={item.title}
                                onClick={() => setSelected((cur) => (cur?.title === item.title ? null : item))}
                                className={`p-6 bg-gray-900 border rounded-2xl text-left w-full transition-transform transform ${active ? 'scale-102 ring-2 ring-indigo-500 border-indigo-600' : 'border-gray-800 hover:scale-[1.02]'}`}
                                aria-pressed={active}
                            >
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} text-white mb-4`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-400">{item.desc}</p>
                                <div className="mt-4 flex gap-2 flex-wrap">
                                    {item.tags.map((t) => (
                                        <span key={t} className="text-xs bg-gray-800 px-2 py-1 rounded-full text-gray-300">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Additional Information Section */}
                <div id="learn" className="mt-20 pt-12 border-t border-gray-800">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Advanced UAV Solutions</h2>
                            <p className="text-gray-300 mb-6">
                                VyomGarud delivers cutting-edge unmanned aerial systems engineered for defense, 
                                surveillance, and specialized industrial applications. Our platforms integrate 
                                the latest advancements in autonomy, sensor fusion, and secure communications.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-300">
                                        <strong>Mission-Ready Systems:</strong> Deployable in hours, not weeks
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-300">
                                        <strong>Proven Reliability:</strong> Tested in extreme environmental conditions
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-300">
                                        <strong>Scalable Architecture:</strong> From single units to coordinated swarm operations
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold mb-4">Ready to Deploy?</h3>
                            <p className="text-gray-300 mb-6">
                                Contact our solutions team to discuss your specific requirements and explore how 
                                VyomGarud can enhance your operational capabilities.
                            </p>
                            <button
                                onClick={() => goToContact()}
                                className="w-full bg-gradient-to-r from-indigo-600 to-teal-400 text-black font-semibold py-3 px-6 rounded-lg hover:scale-105 transform transition"
                            >
                                Schedule a Demo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}