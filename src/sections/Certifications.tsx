import { credlyProfileUrl, visibleCertifications } from "@/data/certifications";
import { Section, SectionHeading, TextLink } from "@/components/ui";
import Reveal from "@/components/Reveal";
import BadgeImage from "@/components/BadgeImage";

const fmt = (d: string) =>
  d ? new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }) : "";

export default function Certifications() {
  return (
    <Section id="certifications" labelledBy="certs-title" className="md:py-20">
      <SectionHeading
        id="certs-title"
        index="08"
        eyebrow="Certifications"
        title="Verified credentials."
        intro="IBM data-science certifications earned on Coursera. Each one links to its public Credly record."
        action={
          <TextLink href={credlyProfileUrl} external ariaLabel="All badges on Credly (opens in new tab)">
            Credly profile
          </TextLink>
        }
      />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCertifications.map((c, i) => (
          <Reveal as="li" key={c.verifyUrl} delay={(i % 3) * 100} variant="zoom">
            <article className="card card-hover flex h-full items-start gap-4 p-4">
              <BadgeImage src={c.badgeImage} alt={`${c.name} badge`} size={52} />
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-[15px] leading-snug font-semibold text-ink">{c.name}</h3>
                <p className="mt-1 text-xs text-muted">
                  {c.issuer}
                  {c.issued && <> · {fmt(c.issued)}</>}
                </p>
                <TextLink href={c.verifyUrl} external className="mt-2.5 text-[13px]" ariaLabel={`Verify ${c.name} credential on Credly (opens in new tab)`}>
                  Verify Credential
                </TextLink>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
