"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

import type { CertificateBadge } from "@/types/certificates";
import { CREDLY_PROFILE_SLUG } from "@/lib/credly";

const DEFAULT_VISIBLE = 3;

type CertificatesListProps = {
    badges: CertificateBadge[];
    error?: string;
};

export default function CertificatesList({ badges, error }: CertificatesListProps) {
    const [showAll, setShowAll] = useState(false);

    const sortedBadges = useMemo(() => {
        return [...badges].sort((a, b) => {
            const dateA = a.issuedAt ? new Date(a.issuedAt).getTime() : 0;
            const dateB = b.issuedAt ? new Date(b.issuedAt).getTime() : 0;
            return dateB - dateA;
        });
    }, [badges]);

    const visibleBadges = showAll ? sortedBadges : sortedBadges.slice(0, DEFAULT_VISIBLE);

    return (
        <section id="certificates" className="mx-auto max-w-6xl px-4 py-20">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Certificaciones</h2>
                    <p className="mt-2 text-sm theme-text max-w-2xl">
                        Este listado se sincroniza con mis badges públicos de Credly. Cada tarjeta
                        incluye un enlace directo para validar la credencial emitida.
                    </p>
                </div>

                <Link
                    href={`https://www.credly.com/users/${CREDLY_PROFILE_SLUG}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl border theme-border px-4 py-2 text-sm hover:bg-white/5"
                >
                    Ver perfil en Credly
                    <ExternalLink size={16} />
                </Link>
            </div>

            {error && (
                <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 px-6 py-4 text-sm text-amber-200">
                    <p>{error}</p>
                </div>
            )}

            {!error && visibleBadges.length === 0 && (
                <p className="text-sm theme-text">Aún no hay certificados públicos en mi perfil de Credly.</p>
            )}

            {!error && visibleBadges.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleBadges.map((badge) => (
                        <article
                            key={badge.id}
                            className="glass-card h-full border-white/10 bg-white/5 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/10"
                        >
                            <header className="flex flex-row items-center gap-4 p-6 pb-0">
                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-white/5">
                                    <Image src={badge.imageUrl} alt={`Badge ${badge.name}`} fill className="object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-base leading-tight font-semibold">{badge.name}</h3>
                                    <p className="text-xs theme-text">
                                        {badge.issuer ?? "Credly"}
                                        {badge.issuedAt
                                            ? ` · ${new Intl.DateTimeFormat("es-CL", {
                                                year: "numeric",
                                                month: "short",
                                            }).format(new Date(badge.issuedAt))}`
                                            : null}
                                    </p>
                                </div>
                            </header>

                            <div className="p-6 pt-4">
                                <p className="text-sm theme-text max-h-24 overflow-hidden text-ellipsis">
                                    {badge.description}
                                </p>

                                {badge.skills.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {badge.skills.slice(0, 4).map((skill) => (
                                            <span
                                                key={`${badge.id}-${skill}`}
                                                className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {badge.skills.length > 4 && (
                                            <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">
                                                +{badge.skills.length - 4}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <Link
                                    href={badge.url}
                                    target="_blank"
                                    className="mt-6 inline-flex items-center gap-2 text-sm text-emerald-200 hover:text-emerald-100"
                                >
                                    Validar credencial
                                    <ExternalLink size={16} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {!error && badges.length > DEFAULT_VISIBLE && (
                <div className="mt-10 flex justify-center">
                    <button
                        onClick={() => setShowAll((prev) => !prev)}
                        className="inline-flex items-center gap-3 rounded-xl border border-white/1 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition bg-blur-lg backdrop-blur-md"
                    >
                        {showAll ? (
                            <>
                                Ver menos <ChevronUp size={16} />
                            </>
                        ) : (
                            <>
                                Ver más <ChevronDown size={16} />
                            </>
                        )}
                    </button>
                </div>
            )}
        </section>
    );
}
