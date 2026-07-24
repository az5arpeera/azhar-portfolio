"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "@/lib/store/useScrollStore";

/* A flow-field of drifting points standing in for the ocean. Motion lives in
   the vertex shader for the GPU to do the work; the fragment shader colors each
   point on a bright-cyan (top) → deep-blue (bottom) ramp that darkens as the
   scroll uniform advances, so scrolling down sinks the whole field. */

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uSize;
  attribute float aSeed;
  varying float vDepth;
  varying float vGlow;

  // cheap curl-ish flow from layered trig — enough for an ambient current
  vec3 flow(vec3 p, float t) {
    float a = sin(p.x * 0.35 + t * 0.18) + cos(p.y * 0.4 - t * 0.15);
    float b = cos(p.z * 0.3 + t * 0.12) + sin(p.x * 0.25 - t * 0.1);
    return vec3(cos(a) * 0.6, sin(a * 0.7) * 0.5 - 0.15, sin(b) * 0.6);
  }

  void main() {
    vec3 pos = position;
    float t = uTime + aSeed * 6.2831;
    vec3 drift = flow(pos, t);
    pos += drift * (0.5 + aSeed);
    // gentle downward pull as the user scrolls, so the field "sinks"
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
  uniform float uScroll;
  varying float vDepth;
  varying float vGlow;

  void main() {
    // round, soft points
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    float alpha = smoothstep(0.25, 0.0, d);

    // bright cyan at the top of the field, deep blue at the bottom
    vec3 top = vec3(0.55, 0.92, 0.98);
    vec3 bottom = vec3(0.03, 0.12, 0.28);
    vec3 col = mix(bottom, top, vDepth);
    // scrolling darkens the whole field
    col *= mix(1.0, 0.35, uScroll);

    gl_FragColor = vec4(col * (0.7 + vGlow * 0.6), alpha * (0.5 + vDepth * 0.5));
  }
`;

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
    }),
    [],
  );

  useFrame((_, delta) => {
    const m = materialRef.current;
    if (!m) return;
    m.uniforms.uTime.value += delta;
    // ease the scroll uniform toward the store value for smooth transitions
    const target = useScrollStore.getState().progress;
    m.uniforms.uScroll.value +=
      (target - m.uniforms.uScroll.value) * Math.min(1, delta * 3);
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
