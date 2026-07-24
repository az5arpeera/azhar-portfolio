"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "@/lib/store/useScrollStore";
import { useSceneStore } from "@/lib/store/useSceneStore";
import { themeAt } from "@/lib/ocean-themes";

/* A flow-field of drifting points standing in for the ocean. All motion lives
   in the vertex shader. The theme uniforms (color ramp, flow behaviour, speed)
   are interpolated on the CPU from scroll position and eased each frame, so the
   single field morphs seamlessly between section moods. */

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uSize;
  uniform float uFlow;
  uniform float uSpeed;
  uniform float uSpread;
  attribute float aSeed;
  varying float vDepth;
  varying float vGlow;

  // ── flow behaviours, blended by the fractional part of uFlow ──
  vec3 currentFlow(vec3 p, float t) {
    float a = sin(p.x * 0.35 + t * 0.18) + cos(p.y * 0.4 - t * 0.15);
    float b = cos(p.z * 0.3 + t * 0.12) + sin(p.x * 0.25 - t * 0.1);
    return vec3(cos(a) * 0.6, sin(a * 0.7) * 0.5 - 0.15, sin(b) * 0.6);
  }
  vec3 streakFlow(vec3 p, float t) {
    // fast horizontal lanes — the "racetrack"
    float lane = floor(p.y * 1.5);
    return vec3(2.4 + sin(lane) * 0.4, sin(p.x * 0.5 + t) * 0.05, 0.0);
  }
  vec3 latticeFlow(vec3 p, float t) {
    // ease toward a grid — modular "panels"
    vec3 cell = floor(p * 0.8 + 0.5) / 0.8;
    return (cell - p) * (0.8 + 0.2 * sin(t + p.x));
  }
  vec3 waveFlow(vec3 p, float t) {
    // vertical sinusoidal bands — "data / music"
    return vec3(
      sin(p.y * 0.9 + t * 1.4) * 0.9,
      cos(p.x * 0.7 - t) * 0.3,
      sin(p.x * 0.5 + t * 0.8) * 0.6
    );
  }

  vec3 flowFor(float mode, vec3 p, float t) {
    if (mode < 1.0) return mix(currentFlow(p, t), streakFlow(p, t), mode);
    if (mode < 2.0) return mix(streakFlow(p, t), latticeFlow(p, t), mode - 1.0);
    return mix(latticeFlow(p, t), waveFlow(p, t), clamp(mode - 2.0, 0.0, 1.0));
  }

  void main() {
    vec3 pos = position * vec3(uSpread, 1.0, uSpread);
    float t = uTime * uSpeed + aSeed * 6.2831;
    vec3 drift = flowFor(uFlow, pos, t);
    pos += drift * (0.5 + aSeed);
    pos.y -= uScroll * 3.0;
    pos.y = mod(pos.y + 7.0, 14.0) - 7.0;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    vDepth = clamp((pos.y + 7.0) / 14.0, 0.0, 1.0);
    vGlow = 0.4 + 0.6 * (0.5 + 0.5 * sin(t * 1.7));
    gl_PointSize = uSize * (300.0 / -mv.z) * (0.6 + aSeed * 0.8);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform vec3 uColorTop;
  uniform vec3 uColorBottom;
  uniform float uAccent;
  varying float vDepth;
  varying float vGlow;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    float alpha = smoothstep(0.25, 0.0, d);

    vec3 col = mix(uColorBottom, uColorTop, vDepth);
    col *= (0.7 + vGlow * 0.6) * uAccent;

    gl_FragColor = vec4(col, alpha * (0.5 + vDepth * 0.5));
  }
`;

function easeToward(uniform: { value: number }, target: number, k: number) {
  uniform.value += (target - uniform.value) * k;
}

export function OceanParticles({ count }: { count: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      seeds[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uSize: { value: 7 },
      uFlow: { value: 0 },
      uSpeed: { value: 1 },
      uSpread: { value: 1 },
      uAccent: { value: 1 },
      uColorTop: { value: new THREE.Color(0.55, 0.92, 0.98) },
      uColorBottom: { value: new THREE.Color(0.03, 0.12, 0.28) },
    }),
    [],
  );

  useFrame((_, delta) => {
    const m = materialRef.current;
    if (!m) return;
    const u = m.uniforms;
    u.uTime.value += delta;

    const { progress, sectionFloat } = useScrollStore.getState();
    const sequence = useSceneStore.getState().sequence;
    const target = themeAt(sequence, sectionFloat);
    const k = Math.min(1, delta * 2.2);

    easeToward(u.uScroll, progress, Math.min(1, delta * 3));
    easeToward(u.uFlow, target.flow, k);
    easeToward(u.uSpeed, target.speed, k);
    easeToward(u.uSpread, target.spread, k);
    easeToward(u.uAccent, target.accent, k);

    (u.uColorTop.value as THREE.Color).setRGB(
      u.uColorTop.value.r + (target.colorTop[0] - u.uColorTop.value.r) * k,
      u.uColorTop.value.g + (target.colorTop[1] - u.uColorTop.value.g) * k,
      u.uColorTop.value.b + (target.colorTop[2] - u.uColorTop.value.b) * k,
    );
    (u.uColorBottom.value as THREE.Color).setRGB(
      u.uColorBottom.value.r +
        (target.colorBottom[0] - u.uColorBottom.value.r) * k,
      u.uColorBottom.value.g +
        (target.colorBottom[1] - u.uColorBottom.value.g) * k,
      u.uColorBottom.value.b +
        (target.colorBottom[2] - u.uColorBottom.value.b) * k,
    );
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
