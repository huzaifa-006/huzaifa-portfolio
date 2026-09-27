/**
 * ─────────────────────────────────────────────────────────────
 *  SOCIAL & PROFILE LINKS
 *  Change a URL here and it updates everywhere (header, hero,
 *  contact section, footer, services).
 *  `icon` must be one of: github | linkedin | upwork | fiverr | mail
 * ─────────────────────────────────────────────────────────────
 */

export type SocialIcon = "github" | "linkedin" | "upwork" | "fiverr" | "mail";

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
  icon: SocialIcon;
}

export const socialLinks = {
  github: {
    label: "GitHub",
    handle: "huzaifa-006",
    href: "https://github.com/huzaifa-006",
    icon: "github",
  },
  linkedin: {
    label: "LinkedIn",
    handle: "in/huzaifa05",
    href: "https://www.linkedin.com/in/huzaifa05/",
    icon: "linkedin",
  },
  upwork: {
    label: "Upwork",
    handle: "Muhammad Huzaifa S.",
    href: "https://www.upwork.com/freelancers/~019fb344bd6b875df4",
    icon: "upwork",
  },
  fiverr: {
    // Public seller page (the /edit URL only works when you are logged in).
    label: "Fiverr",
    handle: "who_zaifa",
    href: "https://www.fiverr.com/who_zaifa",
    icon: "fiverr",
  },
  email: {
    label: "Email",
    handle: "huzaifashafiq2024@gmail.com",
    href: "mailto:huzaifashafiq2024@gmail.com",
    icon: "mail",
  },
} satisfies Record<string, SocialLink>;

/** Order used when all links are listed together. */
export const allSocialLinks: SocialLink[] = [
  socialLinks.github,
  socialLinks.linkedin,
  socialLinks.upwork,
  socialLinks.fiverr,
  socialLinks.email,
];
