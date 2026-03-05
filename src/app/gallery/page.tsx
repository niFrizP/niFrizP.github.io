import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/data/projects";
import Gallery from "@/components/Gallery";


export const metadata = {
    title: "Proyectos – Nicolás FP",
};


export default function ProjectsIndex() {
    const data = getAllProjects();
    const allTags = Array.from(new Set(data.flatMap((p) => p.tags))).sort();

    return (
        <main className="mx-auto max-w-6xl px-4 py-12">
            <div className="mb-4">
                <h1 className="text-3xl font-semibold tracking-tight">Galeria</h1>
                <p className="text-sm text-muted-foreground">
                    Imagenes de proyectos, eventos y actividades relacionadas con mi carrera profesional y personal.
                </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {allTags.map((t) => (
                    <Badge key={t} variant="outline" className="border-white/10 bg-white/5">
                        {t}
                    </Badge>
                ))}
            </div>

            <Separator className="mb-6 opacity-50" />

            <Gallery />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                {data.map((p) => (
                    <Link key={p.slug} href={`/projects/${p.slug}`} className="block">
                        <ProjectCard project={p} />
                    </Link>
                ))}
            </div>
        </main>
    );
}
