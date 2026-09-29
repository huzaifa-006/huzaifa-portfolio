import { profile } from "@/data/profile";
import { withBase } from "@/data/site";
import { Section, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import CopyEmail from "@/components/CopyEmail";
import SocialButtons from "@/components/SocialButtons";
import { Download, Mail, MapPin } from "@/components/Icons";

export default function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title">
      <SectionHeading
        id="contact-title"
        index="10"
        eyebrow="Contact"
        title="Let's Work Together"
        intro="Have a data, machine-learning, or automation project in mind? Send me a message and I'll get back to you."
      />
      <div className="mx-auto grid max-w-4xl gap-5">
        <Reveal variant="zoom">
          <ContactForm />
        </Reveal>

        <Reveal delay={120}>
          <div className="card p-5 sm:p-6">
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Or reach me directly</p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                  <Mail size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted">Email</span>
                  <span className="block font-display text-base font-semibold break-all text-ink select-all sm:text-lg">{profile.email}</span>
                </span>
              </div>
              <CopyEmail email={profile.email} />
            </div>

            <div className="mt-5 border-t border-line pt-5">
              <SocialButtons />
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-center gap-2 text-muted">
                <MapPin size={16} /> {profile.location}
              </span>
              <a
                href={withBase(profile.cvPath)}
                download
                className="inline-flex h-10 items-center gap-2 self-start rounded-lg border border-line-strong bg-panel px-3.5 text-[13px] font-semibold text-ink transition hover:border-accent/50 hover:text-accent sm:self-auto"
              >
                <Download size={15} /> Download CV (PDF)
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
