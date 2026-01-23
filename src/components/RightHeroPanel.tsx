"use client";

import Image from "next/image";

const PK = process.env.NEXT_PUBLIC_LOGO_DEV_PK;

function BrandLogo({ company, domain }: { company: string; domain: string }) {
    const src = PK
        ? `https://img.logo.dev/${domain}?token=${PK}&retina=true`
        : `https://img.logo.dev/${domain}`;

    return (
        <div className="flex items-center gap-2 rounded-lg border border-white/20 
                    bg-white/50 dark:bg-white/5 px-3 py-2 backdrop-blur-md">
            <Image
                src={src}
                alt={`${company} logo`}
                width={22}
                height={22}
                className="rounded-sm"
                unoptimized
            />
            <span className="text-xs text-zinc-700 dark:text-zinc-200">
                {company}
            </span>
        </div>
    );
}

export default function RightHeroPanel() {
    return (
        <div className="md:col-span-5">
            <div className="relative mx-auto w-full max-w-sm">
                {/* luz de fondo */}
                <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-500/30 blur-3xl" />

                {/* tarjeta principal */}
                <div className="rounded-2xl border border-white/15 p-5 backdrop-blur-xl
                        bg-white/70 dark:bg-zinc-900/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                    {/* estado */}
                    <div
                        className="inline-flex items-center gap-2 rounded-full 
                       border border-emerald-500/30 dark:border-emerald-400/30
                       bg-emerald-500/10 dark:bg-emerald-500/15
                       px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-100"
                    >
                        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                        Disponibilidad inmediata
                    </div>

                    {/* resumen */}
                    <div className="mt-4 space-y-2 text-sm text-zinc-800 dark:text-zinc-100">
                        <p>· Cauquenes, Maule, Chile ·</p>
                        <p>· Presencial / Híbrido / Remoto ·</p>
                    </div>

                    {/* logos */}
                    <div className="mt-5">
                        <p className="mb-2 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                            Colaborado con:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <BrandLogo company="Abc" domain="abc.cl" />
                            <BrandLogo company="Duoc UC" domain="duoc.cl" />
                            <BrandLogo company="IBM" domain="ibm.com" />
                            <BrandLogo company="TEQMED" domain="teqmed.cl" />
                            <BrandLogo company="TreePower" domain="treepower.cl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
