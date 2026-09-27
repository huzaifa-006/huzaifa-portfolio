"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; alt: boolean };

/**
 * Animated background: slowly drifting data points joined by faint lines
 * when they are close, with a gentle response to the cursor.
 *
 * Performance: one canvas, ~20–70 points (scaled to screen size), capped
 * device-pixel-ratio, ~30 fps on phones, paused when the tab is hidden.
 * Colours come from --net-rgb / --net-rgb-2 / --net-alpha so it follows
 * the theme. With prefers-reduced-motion it draws one static frame.
 */
export default function DataNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let tick = 0;
    let rgb = "52, 211, 153";
    let rgb2 = "96, 165, 250";
    let alpha = 0.5;
    const mouse = { x: -9999, y: -9999 };

    const readTheme = () => {
      const cs = getComputedStyle(document.documentElement);
      rgb = cs.getPropertyValue("--net-rgb").trim() || rgb;
      rgb2 = cs.getPropertyValue("--net-rgb-2").trim() || rgb2;
      alpha = parseFloat(cs.getPropertyValue("--net-alpha")) || alpha;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Phones change innerHeight while scrolling (URL bar); only re-seed on a real width change.
      const reseed = window.innerWidth !== w || nodes.length === 0;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!reseed) return;
      const count = Math.round(Math.min(70, Math.max(20, (w * h) / 21000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.3 + 0.7,
        alt: Math.random() < 0.28,
      }));
    };

    const draw = (move: boolean) => {
      ctx.clearRect(0, 0, w, h);
      const maxD = w < 768 ? 105 : 140;
      const maxD2 = maxD * maxD;

      if (move) {
        for (const n of nodes) {
          // soft pull away from the cursor, then drift
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140 && d2 > 1) {
            const f = (1 - Math.sqrt(d2) / 140) * 0.35;
            n.x += (dx / Math.sqrt(d2)) * f;
            n.y += (dy / Math.sqrt(d2)) * f;
          }
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = w + 20;
          else if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          else if (n.y > h + 20) n.y = -20;
        }
      }

      // connections
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD2) {
            const o = (1 - Math.sqrt(d2) / maxD) * alpha * 0.45;
            ctx.strokeStyle = `rgba(${a.alt && b.alt ? rgb2 : rgb}, ${o})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // links to the cursor
        const mx = a.x - mouse.x;
        const my = a.y - mouse.y;
        const md2 = mx * mx + my * my;
        if (md2 < 180 * 180) {
          ctx.strokeStyle = `rgba(${rgb}, ${(1 - Math.sqrt(md2) / 180) * alpha * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // points
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${n.alt ? rgb2 : rgb}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      // ~30 fps on small screens to save battery
      if (w < 768 && tick++ % 2) return;
      draw(true);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce.matches || document.hidden) draw(false);
      else loop();
    };

    readTheme();
    resize();
    start();
    canvas.classList.add("is-ready");

    const onResize = () => {
      resize();
      if (reduce.matches) draw(false);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());
    const themeObserver = new MutationObserver(() => {
      readTheme();
      if (reduce.matches) draw(false);
    });

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    reduce.addEventListener("change", start);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reduce.removeEventListener("change", start);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="bg-fx__net" aria-hidden />;
}
