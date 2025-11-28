"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProjectsSection from "@/components/ProjectsSection";
import { Mail, ChevronRight, Linkedin, Github } from "lucide-react";
import CompanyLogo from "@/components/CompanyLogo";
import HeroAnimated from "@/components/HeroAnimated";
const PK = process.env.NEXT_PUBLIC_LOGO_DEV_PK;

function BrandLogo({ company, domain }: { company: string; domain: string }) {
  const src = PK
    ? `https://img.logo.dev/${domain}?token=${PK}&retina=true`
    : `https://img.logo.dev/${domain}`;

  return (
    <div className="flex items-center gap-2 rounded-lg">
      <Image
        src={src}
        alt={`${company} logo`}
        width={40}
        height={40}
        className="rounded-sm"
        unoptimized
      />
    </div>
  );
}

export default function Page() {
  const pdfPath = "/cv/nicolas-friz.pdf";
  const downloadPath = "/cv/CV_Nicolás_Friz.pdf";

  // Detectar iOS en cliente (incluye iPad en Safari sobre mac con touch)
  const [isIos, setIsIos] = useState(false);
  useEffect(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isIphoneIpod = /iPhone|iPod/.test(ua);
    const isIpad = /iPad/.test(ua) || (navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1);
    setIsIos(isIphoneIpod || isIpad);
  }, []);

  return (

    <main className="min-h-screen relative text-foreground">
      <link rel="preload" as="image" href="/bg-base.jpg" />

      {/* Hero */}
      <HeroAnimated />

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-12 mt-20 md:scroll-mt-10">

        <h2 className="text-2xl font-semibold tracking-tight">¿Quién soy?</h2>

        <div className="mt-4 grid gap-8 md:grid-cols-12 md:items-center">
          {/* Cuadro/imagen a la izquierda */}
          <div className="md:col-span-5">
            <div className="relative mx-auto h-64 w-64 md:h-80 md:w-80 overflow-hidden glass-card p-2 bg-blurred-card rounded-2xl border theme-border backdrop-blur-3xl">
              <div className="absolute inset-2 rounded-2xl bg-linear-to-br from-white/10 to-transparent grid place-items-center">
                <span className="text-sm theme-text">
                  <Image src="thumbs/me.jpg" alt="Nicolás Friz Pereira" fill className="object-cover rounded-2xl" />
                </span>
              </div>
            </div>
          </div>

          {/* Texto a la derecha */}
          <div className="md:col-span-7 bg-blurred-card p-6 rounded-2xl border theme-border backdrop-blur-3xl ">
            <p className="theme-text">
              Soy ingeniero informático con una sólida trayectoria en el desarrollo de soluciones digitales modernas y optimizadas.
              Mi enfoque se centra en <strong>TypeScript</strong>, <strong>Next.js</strong>, <strong>Tailwind CSS</strong> y <strong>Laravel</strong>, donde aplico principios de diseño, arquitectura estructurada y metodologías ágiles.
            </p>
            <p className="mt-3 theme-text">
              También cuento con experiencia en la integración de CMS como WordPress y APIs personalizadas para complementar soluciones. Me apasiona construir productos de principio a fin,
              abarcando desde el levantamiento de requisitos hasta el despliegue.
              Me motiva trabajar y aportar en proyectos en equipo donde el diseño y la ingeniería se complementan.
            </p>

            {/* Stack breve visible */}
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="border theme-border rounded-full px-3 py-1 theme-text">TypeScript</span>
              <span className="border theme-border rounded-full px-3 py-1 theme-text">Next.js</span>
              <span className="border theme-border rounded-full px-3 py-1 theme-text">Tailwind CSS</span>
              <span className="border theme-border rounded-full px-3 py-1 theme-text">Laravel</span>
              <span className="border theme-border rounded-full px-3 py-1 theme-text">WordPress</span>
              <span className="border theme-border rounded-full px-3 py-1 theme-text">PHP</span>
              <span className="border theme-border rounded-full px-3 py-1 theme-text">FastAPI</span>
              <span className="border theme-border rounded-full px-3 py-1 theme-text">MySQL</span>
              <span className="border theme-border rounded-full px-3 py-1 theme-text">PL/SQL</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="mailto:ni.frizp@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl border theme-border bg-white/5 px-4 py-2 hover:bg-white/10"
              >
                <Mail size={16} />
                Contáctame
              </Link>
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl border theme-border px-4 py-2 hover:bg-white/5"
              >
                Ver proyectos
                <ChevronRight className="transition-transform group-hover:translate-x-0.5" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Proyectos destacados (landing) */}
      <ProjectsSection />

      {/* Experiencia */}
      <section id="experience" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">Experiencia</h2>

        <div className="grid gap-6">
          {/* TEQMED */}
          <div className="glass-card p-6 backdrop-blur-xl border theme-border bg-white/30 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 dark:bg-white/5 dark:hover:bg-white/10 dark:text-zinc-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <BrandLogo company="TEQMED" domain="teqmed.cl" />
                <h3 className="text-lg font-medium theme-text">Desarrollador Web y Soporte TI</h3>
                <p className="text-sm theme-text">TEQMED · Jornada parcial</p>
                <p className="text-sm theme-text">Concepción, Bio Bio, Chile · Actualidad</p>
              </div>
              <strong>
                <p className="text-sm theme-text mt-2 md:mt-0">Feb 2025 – Dic 2025 · 10 meses</p>
              </strong>
            </div>
            <p className="mt-3 theme-text">
              Desarrollo de aplicaciones internas y soporte TI. Enfoque en programación, ingeniería y optimización de sistemas para el sector médico.
            </p>
          </div>

          {/* IBM */}
          <div className="glass-card p-6 backdrop-blur-xl border theme-border bg-white/30 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 dark:bg-white/5 dark:hover:bg-white/10 dark:text-zinc-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <BrandLogo company="IBM" domain="ibm.com" />
                <h3 className="text-lg font-medium theme-text">Blue Journey Program Internship</h3>
                <p className="text-sm theme-text">IBM · Contrato de prácticas</p>
                <p className="text-sm theme-text">Región Metropolitana de Santiago, Chile · Híbrido</p>
              </div>
              <strong><p className="text-sm theme-text mt-2 md:mt-0">Ago 2024 – Feb 2025 · 7 meses</p></strong>
            </div>
            <p className="mt-3 theme-text">
              Participación en el programa de formación de IBM centrado en desarrollo de software,
              tecnologías cloud y buenas prácticas de ingeniería.
            </p>
          </div>

          {/* CITT Duoc UC */}
          <div className="glass-card p-6 backdrop-blur-xl border theme-border bg-white/30 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 dark:bg-white/5 dark:hover:bg-white/10 dark:text-zinc-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <BrandLogo company="CITT Duoc UC" domain="duoc.cl" />
                <h3 className="text-lg font-medium theme-text">Líder Track Impresión 3D</h3>
                <p className="text-sm theme-text">CITT Duoc UC · Jornada parcial</p>
                <p className="text-sm theme-text">Concepción, Bio Bio, Chile · Presencial</p>
              </div>
              <strong>
                <p className="text-sm theme-text mt-2 md:mt-0">Abr 2022 – Ago 2024 · 2 años 5 meses</p></strong>
            </div>
            <p className="mt-3 theme-text">
              Coordinación del área de impresión y modelado 3D. Creación de prototipos y liderazgo de proyectos estudiantiles y académicos.
            </p>
          </div>

          {/* TEQMED */}
          <div className="glass-card p-6 backdrop-blur-xl border theme-border bg-white/30 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 dark:bg-white/5 dark:hover:bg-white/10 dark:text-zinc-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <BrandLogo company="TEQMED" domain="teqmed.cl" />
                <h3 className="text-lg font-medium theme-text">Especialista de asistencia TI / Desarrollador Web Fullstack</h3>
                <p className="text-sm theme-text">TEQMED · Jornada parcial</p>
                <p className="text-sm theme-text">Concepción, Bio Bio, Chile · Presencial</p>
              </div>
              <strong>
                <p className="text-sm theme-text mt-2 md:mt-0">Ago 2022 – Jul 2024 · 2 años</p>
              </strong>
            </div>
            <p className="mt-3 theme-text">
              Desarrollo de sistemas web fullstack, mantenimiento de infraestructura y soporte técnico.
              Enfoque en optimización de procesos internos y automatización.
            </p>
          </div>
        </div>
      </section>

      {/* CV */}
      <section id="cv" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Currículum Vitae</h2>
        <p className="text-sm theme-text max-w-prose">
          Aquí puedes visualizar mi CV o descargarlo en PDF.
        </p>
        {/* Viewer embebido (mismo PDF que descargas) */}
        <div className="mt-6 rounded-xl border overflow-hidden shadow-2xl backdrop-blur-xl bg-white/70 dark:bg-gray-800/60">
          <object
            data="/cv/nicolas-friz.pdf"
            type="application/pdf"
            className="w-full h-[75vh]"
          >
            <iframe
              src="/cv/nicolas-friz.pdf"
              className="w-full h-[75vh]"
              title="CV PDF"
            />
            <div className="p-6 text-sm">
              Tu navegador no puede mostrar PDFs embebidos.&nbsp;
              <a href="/cv/nicolas-friz.pdf" className="underline" target="_blank" rel="noreferrer">
                Abrir o descargar CV en PDF
              </a>
            </div>
          </object>

          {/* Botón de descarga */}
          <a
            href="/cv/nicolas-friz.pdf"
            download
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 
             backdrop-blur-xl bg-red-600/60 hover:bg-red-500/60 
             text-white px-4 py-2 m-6 transition duration-300"
          >
            Descargar CV
          </a>
        </div>
      </section>


      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
        <div
          className="
    glass-card rounded-2xl border p-8 shadow-lg backdrop-blur-xl transition-all duration-300
    bg-white/40 hover:bg-white/50
    dark:bg-zinc-900/70 dark:hover:bg-zinc-900/80
  "
        >

          <h2 className="text-2xl font-semibold tracking-tight mb-2 text-zinc-900 dark:text-white">Contactame</h2>

          <p className="max-w-prose text-white">
            Para colaborar, conversar de oportunidades o pedir una demo de mis proyectos.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:ni.frizp@gmail.com"
              className="
        inline-flex items-center gap-2 rounded-xl border theme-border
        border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20
        text-emerald-700 dark:text-emerald-500
        px-4 py-2 font-medium transition-all duration-200
      "
            >
              <Mail size={16} /> ni.frizp@gmail.com
            </a>

            <a
              href="#"
              className="
        inline-flex items-center gap-2 rounded-xl border theme-border bg-white/30 hover:bg-zinc-100
        text-zinc-700 hover:text-zinc-900
        dark:bg-white/5 dark:hover:bg-white/10 dark:text-zinc-200
        px-4 py-2 font-medium transition-all duration-200
      "
            >
              <Linkedin size={16} /> LinkedIn
            </a>

            <a
              href="#"
              className="
        inline-flex items-center gap-2 rounded-xl border theme-border bg-white/30 hover:bg-zinc-100
        text-zinc-700 hover:text-zinc-900
        dark:bg-white/5 dark:hover:bg-white/10 dark:text-zinc-200
        px-4 py-2 font-medium transition-all duration-200
      "
            >
              <Github size={16} /> GitHub
            </a>
          </div>
        </div>
      </section>
      <footer className="bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Nicolás Friz. Todos los derechos reservados. ©JohnHathway.
          </p>
        </div>
      </footer>
    </main>
  );
}
