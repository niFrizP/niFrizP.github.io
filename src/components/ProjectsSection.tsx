"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);

  // número de proyectos visibles inicialmente
  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl px-4 py-12 mt-20 md:scroll-mt-10"
    >
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Proyectos</h2>
      </div>

      {/* Lista de proyectos */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {visibleProjects.map((p) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Botón de ver más / menos */}
      {projects.length > 3 && (
        <div className="mt-8 flex justify-center">
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
