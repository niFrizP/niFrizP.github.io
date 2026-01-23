"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Logo from "@/components/Logo";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const links = [
  { href: "/#about", label: "Sobre mí" },
  { href: "/#projects", label: "Proyectos" },
  { href: "/#experience", label: "Experiencia" },
  { href: "/#cv", label: "CV" },
  { href: "/#contact", label: "Contacto" },
];

export function Navbar() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const handleMobileLinkClick = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50">
      <nav className="mx-auto max-w-6xl px-4">
        <div className="mt-4 flex items-center justify-between rounded-2xl glass glass-card px-3 py-2">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2" aria-label="Inicio">
            <div
              className={
                mounted ? (isDark ? "text-white" : "text-zinc-900") : "text-zinc-900"
              }
            >
              <Logo className="h-8 w-auto" />
            </div>
          </Link>

          {/* LINKS DESKTOP */}
          <ul className="hidden md:flex items-center gap-4 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="
                      group relative inline-flex items-center
                      transition-all duration-200
                      hover:-translate-y-px hover:scale-[1.015]
                    "
                  style={{
                    color: mounted
                      ? isDark
                        ? "rgb(244 244 245)" // zinc-100
                        : "rgb(24 24 27)"    // zinc-900
                      : "rgb(24 24 27)",
                  }}
                >
                  {l.label}
                  <span
                    className="
                        pointer-events-none absolute left-0 -bottom-1 h-[1.5px] w-full
                        scale-x-0 origin-left
                        transition-transform duration-200
                        group-hover:scale-x-100
                      "
                    style={{
                      backgroundColor: mounted
                        ? isDark
                          ? "rgba(52, 211, 153, 0.8)" // emerald-400
                          : "rgb(82, 82, 91)"          // zinc-600
                        : "rgb(82, 82, 91)",
                    }}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* ACCIONES DERECHA */}
          <div className="flex items-center gap-2">
            {/* redes desktop */}
            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="outline" className="bg-transparent">
                <a
                  href="https://github.com/nifrizp"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Github size={18} />
                </a>
              </Button>
              <Button asChild variant="outline" className="bg-transparent">
                <a
                  href="https://www.linkedin.com/in/nicolasfrizpereira/"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Linkedin size={18} />
                </a>
              </Button>
            </div>

            <ThemeToggle />

            {/* MENÚ MÓVIL */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" aria-label="Abrir menú" className="bg-transparent">
                  <Menu size={18} />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-72 backdrop-blur-xl bg-white/90 dark:bg-zinc-950/95 
                           text-zinc-900 dark:text-white border-l border-zinc-200/70 dark:border-zinc-800
                           flex flex-col gap-4"
              >
                <SheetHeader>
                  <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                </SheetHeader>

                {/* logo dentro del menú */}
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={handleMobileLinkClick}
                >
                  <div className="text-white">
                    <Logo className="h-8 w-auto" />
                  </div>
                </Link>

                <nav className="grid gap-2 text-sm">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={handleMobileLinkClick}
                      className="rounded-lg border border-zinc-200/70 bg-white/40 hover:bg-white/70
                                 dark:border-zinc-800/70 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/70
                                 px-3 py-2 transition"
                    >
                      {l.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex gap-2 pt-2">
                  <Button asChild variant="outline" className="bg-white/40 dark:bg-zinc-900/40">
                    <a
                      href="https://github.com/nifrizp"
                      aria-label="GitHub"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Github size={18} />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="bg-white/40 dark:bg-zinc-900/40">
                    <a
                      href="https://www.linkedin.com/in/nicolasfrizpereira/"
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Linkedin size={18} />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="bg-white/40 dark:bg-zinc-900/40">
                    <a href="mailto:ni.frizp@gmail.com" aria-label="Email">
                      <Mail size={18} />
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Navbar;