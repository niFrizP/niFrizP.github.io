"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const images = [
    "/gallery/img1.svg",
    "/gallery/img2.svg",
    "/gallery/img3.svg",
    "/gallery/img4.svg",
    "/gallery/img5.svg",
    "/gallery/img6.svg",
];

export default function Gallery() {
    const [view, setView] = useState<"grid" | "list" | "large">("grid");
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [zoom, setZoom] = useState(1);

    const open = (i: number) => {
        setOpenIndex(i);
        setZoom(1);
    };
    const close = () => setOpenIndex(null);

    const next = useCallback(() => {
        setOpenIndex((i) => (i === null ? 0 : (i + 1) % images.length));
        setZoom(1);
    }, []);
    const prev = useCallback(() => {
        setOpenIndex((i) => (i === null ? images.length - 1 : (i - 1 + images.length) % images.length));
        setZoom(1);
    }, []);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (openIndex === null) return;
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "Escape") close();
            if (e.key === "+") setZoom((z) => Math.min(3, z + 0.25));
            if (e.key === "-") setZoom((z) => Math.max(0.5, z - 0.25));
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [openIndex, next, prev]);

    function zoomIn() {
        setZoom((z) => Math.min(3, z + 0.25));
    }
    function zoomOut() {
        setZoom((z) => Math.max(0.5, z - 0.25));
    }
    function resetZoom() {
        setZoom(1);
    }

    // refs for touch gestures
    const startXRef = useRef<number | null>(null);
    const startYRef = useRef<number | null>(null);
    const startDistRef = useRef<number | null>(null);
    const isPinchingRef = useRef(false);
    const initialZoomRef = useRef(1);
    const lastTapRef = useRef<number | null>(null);

    type TouchPointLike = { clientX: number; clientY: number };
    type TouchListLike = { length: number;[index: number]: TouchPointLike };

    const getDist = (touches: TouchListLike): number => {
        if (touches.length < 2) return 0;
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.hypot(dx, dy);
    };

    function handleTouchStart(e: React.TouchEvent) {
        const t = e.touches;
        if (t.length === 1) {
            startXRef.current = t[0].clientX;
            startYRef.current = t[0].clientY;
            isPinchingRef.current = false;

            // doble tap para reset zoom
            const now = Date.now();
            if (lastTapRef.current && now - lastTapRef.current < 300) {
                setZoom(1);
                lastTapRef.current = null;
            } else {
                lastTapRef.current = now;
            }
        } else if (t.length === 2) {
            isPinchingRef.current = true;
            startDistRef.current = getDist(t);
            initialZoomRef.current = zoom;
        }
    }

    function handleTouchMove(e: React.TouchEvent) {
        const t = e.touches;
        if (isPinchingRef.current && t.length >= 2) {
            e.preventDefault();
            const d = getDist(t);
            if (startDistRef.current && startDistRef.current > 0) {
                const scale = (d / startDistRef.current) * initialZoomRef.current;
                setZoom(Math.max(0.5, Math.min(3, scale)));
            }
        } else if (t.length === 1 && startXRef.current !== null) {
            // detect swipe horizontal, prevent vertical drifts
            const dx = t[0].clientX - startXRef.current;
            const dy = t[0].clientY - (startYRef.current ?? 0);
            if (Math.abs(dx) > 20 && Math.abs(dx) > Math.abs(dy)) {
                e.preventDefault();
            }
        }
    }

    function handleTouchEnd(e: React.TouchEvent) {
        const changed = e.changedTouches;
        if (!isPinchingRef.current && startXRef.current !== null && changed.length === 1) {
            const endX = changed[0].clientX;
            const dx = endX - startXRef.current;
            const threshold = 60;
            if (dx > threshold) {
                prev();
            } else if (dx < -threshold) {
                next();
            }
        }
        // reset refs
        startXRef.current = null;
        startYRef.current = null;
        startDistRef.current = null;
        isPinchingRef.current = false;
    }

    return (
        <section className="mx-auto max-w-6xl px-4 py-12">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Galería</h2>

                <div className="flex items-center gap-2">
                    <Button variant={view === "grid" ? "default" : "outline"} size="sm" onClick={() => setView("grid")}>
                        Grid
                    </Button>
                    <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => setView("list")}>
                        Lista
                    </Button>
                    <Button variant={view === "large" ? "default" : "outline"} size="sm" onClick={() => setView("large")}>
                        Grande
                    </Button>
                </div>
            </div>

            <div
                className={`grid gap-4 ${view === "list" ? "grid-cols-1" : view === "large" ? "grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
            >
                {images.map((src, i) => (
                    <button
                        key={src}
                        onClick={() => open(i)}
                        onContextMenu={(e) => e.preventDefault()}
                        className="aspect-square overflow-hidden rounded-xl border theme-border bg-blurred-card p-0"
                    >
                        <Image src={src} alt={`Imagen ${i + 1}`} width={800} height={800} className="object-cover w-full h-full" unoptimized loading="lazy" draggable={false} />
                    </button>
                ))}
            </div>

            {openIndex !== null && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/70">
                    <div className="relative w-[90vw] max-w-4xl">
                        <button onClick={close} className="absolute right-2 top-2 rounded-full bg-white/10 p-2" aria-label="Cerrar" onContextMenu={(e) => e.preventDefault()}>
                            <X size={20} />
                        </button>

                        <div className="mb-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <button onClick={prev} className="rounded-md p-2 bg-white/5" aria-label="Anterior">
                                    <ChevronLeft size={20} />
                                </button>
                                <button onClick={next} className="rounded-md p-2 bg-white/5" aria-label="Siguiente">
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <button onClick={zoomOut} className="rounded-md p-2 bg-white/5" aria-label="Zoom out">-</button>
                                <button onClick={resetZoom} className="rounded-md p-2 bg-white/5" aria-label="Reset zoom">1×</button>
                                <button onClick={zoomIn} className="rounded-md p-2 bg-white/5" aria-label="Zoom in">+</button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div
                                className="flex-1 bg-black rounded-lg p-4 grid place-items-center overflow-hidden"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                <div style={{ transform: `scale(${zoom})`, transition: 'transform 120ms ease', willChange: 'transform' }}>
                                    <Image src={images[openIndex]} alt={`Imagen grande ${openIndex + 1}`} width={1600} height={1200} className="object-contain max-h-[80vh]" unoptimized loading="lazy" draggable={false} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
