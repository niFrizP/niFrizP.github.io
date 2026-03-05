"use client";

import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Project } from "@/data/projects";
import InteractiveScreenshot from "@/components/InteractiveScreenshot";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <Card className="group overflow-hidden border-white/10 bg-brand-glass/30 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-brand-glass/40">
      <CardHeader className="space-y-1">
        <CardTitle className="text-base md:text-lg">{project.title}</CardTitle>
        {/* año proyectos */}
        <p className="text-xs theme-text">
          {project.year ?? ""}
        </p>
      </CardHeader>

      {project.image && (
        <InteractiveScreenshot
          src={project.image}
          alt={project.title}
          height={230}
          radius="rounded-xl"
        />
      )}

      <CardContent className="mt-4">
        {/* Descripción */}
        <p className="text-sm theme-text">{project.summary}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Badge key={t} variant="outline" className="border-white/10 bg-white/5 text-xs">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>

      <Separator className="mx-4 my-1.5 opacity-80" />

      <CardFooter className="flex gap-2">
        {project.website && (
          <Link
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-sm hover:bg-white/5"
            aria-label={`Sitio web de ${project.title}`}
          >
            <ExternalLink size={16} /> Sitio Web
          </Link>
        )}
        {project.repo && (
          <Link
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-sm hover:bg-white/5"
            aria-label={`Código fuente de ${project.title}`}
          >
            <Github size={16} /> Código
          </Link>
        )}
        {project.demo && (
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-sm hover:bg-white/5"
            aria-label={`Demo de ${project.title}`}
          >
            <ExternalLink size={16} /> Demo
          </Link>
        )}
      </CardFooter>
    </Card >
  );
}
