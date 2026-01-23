export type CertificateBadge = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    issuer?: string;
    issuedAt?: string;
    issuedLabel?: string;
    url: string;
    skills: string[];
};
