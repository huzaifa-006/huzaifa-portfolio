import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-start justify-center px-4 pt-24">
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-white">Page not found</h1>
      <p className="mt-3 text-muted">The page you are looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8"><Button href="/">Back to home</Button></div>
    </section>
  );
}
