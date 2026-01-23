import { fetchCredlyBadges } from "@/lib/credly";
import CertificatesList from "@/components/CertificatesList";

export default async function CertificatesSection() {
    const { badges, error } = await fetchCredlyBadges();

    return <CertificatesList badges={badges} error={error ?? undefined} />;
}
