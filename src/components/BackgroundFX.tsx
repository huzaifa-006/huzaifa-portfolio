import DataNetwork from "./DataNetwork";

/**
 * Site-wide background: soft drifting glows, a faint grid, and an
 * animated data-network canvas. Animation is simplified on small screens
 * and switched off for prefers-reduced-motion (see globals.css and
 * DataNetwork.tsx).
 */
export default function BackgroundFX() {
  return (
    <div className="bg-fx" aria-hidden>
      <div className="bg-fx__blob bg-fx__blob--a" />
      <div className="bg-fx__blob bg-fx__blob--b" />
      <div className="bg-fx__grid" />
      <DataNetwork />
    </div>
  );
}
