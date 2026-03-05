"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { Separator } from "@/components/ui/separator";
import type { Project } from "@/data/projects";

type Props = {
    projects: Project[];
    allTags: string[];
};

export default function ProjectsBrowser({ projects, allTags }: Props) {
    const [query, setQuery] = useState("");
    const [active, setActive] = useState<Set<string>>(new Set());

    const toggleTag = (t: string) => {
        const next = new Set(active);
        next.has(t) ? next.delete(t) : next.add(t);
        setActive(next);
    };

    const clearFilters = () => {
        setQuery("");
        setActive(new Set());
    };

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return projects.filter((p) => {
            const matchText =
                !q ||
                p.title.toLowerCase().includes(q) ||
                p.summary.toLowerCase().includes(q) ||
                p.tags.some((t) => t.toLowerCase().includes(q));
            const matchTags =
                active.size === 0 || p.tags.some((t) => active.has(t));
            return matchText && matchTags;
        });
    }, [projects, query, active]);

    return (
        <>
            {/* Search + chips */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar por título, tech, resumen…"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/80"
                        aria-label="Buscar proyectos"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    {allTags.map((t) => {
                        const isOn = active.has(t);
                        return (
                            <button
                                key={t}
                                onClick={() => toggleTag(t)}
                                aria-pressed={isOn}
                                className={[
                                    "rounded-full px-3 py-1 text-xs transition border",
                                    isOn
                                        ? "border-white/20 bg-white/10"
                                        : "border-white/10 bg-white/5 hover:bg-white/10",
                                ].join(" ")}
                            >
                                {t}
                            </button>
                        );
                    })}
                    {(query || active.size > 0) && (
                        <button
                            onClick={clearFilters}
                            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-transparent px-3 py-1 text-xs hover:bg-white/5"
                            aria-label="Limpiar filtros"
                        >
                            <X size={14} /> Limpiar
                        </button>
                    )}
                </div>
            </div>

            <Separator className="my-6 opacity-50" />

            {/* Conteo */}
            <p className="mb-4 text-sm text-muted-foreground">
                {filtered.length} resultado{filtered.length === 1 ? "" : "s"}
                {active.size > 0 && ` · filtros: ${Array.from(active).join(", ")}`}
                {query && ` · búsqueda: “${query}”`}
            </p>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                    <ProjectCard key={p.slug} project={p} />
                ))}
            </div>
        </>
    );
}