import type { CertificateBadge } from "@/types/certificates";

export type CredlyApiBadge = {
    id: string;
    issued_at?: string;
    badge_template?: {
        name?: string;
        description?: string;
        image_url?: string;
        issuer?: { name?: string };
        skills?: { name?: string }[];
    };
    image_url?: string;
};

const DEFAULT_PROFILE_SLUG = "nifrizp";

export const CREDLY_PROFILE_SLUG =
    process.env.CREDLY_PROFILE_SLUG ?? DEFAULT_PROFILE_SLUG;

export const CREDLY_API_URL = `https://www.credly.com/users/${CREDLY_PROFILE_SLUG}/badges.json`;

export function normalizeCredlyBadge(raw: CredlyApiBadge): CertificateBadge | null {
    const name = raw.badge_template?.name?.trim();
    const description = raw.badge_template?.description?.trim();
    const imageUrl = raw.badge_template?.image_url || raw.image_url;

    if (!raw.id || !name || !imageUrl) {
        return null;
    }

    const skills =
        raw.badge_template?.skills
            ?.map((skill) => skill.name)
            .filter((name): name is string => Boolean(name)) ?? [];

    const getBadgeUrl = (badgeId: string) => `https://www.credly.com/badges/${badgeId}`;

    return {
        id: raw.id,
        name,
        description: description || "Certificación emitida en Credly.",
        imageUrl,
        issuer: raw.badge_template?.issuer?.name,
        issuedAt: raw.issued_at,
        url: getBadgeUrl(raw.id),
        skills,
    };
}

type FetchBadgesResult = {
    badges: CertificateBadge[];
    error?: string;
};

export async function fetchCredlyBadges(): Promise<FetchBadgesResult> {
    try {
        const res = await fetch(
            `https://r.jina.ai/https://www.credly.com/users/${CREDLY_PROFILE_SLUG}/badges.json`,
            {
                headers: { Accept: "application/json" },
                next: { revalidate: 3600 },
                cache: "force-cache",
            }
        );

        if (!res.ok) {
            console.error("Credly fetch failed", res.status, res.statusText);
            return {
                badges: [],
                error: "No se pudo obtener la información desde Credly.",
            };
        }

        const json = await res.json();
        const rawBadges = (json?.data as CredlyApiBadge[] | undefined) ?? [];
        const badges = rawBadges
            .map(normalizeCredlyBadge)
            .filter((badge): badge is NonNullable<ReturnType<typeof normalizeCredlyBadge>> => Boolean(badge));

        return { badges };
    } catch (error) {
        console.error("Credly fetch unexpected error", error);
        return {
            badges: [],
            error: "Error inesperado al conectar con Credly.",
        };
    }
}
