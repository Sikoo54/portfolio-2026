// ============================================================
// MOLTEN METAL — efek WebGL "logam cair" (lib ogl).
// Shader fragment menghasilkan gradasi metalik mengalir;
// dipakai di hero dengan palet hijau-nit + lime elektrik.
// (Konversi dari komponen ReactBits ke TypeScript.)
//
// Performance: GL context DI-DISPOSE penuh (loseContext +
// canvas dibuang) saat keluar viewport (IntersectionObserver),
// dan di-reinit ulang kalau masuk lagi. Props dibaca via ref
// supaya create() selalu pakai nilai terbaru.
// ============================================================
"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

type ColorMode = "molten" | "ember" | "frost";

type MoltenMetalProps = {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  scale?: number;
  detail?: number;
  glow?: number;
  coreSize?: number;
  swirl?: number;
  fold?: number;
  blackPoint?: number;
  brightness?: number;
  colorMode?: ColorMode;
  grain?: boolean;
  grainIntensity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  opacity?: number;
  className?: string;
};

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

const colorModeToFloat = (mode: ColorMode) => (mode === "ember" ? 1 : mode === "frost" ? 2 : 0);

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uScale;
uniform float uDetail;
uniform float uGlow;
uniform float uCoreSize;
uniform float uSwirl;
uniform float uFold;
uniform float uBlackPoint;
uniform float uBrightness;
uniform float uColorMode;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform bool uEnableMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float time = iTime * uSpeed;
  vec2 p = uScale * ((gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y) - 0.5;

  vec2 drift = vec2(0.0);
  if (uEnableMouse) {
    drift = (uMouse - 0.5) * uMouseStrength * 2.0;
  }
  p += drift;

  vec2 i = p;
  float c = 0.0;
  float r = length(p + vec2(sin(time), sin(time * 0.3 + 5.0)) * 0.5);
  float d = length(p);
  float rot = d + time + p.x * uSwirl;

  float cosRot = cos(rot);
  mat2 warp = mat2(cos(rot - sin(time / 5.0)), sin(rot), -sin(cosRot - time), cosRot) * uFold;
  float glowCore = uGlow * uCoreSize;

  for (float n = 0.0; n < 8.0; n++) {
    if (n >= uDetail) break;
    p *= warp;
    float t = r - time / (n + 3.0);
    i -= p + vec2(cos(t - i.x - r) + sin(t + i.y), sin(t - i.y) + cos(t + i.x) + r);
    c += glowCore / length(vec2(sin(i.x + t), cos(i.y + t)));
  }

  c /= 6.0;

  float intensity = max(c - uBlackPoint, 0.0) * uBrightness;

  float g = clamp(intensity, 0.0, 1.0);

  float mid = 0.5;
  if (uColorMode > 1.5) {
    mid = 0.65;
  } else if (uColorMode > 0.5) {
    mid = 0.35;
  }

  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, mid, g));
  col = mix(col, uColor3, smoothstep(mid, 1.0, g));

  float a = g;
  if (uGrain > 0.5) {
    float gr = hash(gl_FragCoord.xy + iTime);
    a += (gr - 0.5) * uGrainIntensity;
  }
  a = clamp(a, 0.0, 1.0) * uOpacity;
  fragColor = vec4(col * a, a);
}
`;

type MoltenCtx = {
  renderer: Renderer;
  program: Program;
  mesh: Mesh;
};

const ctxMap = new WeakMap<HTMLDivElement, MoltenCtx>();

export default function MoltenMetal(props: MoltenMetalProps) {
  const {
    color1 = "#5227FF",
    color2 = "#FF9FFC",
    color3 = "#FFFFFF",
    speed = 0.35,
    scale = 4,
    detail = 3,
    glow = 1.6,
    coreSize = 0.1,
    swirl = 1,
    fold = -0.2,
    blackPoint = 0.05,
    brightness = 1.3,
    colorMode = "molten",
    grain = true,
    grainIntensity = 0.05,
    mouseInteraction = true,
    mouseStrength = 0.3,
    opacity = 1.0,
    className = "",
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef(props);
  propsRef.current = props;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ctx: MoltenCtx | null = null;
    let ro: ResizeObserver | null = null;
    let raf = 0;
    let t0 = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (!ctx) return;
      const gl = ctx.renderer.gl;
      const rect = gl.canvas.getBoundingClientRect();
      targetMouse[0] = (e.clientX - rect.left) / rect.width;
      targetMouse[1] = 1.0 - (e.clientY - rect.top) / rect.height;
    };
    const onMouseLeave = () => {
      targetMouse[0] = 0.5;
      targetMouse[1] = 0.5;
    };

    const targetMouse = [0.5, 0.5];
    const currentMouse = [0.5, 0.5];

    const loop = (t: number) => {
      if (!ctx) return;
      ctx.program.uniforms.iTime.value = (t - t0) * 0.001;
      currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
      currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
      (ctx.program.uniforms.uMouse.value as Float32Array)[0] = currentMouse[0];
      (ctx.program.uniforms.uMouse.value as Float32Array)[1] = currentMouse[1];
      ctx.renderer.render({ scene: ctx.mesh });
      raf = requestAnimationFrame(loop);
    };

    const syncUniforms = () => {
      if (!ctx) return;
      const p = propsRef.current;
      const u = ctx.program.uniforms;
      u.uSpeed.value = p.speed ?? 0.35;
      u.uScale.value = p.scale ?? 4;
      u.uDetail.value = p.detail ?? 3;
      u.uGlow.value = p.glow ?? 1.6;
      u.uCoreSize.value = Math.max(p.coreSize ?? 0.1, 0.001);
      u.uSwirl.value = p.swirl ?? 1;
      u.uFold.value = p.fold ?? -0.2;
      u.uBlackPoint.value = p.blackPoint ?? 0.05;
      u.uBrightness.value = p.brightness ?? 1.3;
      u.uColorMode.value = colorModeToFloat(p.colorMode ?? "molten");
      u.uGrain.value = p.grain ?? true ? 1 : 0;
      u.uGrainIntensity.value = p.grainIntensity ?? 0.05;
      u.uOpacity.value = p.opacity ?? 1;
      u.uMouseStrength.value = p.mouseStrength ?? 0.3;
      u.uEnableMouse.value = p.mouseInteraction ?? true;
      (u.uColor1.value as Float32Array).set(hexToRgb(p.color1 ?? "#5227FF"));
      (u.uColor2.value as Float32Array).set(hexToRgb(p.color2 ?? "#FF9FFC"));
      (u.uColor3.value as Float32Array).set(hexToRgb(p.color3 ?? "#FFFFFF"));
    };

    const setSize = () => {
      if (!ctx) return;
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      ctx.renderer.setSize(w, h);
      const res = ctx.program.uniforms.iResolution.value as Float32Array;
      res[0] = ctx.renderer.gl.drawingBufferWidth;
      res[1] = ctx.renderer.gl.drawingBufferHeight;
      ctx.renderer.render({ scene: ctx.mesh });
    };

    const createGl = () => {
      if (ctx) return;

      const renderer = new Renderer({
        webgl: 2,
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });

      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      const canvas = gl.canvas;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      container.appendChild(canvas);

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new Float32Array([1, 1]) },
          uSpeed: { value: 0.35 },
          uScale: { value: 4 },
          uDetail: { value: 3 },
          uGlow: { value: 1.6 },
          uCoreSize: { value: 0.1 },
          uSwirl: { value: 1 },
          uFold: { value: -0.2 },
          uBlackPoint: { value: 0.05 },
          uBrightness: { value: 1.3 },
          uColorMode: { value: 0 },
          uGrain: { value: 1 },
          uGrainIntensity: { value: 0.05 },
          uOpacity: { value: 1.0 },
          uMouse: { value: new Float32Array([0.5, 0.5]) },
          uMouseStrength: { value: 0.3 },
          uEnableMouse: { value: true },
          uColor1: { value: new Float32Array([1, 1, 1]) },
          uColor2: { value: new Float32Array([1, 1, 1]) },
          uColor3: { value: new Float32Array([1, 1, 1]) },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });
      ctx = { renderer, program, mesh };
      ctxMap.set(container, ctx);

      syncUniforms();

      ro = new ResizeObserver(setSize);
      ro.observe(container);
      setSize();

      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mouseleave", onMouseLeave);

      t0 = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const destroyGl = () => {
      if (!ctx) return;
      cancelAnimationFrame(raf);
      raf = 0;
      ro?.disconnect();
      ro = null;
      const gl = ctx.renderer.gl;
      gl.canvas.removeEventListener("mousemove", onMouseMove);
      gl.canvas.removeEventListener("mouseleave", onMouseLeave);
      ctxMap.delete(container);
      try {
        container.removeChild(gl.canvas);
      } catch {}
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      ctx = null;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) createGl();
        else destroyGl();
      },
      { threshold: 0 }
    );
    io.observe(container);

    const onVisibility = () => {
      if (document.hidden) destroyGl();
      else if (container.getBoundingClientRect().height > 0 && !ctx) createGl();
    };
    document.addEventListener("visibilitychange", onVisibility);

    createGl();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      destroyGl();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const c = ctxMap.get(container);
    if (!c) return;
    const u = c.program.uniforms;
    const p = propsRef.current;
    u.uSpeed.value = speed;
    u.uScale.value = scale;
    u.uDetail.value = detail;
    u.uGlow.value = glow;
    u.uCoreSize.value = Math.max(coreSize, 0.001);
    u.uSwirl.value = swirl;
    u.uFold.value = fold;
    u.uBlackPoint.value = blackPoint;
    u.uBrightness.value = brightness;
    u.uColorMode.value = colorModeToFloat(colorMode);
    u.uGrain.value = grain ? 1 : 0;
    u.uGrainIntensity.value = grainIntensity;
    u.uOpacity.value = opacity;
    u.uMouseStrength.value = mouseStrength;
    u.uEnableMouse.value = mouseInteraction;

    (u.uColor1.value as Float32Array).set(hexToRgb(color1));
    (u.uColor2.value as Float32Array).set(hexToRgb(color2));
    (u.uColor3.value as Float32Array).set(hexToRgb(color3));
  }, [
    color1,
    color2,
    color3,
    speed,
    scale,
    detail,
    glow,
    coreSize,
    swirl,
    fold,
    blackPoint,
    brightness,
    colorMode,
    grain,
    grainIntensity,
    mouseInteraction,
    mouseStrength,
    opacity,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className}`.trim()}
    />
  );
}