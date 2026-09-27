import { credlyProfileUrl, visibleCertifications } from "@/data/certifications";
import { Section, SectionHeading, Tag } from "@/components/ui";
import Reveal from "@/components/Reveal";
import BadgeImage from "@/components/BadgeImage";
import { ArrowUpRight, ShieldCheck } from "@/components/Icons";

const fmt = (d: string) =>
  d ? new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }) : "";

export default function Certifications() {
  return (
    <Section id="certifications" labelledBy="certs-title">
      <SectionHeading
        id="certs-title"
        eyebrow="Certifications"
        title="Verified credentials."
        intro="IBM data-science courses completed on Coursera. Every badge links to its public Credly page so you can verify it."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCertifications.map((c, i) => (
          <Reveal as="li" key={c.verifyUrl} delay={(i % 3) * 70}>
            <article className="flex h-full flex-col rounded-2xl border border-line bg-panel/60 p-5 transition hover:border-line-strong">
              <div className="flex items-start gap-4">
                <BadgeImage src={c.badgeImage} alt={`${c.name} badge`} />
                <div>
                  <h3 className="font-display text-base leading-snug font-semibold text-white">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {c.issuer} · {c.platform}
                  </p>
                  {c.issued && <p className="mt-0.5 text-xs text-dim">Issued {fmt(c.issued)}</p>}
                </div>
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills">
                {c.skills.slice(0, 4).map((s) => (
                  <li key={s}><Tag>{s}</Tag></li>
                ))}
              </ul>
              <a
                href={c.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify ${c.name} on Credly (opens in new tab)`}
                className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-accent hover:underline"
              >
                <ShieldCheck size={16} /> Verify credential <ArrowUpRight size={14} />
              </a>
            </article>
          </Reveal>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted">
        All badges:{" "}
        <a href={credlyProfileUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline">
          Credly profile
        </a>
      </p>
    </Section>
  );
}
