import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/data/projects";
import Gallery from "@/components/Gallery";


export const metadata = {
    title: "Nicolás Friz Pereira - Galería",
};


export default function ProjectsIndex() {
    const data = getAllProjects();
    const allTags = Array.from(new Set(data.flatMap((p) => p.tags))).sort();

    return (
        <main className="mx-auto max-w-6xl px-4 py-12">
            <div className="mb-4">
                <h1 className="text-3xl font-semibold tracking-tight">Galeria</h1>
                <p className="text-sm text-muted-foreground">
                    Imagenes de proyectos en los que estuve involucrado.
                </p>
            </div>

            <Gallery />
        </main>
    );
}
