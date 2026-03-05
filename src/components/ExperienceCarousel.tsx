"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
    {
        src: "/experience/inclusteam.svg",
        alt: "Inclusteam - Talleres 3D",
        caption: "Inclusteam — Talleres de impresión 3D",
    },
    {
        src: "/experience/taller-3d.svg",
        alt: "Taller 3D",
        caption: "Talleres educativos y demostraciones",
    },
    {
        src: "/experience/proyecto-social.svg",
        alt: "Proyecto social",
        caption: "Proyectos sociales y voluntariado",
    },
    {
        src: "/experience/mentoring.svg",
        alt: "Mentoría",
        caption: "Mentoría y tutorías",
    },
];

export default function ExperienceCarousel() {
    const [index, setIndex] = useState(0);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        startAutoPlay();
        return stopAutoPlay;
    }, [index]);

    function startAutoPlay() {
        stopAutoPlay();
        timerRef.current = window.setTimeout(() => {
            setIndex((i) => (i + 1) % slides.length);
        }, 5000);
    }

    function stopAutoPlay() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }

    function goTo(i: number) {
        setIndex(i % slides.length);
    }

    return (
        <div className="mt-8">
            <div className="relative rounded-2xl overflow-hidden border theme-border bg-blurred-card p-4">
                <div className="w-full h-64 sm:h-72 md:h-80 grid place-items-center">
                    <Image
                        src={slides[index].src}
                        alt={slides[index].alt}
                        width={1200}
                        height={800}
                        className="object-contain max-h-full"
                        unoptimized
                    />
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm theme-text">{slides[index].caption}</p>

                    <div className="flex items-center gap-2">
                        <button
                            aria-label="Anterior"
                            onClick={() => goTo((index - 1 + slides.length) % slides.length)}
                            className="rounded-md px-3 py-2 bg-white/5 hover:bg-white/10"
                        >
                            ‹
                        </button>
                        <button
                            aria-label="Siguiente"
                            onClick={() => goTo((index + 1) % slides.length)}
                            className="rounded-md px-3 py-2 bg-white/5 hover:bg-white/10"
                        >
                            ›
                        </button>
                    </div>
                </div>

                <div className="mt-3 flex gap-2 justify-center">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            aria-label={`Ir a slide ${i + 1}`}
                            onClick={() => goTo(i)}
                            className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/30"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
