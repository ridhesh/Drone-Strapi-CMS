import React, { useEffect, useRef, useState } from "react";

type ColumnsType = number | { base: number; sm?: number; md?: number; lg?: number; xl?: number };

type AnimatedGridProps = {
    children?: React.ReactNode;
    items?: any[]; // alternative to children
    renderItem?: (item: any, index: number) => React.ReactNode;
    columns?: ColumnsType; // number of columns for grid layout
    gap?: number | string; // gap between items (px or CSS unit)
    stagger?: number; // ms between each item's entrance
    className?: string;
    rootMargin?: string; // for intersection observer
};

const DEFAULT_COLUMNS = 3;
const DEFAULT_GAP = 16;
const DEFAULT_STAGGER = 80;
const DEFAULT_ROOT_MARGIN = "0px 0px -10% 0px";

export default function AnimatedGrid({
    children,
    items,
    renderItem,
    columns = DEFAULT_COLUMNS,
    gap = DEFAULT_GAP,
    stagger = DEFAULT_STAGGER,
    className,
    rootMargin = DEFAULT_ROOT_MARGIN,
}: AnimatedGridProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);

    // Normalize list of nodes to render
    const nodes: React.ReactNode[] = items && renderItem
        ? items.map((it, i) => <React.Fragment key={i}>{renderItem(it, i)}</React.Fragment>)
        : children
            ? React.Children.toArray(children)
            : [];

    // FIXED: useEffect now returns undefined in all paths
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return undefined; // FIX: Return undefined

        // If already in view, skip observing
        if ("IntersectionObserver" in window) {
            const io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setInView(true);
                            io.disconnect();
                        }
                    });
                },
                { root: null, rootMargin }
            );
            io.observe(el);
            return () => io.disconnect();
        } else {
            // fallback: show immediately
            setInView(true);
            return undefined; // FIX: Return undefined
        }
    }, [rootMargin]);

    // convert gap to CSS value
    const gapValue = typeof gap === "number" ? `${gap}px` : gap;

    // Handle responsive columns
    const getGridTemplateColumns = (cols: ColumnsType): string => {
        if (typeof cols === 'number') {
            return `repeat(${cols}, minmax(0, 1fr))`;
        }
        
        // For responsive object, create CSS custom properties or media queries
        const { base, sm, md, lg, xl } = cols;
        return `repeat(${base}, minmax(0, 1fr))`;
    };

    // Generate responsive CSS for columns
    const generateResponsiveCSS = (cols: ColumnsType): string => {
        if (typeof cols === 'number') {
            return `
                .ag-grid {
                    grid-template-columns: repeat(${cols}, minmax(0, 1fr));
                }

                @media (max-width: 900px) {
                    .ag-grid {
                        grid-template-columns: repeat(${Math.max(2, Math.min(cols, 2))}, minmax(0,1fr));
                    }
                }
                @media (max-width: 520px) {
                    .ag-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `;
        }

        // For responsive object
        const { base, sm, md, lg, xl } = cols;
        return `
            .ag-grid {
                grid-template-columns: repeat(${base}, minmax(0, 1fr));
            }

            ${sm ? `@media (min-width: 640px) {
                .ag-grid {
                    grid-template-columns: repeat(${sm}, minmax(0, 1fr));
                }
            }` : ''}

            ${md ? `@media (min-width: 768px) {
                .ag-grid {
                    grid-template-columns: repeat(${md}, minmax(0, 1fr));
                }
            }` : ''}

            ${lg ? `@media (min-width: 1024px) {
                .ag-grid {
                    grid-template-columns: repeat(${lg}, minmax(0, 1fr));
                }
            }` : ''}

            ${xl ? `@media (min-width: 1280px) {
                .ag-grid {
                    grid-template-columns: repeat(${xl}, minmax(0, 1fr));
                }
            }` : ''}

            /* Default responsive fallbacks */
            @media (max-width: 520px) {
                .ag-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
    };

    return (
        <>
            <style>{`
                .ag-grid {
                    display: grid;
                    gap: ${gapValue};
                    align-items: start;
                    width: 100%;
                }

                ${generateResponsiveCSS(columns)}

                .ag-item {
                    opacity: 0;
                    transform: translateY(16px) scale(0.995);
                    will-change: opacity, transform;
                    transition: opacity 420ms cubic-bezier(.2,.9,.25,1), transform 420ms cubic-bezier(.2,.9,.25,1);
                    background: transparent;
                }

                .ag-item.ag-enter {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }

                /* subtle hover effect for interactive feeling */
                .ag-item > * {
                    display: block;
                }
                .ag-item .ag-card {
                    transition: transform 240ms ease, box-shadow 240ms ease;
                    transform-origin: center;
                    border-radius: 8px;
                }
                .ag-item:hover .ag-card {
                    transform: translateY(-6px);
                    box-shadow: 0 10px 30px rgba(16,24,40,0.12);
                }
            `}</style>

            <div
                ref={containerRef}
                className={["ag-grid", className].filter(Boolean).join(" ")}
                aria-live="polite"
            >
                {nodes.map((node, i) => {
                    // Prepare inline style for staggered animation delay
                    const delay = `${i * stagger}ms`;
                    const itemClass = inView ? "ag-item ag-enter" : "ag-item";
                    return (
                        <div
                            key={(node as any)?.key ?? i}
                            className={itemClass}
                            style={{ transitionDelay: inView ? delay : "0ms" }}
                        >
                            {/* wrapper that can receive hover/card styles; keep user content intact */}
                            <div className="ag-card">{node}</div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}