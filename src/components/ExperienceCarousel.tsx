"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
    {
        src: "/gallery/Inclusteam2.jpg",
        alt: "Inclusteam - Grupo",
        caption: "Cierre del Proyecto Inclusteam - Año 2023",
    },
    {
        src: "/gallery/3D_1.jpg",
        alt: "Capacitación 3D 2022",
        caption: "Taller de Impresion 3D para niñas, niños y jóvenes pertenecientes al centro comunitario Agüita de la Perdiz - Año 2022",
    },
    {
        src: "/gallery/picto.jpg",
        alt: "Proyecto PICTO",
        caption: "Equipo proyecto PICTO - Año 2023",
    },
    {
        src: "/gallery/chilesp.jpg",
        alt: "Capacitación en Impresión 3D Chile España",
        caption: "Capacitación en Impresión 3D a estudiantes de la Escuela Chile España - Año 2023",
    }
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
        <div className="mt-8 mx-auto w-full max-w-6xl px-4">
            <div className="relative rounded-2xl overflow-hidden border theme-border bg-blurred-card backdrop-blur-3xl">
                <button
                    aria-label="Anterior"
                    onClick={() => goTo((index - 1 + slides.length) % slides.length)}
                    className="absolute left-2 top-[38%] z-10 -translate-y-1/2 rounded-full px-3 py-2 bg-black/35 backdrop-blur-sm hover:bg-black/50 sm:left-3"
                >
                    ‹
                </button>
                <button
                    aria-label="Siguiente"
                    onClick={() => goTo((index + 1) % slides.length)}
                    className="absolute right-2 top-[38%] z-10 -translate-y-1/2 rounded-full px-3 py-2 bg-black/35 backdrop-blur-sm hover:bg-black/50 sm:right-3"
                >
                    ›
                </button>

                <div className="w-full h-44 sm:h-52 md:h-64 lg:h-72 grid place-items-center">
                    <Image
                        src={slides[index].src}
                        alt={slides[index].alt}
                        width={1200}
                        height={800}
                        className="object-contain max-h-full w-full -translate-y-5 sm:-translate-y-3 md:-translate-y-28"
                        unoptimized
                    />
                </div>

                <div className="px-3 pb-2 pt-2 sm:px-4 sm:pb-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-md sm:p-3">
                        <div className="flex flex-col items-center gap-1">
                            <p className="text-sm leading-relaxed theme-text min-h-10 w-full text-center font-bold mt-1">{slides[index].caption}</p>
                        </div>

                    </div>
                    
                        <div className="mt-1 flex gap-2 justify-center">
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
        </div>
    );
}
