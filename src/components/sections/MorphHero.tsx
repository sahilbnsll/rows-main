"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "@/components/ui/Icons";

/*
 * After "Morph Gallery" in the component library: photographs that dissolve into each other through noise instead of cutting or
 * cross-fading. One shader pass over two textures. A noise field gives every pixel a threshold and the progress sweeps past those
 * thresholds, so the outgoing picture tears away in drifting tatters; the threshold is biased by the brightness of the incoming
 * picture, so its lit areas (the dancers under the stage lights) burn through first. Raw WebGL, no library. Where WebGL is missing
 * the pictures simply cross-fade, and with reduced motion they change without animation and do not advance on their own.
 */

export interface MorphSlide {
  src: string;
  w: number;
  h: number;
  alt: string;
  title: string;
  href: string;
  note?: string;
}

const VERT = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
uniform sampler2D u_from;
uniform sampler2D u_to;
uniform float u_progress;
uniform vec2 u_resolution;
uniform float u_fromAspect;
uniform float u_toAspect;
uniform float u_scale;
uniform float u_direction;
uniform float u_edge;
uniform float u_drift;
varying vec2 v_uv;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 v) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * snoise(v);
    v *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

vec2 mirror(vec2 uv) { return 1.0 - abs(1.0 - mod(uv, 2.0)); }

vec2 coverUV(vec2 uv, float imgAspect) {
  float canvasAspect = u_resolution.x / u_resolution.y;
  vec2 scale = (canvasAspect > imgAspect) ? vec2(1.0, imgAspect / canvasAspect) : vec2(canvasAspect / imgAspect, 1.0);
  return mirror((uv - 0.5) * scale + 0.5);
}

void main() {
  float adjusted = u_progress * (1.0 + 2.0 * u_edge) - u_edge;
  float noise = fbm(v_uv * u_scale + vec2(0.0, u_progress * u_direction)) * 0.5 + 0.5;
  noise = smoothstep(0.0, 2.0, length(texture2D(u_to, coverUV(v_uv, u_toAspect)).rgb) + noise);
  float mixFactor = 1.0 - smoothstep(adjusted - u_edge, adjusted + u_edge, noise);
  vec2 fromUV = coverUV(v_uv + vec2(0.0, noise * u_progress * u_drift * u_direction), u_fromAspect);
  vec2 toUV = coverUV(v_uv + vec2(0.0, noise * (1.0 - u_progress) * -0.5 * u_drift * u_direction), u_toAspect);
  gl_FragColor = mix(texture2D(u_from, fromUV), texture2D(u_to, toUV), mixFactor);
}`;

const easeInOutQuint = (t: number) => {
  const x = Math.min(Math.max(t, 0), 1);
  return x < 0.5 ? 16 * x ** 5 : 1 - (-2 * x + 2) ** 5 / 2;
};

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("no shader");
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    throw new Error("shader failed");
  }
  return shader;
}

function link(gl: WebGLRenderingContext) {
  const program = gl.createProgram();
  if (!program) throw new Error("no program");
  const v = compile(gl, gl.VERTEX_SHADER, VERT);
  const f = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  gl.attachShader(program, v);
  gl.attachShader(program, f);
  gl.linkProgram(program);
  gl.deleteShader(v);
  gl.deleteShader(f);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    throw new Error("link failed");
  }
  return program;
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(src));
    img.src = src;
  });

const reducedQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

const pad = (n: number) => String(n).padStart(2, "0");
const DURATION = 1600;
const AUTOPLAY = 5200;

export function MorphHero({ slides, children }: { slides: MorphSlide[]; children?: React.ReactNode }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia(reducedQuery).matches, () => false);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const request = useRef<{ from: number; to: number } | null>(null);
  const previous = useRef(0);
  const reducedRef = useRef(reduced);
  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  const n = slides.length;
  const go = useCallback((next: number) => setActive(((next % n) + n) % n), [n]);

  useEffect(() => {
    if (previous.current === active) return;
    request.current = { from: previous.current, to: active };
    previous.current = active;
  }, [active]);

  const sources = slides.map((s) => s.src).join("|");

  useEffect(() => {
    const el = canvas.current;
    if (!el || n === 0) return;
    const gl = el.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) {
      setFailed(true);
      return;
    }
    const list = sources.split("|");
    const textures: (WebGLTexture | null)[] = list.map(() => null);
    const aspects = list.map(() => 1);
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let raf = 0;
    let disposed = false;
    let visible = true;
    let from = 0;
    let to = 0;
    let progress = 1;
    let startedAt = 0;
    let direction = 1;
    const u: Record<string, WebGLUniformLocation | null> = {};

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(el.clientWidth * dpr);
      const h = Math.round(el.clientHeight * dpr);
      if (!w || !h || (el.width === w && el.height === h)) return;
      el.width = w;
      el.height = h;
      gl.viewport(0, 0, w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const pick = (i: number) => textures[i] ?? textures.find((t) => t) ?? null;

    const draw = () => {
      const pending = request.current;
      if (pending) {
        request.current = null;
        from = pending.from;
        to = pending.to;
        progress = 0;
        startedAt = performance.now();
        direction = ((pending.to - pending.from + list.length) % list.length) * 2 <= list.length ? 1 : -1;
      }
      if (progress < 1) {
        const span = reducedRef.current ? 0 : DURATION;
        progress = span === 0 ? 1 : easeInOutQuint((performance.now() - startedAt) / span);
      } else if (!visible) return;
      const a = pick(from);
      const b = pick(to);
      if (!a || !b) return;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, a);
      gl.uniform1i(u.from, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, b);
      gl.uniform1i(u.to, 1);
      gl.uniform1f(u.progress, progress);
      gl.uniform2f(u.resolution, el.width, el.height);
      gl.uniform1f(u.fromAspect, aspects[from] ?? 1);
      gl.uniform1f(u.toAspect, aspects[to] ?? 1);
      gl.uniform1f(u.scale, 3.2);
      gl.uniform1f(u.direction, direction);
      gl.uniform1f(u.edge, 0.15);
      gl.uniform1f(u.drift, 0.45);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const frame = () => {
      if (disposed) return;
      draw();
      raf = requestAnimationFrame(frame);
    };

    const start = async () => {
      try {
        program = link(gl);
        gl.useProgram(program);
        buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        for (const name of ["from", "to", "progress", "resolution", "fromAspect", "toAspect", "scale", "direction", "edge", "drift"]) u[name] = gl.getUniformLocation(program, "u_" + name);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        let running = false;
        let refused = 0;
        await Promise.all(
          list.map((src, i) =>
            loadImage(src).then(
              (img) => {
                if (disposed) return;
                const tex = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, tex);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                textures[i] = tex;
                aspects[i] = img.naturalWidth / Math.max(img.naturalHeight, 1);
                if (!running && i === 0) {
                  running = true;
                  resize();
                  setReady(true);
                  raf = requestAnimationFrame(frame);
                }
              },
              () => {
                refused += 1;
                if (refused === list.length && !disposed) setFailed(true);
              },
            ),
          ),
        );
        if (!running && !disposed) {
          running = true;
          resize();
          setReady(true);
          raf = requestAnimationFrame(frame);
        }
      } catch {
        if (!disposed) setFailed(true);
      }
    };
    void start();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      for (const t of textures) if (t) gl.deleteTexture(t);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
    };
  }, [sources, n]);

  useEffect(() => {
    if (reduced || paused || n < 2) return;
    const id = window.setInterval(() => go(active + 1), AUTOPLAY);
    return () => window.clearInterval(id);
  }, [reduced, paused, active, go, n]);

  useEffect(() => {
    const sync = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  const swipe = useRef<number | null>(null);
  const current = slides[active];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Photographs from the productions"
      className="stage on-stage relative isolate h-[clamp(36rem,92svh,58rem)] overflow-hidden"
      onPointerDown={(e) => (swipe.current = e.clientX)}
      onPointerUp={(e) => {
        const x = swipe.current;
        swipe.current = null;
        if (x !== null && Math.abs(e.clientX - x) > 48) go(active + (e.clientX < x ? 1 : -1));
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(active - 1);
        else if (e.key === "ArrowRight") go(active + 1);
      }}
    >
      {/* the first photograph, painted by the server so the page never opens on a blank */}
      <Image src={slides[0].src} alt="" fill priority sizes="100vw" quality={80} className="-z-20 object-cover" />
      {failed ? (
        slides.map((s, i) => (
          <Image key={s.src} src={s.src} alt="" fill sizes="100vw" quality={80} aria-hidden="true" className="-z-10 object-cover transition-opacity duration-700 motion-reduce:transition-none" style={{ opacity: i === active ? 1 : 0 }} />
        ))
      ) : (
        <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 -z-10 block size-full transition-opacity duration-500" style={{ opacity: ready ? 1 : 0 }} />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-[5] bg-[linear-gradient(180deg,rgba(14,18,9,0.72),rgba(14,18,9,0.1)_30%,rgba(14,18,9,0.15)_55%,rgba(14,18,9,0.88)),linear-gradient(90deg,rgba(14,18,9,0.82),rgba(14,18,9,0.4)_40%,transparent_68%)]" />

      {children}

      <div className="wrap absolute inset-x-0 bottom-0 flex flex-col gap-5 pb-8 sm:flex-row sm:items-end sm:justify-between sm:pb-10">
        <div aria-live="polite" className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/70 tabular-nums">
            {pad(active + 1)} / {pad(n)}
          </p>
          <Link href={current.href} className="group mt-1 inline-flex items-center gap-2 text-paper">
            <span className="display text-[clamp(1.4rem,1.1rem+1vw,2rem)] leading-tight">{current.title}</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          {current.note && <p className="serif mt-1 text-[1rem] italic text-paper/75">{current.note}</p>}
        </div>
        <div className="flex items-center gap-3">
          <ul className="hidden items-center gap-2 md:flex" aria-label="Choose a photograph">
            {slides.map((s, i) => (
              <li key={s.src}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === active}
                  aria-label={`Show ${s.title}`}
                  className={`relative block h-11 w-16 overflow-hidden rounded-md ring-2 transition ${i === active ? "ring-paper" : "opacity-60 ring-transparent hover:opacity-90"}`}
                >
                  <Image src={s.src} alt="" fill sizes="4rem" quality={60} className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => go(active - 1)} aria-label="Previous photograph" className="grid size-11 place-items-center rounded-full bg-paper/12 text-paper backdrop-blur transition-colors hover:bg-paper/25">
            <ChevronLeft size={16} />
          </button>
          <button type="button" onClick={() => go(active + 1)} aria-label="Next photograph" className="grid size-11 place-items-center rounded-full bg-paper/12 text-paper backdrop-blur transition-colors hover:bg-paper/25">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
