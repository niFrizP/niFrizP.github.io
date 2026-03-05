export type Project = {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    repo?: string;
    demo?: string;
    website?: string;
    image?: string; // /public/*
    year?: number;
    content?: string;
};


export const projects: Project[] = [
    {
        slug: "teqmed-2",
        title: "TEQMED SpA (Rebranding)",
        summary:
            "Implementación de un nuevo diseño a corde al rebranding de la empresa TEQMED SpA.",
        tags: ["Wordpress", "Figma", "HTML", "CSS"],
        website: "https://teqmed.cl",
        image: "thumbs/teqmed2.png",
        year: 2025,

    },

    {
        slug: "treepower",
        title: "TreePower",
        summary:
            "Mitigación de malware y levantamiento de pagina en contrucción para TreePower Ltda.",
        tags: ["PHP", "WordPress", "MySQL"],
        website: "https://treepower.cl",
        image: "thumbs/treepower.png",
        year: 2025,
    },

    {
        slug: "GOTIM",
        title: "GOTIM",
        summary:
            "Aplicación web para gestionar órdenes de trabajo, inventarios y reportes en talleres mecánicos industriales.",
        tags: ["PHP", "Laravel", "MySQL"],
        repo: "https://github.com/niFrizP/GOTIM",
        image: "thumbs/gotim.png",
        year: 2025,
    },

    {
        slug: "atrasos-lav",
        title: "Sistema de Atrasos - LAV Cauquenes",
        summary:
            "Plataforma de registro de atrasos de estudiantes para Liceo Antonio Varas de Cauquenes",
        tags: ["PHP", "Laravel", "MySQL"],
        website: "https://atrasos.lavcauquenes.cl",
        image: "thumbs/atrasos.jpeg",
        year: 2025,
    },

    {
        slug: "teqmed-spa",
        title: "TEQMED SpA",
        summary:
            "Página web corporativa para Técnicos en equipos médicos SpA, empresa de servicios técnicos de equipos médicos.",
        tags: ["PHP", "WordPress", "Astra"],
        website: "https://web.archive.org/web/20240808004207/https://teqmed.cl/",
        image: "thumbs/teqmed.jpeg",
        year: 2024,
    },

    {
        slug: "AsistApp2",
        title: "AsistApp2",
        summary:
            "Sistema de Asistencia y Gestión para Instituciones Educativas",
        tags: ["Ionic", "Angular", "Firebase"],
        website: "https://sogomez6.editorx.io/asistapp",
        image: "thumbs/assistapp.avif",
        year: 2022,
    },
];

export function getAllProjects() {
    return projects;
}
export function getProjectBySlug(slug: string) {
    return projects.find((p) => p.slug === slug);
}
export function getAllSlugs() {
    return projects.map((p) => p.slug);
}
