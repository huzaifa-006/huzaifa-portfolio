/**
 * Site-wide background: a faint data grid plus two soft glows that
 * drift very slowly. Pure CSS (transform-only animation), no canvas or
 * JavaScript. Animation is switched off on small screens and for
 * prefers-reduced-motion (see globals.css).
 */
export default function BackgroundFX() {
  return (
    <div className="bg-fx" aria-hidden>
      <div className="bg-fx__blob bg-fx__blob--a" />
      <div className="bg-fx__blob bg-fx__blob--b" />
      <div className="bg-fx__grid" />
    </div>
  );
}
