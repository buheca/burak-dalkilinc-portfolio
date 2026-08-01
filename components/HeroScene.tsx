"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const ACCENT = "#38bdf8";
const ACCENT_DIM = "#0ea5e9";

/** Faceted core + counter-rotating wireframe shell. */
function Core({ still }: { still: boolean }) {
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.LineSegments>(null);

  const shellGeometry = useMemo(
    () => new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.7, 1)),
    [],
  );

  useFrame((_, delta) => {
    if (still) return;
    if (core.current) {
      core.current.rotation.y += delta * 0.18;
      core.current.rotation.x += delta * 0.06;
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.09;
      shell.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <>
      <mesh ref={core} castShadow>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshPhysicalMaterial
          color="#1b2430"
          metalness={0.85}
          roughness={0.28}
          clearcoat={1}
          clearcoatRoughness={0.15}
          iridescence={0.7}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 420]}
          envMapIntensity={1.4}
        />
      </mesh>

      <lineSegments ref={shell} geometry={shellGeometry}>
        <lineBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

/** Sparse point lattice on a spherical shell — echoes the SVG dot grid in 3D. */
function Lattice({ count = 260, still }: { count?: number; still: boolean }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Fibonacci sphere for even distribution, jittered outward.
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      const r = 2.25 + Math.random() * 0.7;

      arr[i * 3] = Math.cos(theta) * radiusAtY * r;
      arr[i * 3 + 1] = y * r;
      arr[i * 3 + 2] = Math.sin(theta) * radiusAtY * r;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (still || !points.current) return;
    points.current.rotation.y += delta * 0.045;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={ACCENT}
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Eases the whole rig toward the pointer for a subtle parallax. */
function ParallaxRig({
  children,
  still,
}: {
  children: React.ReactNode;
  still: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetX = still ? 0 : state.pointer.y * 0.18;
    const targetY = still ? 0 : state.pointer.x * 0.28;
    // Frame-rate independent damping.
    const t = 1 - Math.pow(0.001, delta);
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      t,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetY,
      t,
    );
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
  const prefersReduced = useReducedMotion();
  const still = prefersReduced ?? false;

  return (
    <div className="relative w-full aspect-square max-w-[420px] mx-auto">
      {/* Ambient bloom behind the canvas — cheaper than a post-processing pass. */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full blur-[80px] opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(14,165,233,0.18) 0%, transparent 65%)",
        }}
      />

      <Canvas
        className="!absolute inset-0"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 42, position: [0, 0, 6.2], near: 0.1, far: 40 }}
      >
        {/* Key / fill / rim — three-point setup, accent on the rim. */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 5, 4]} intensity={1.6} />
        <directionalLight position={[-5, 2, 3]} intensity={0.4} />
        <pointLight
          position={[-2.5, -1.5, -3]}
          intensity={22}
          distance={14}
          decay={2}
          color={ACCENT}
        />

        {/* Procedural environment: real reflections without fetching an HDR. */}
        <Environment resolution={256} frames={1}>
          <Lightformer
            intensity={2.2}
            position={[0, 3, 2]}
            scale={[6, 3, 1]}
            color="#ffffff"
          />
          <Lightformer
            intensity={3}
            position={[-3, 0, 1]}
            scale={[4, 4, 1]}
            color={ACCENT}
          />
          <Lightformer
            intensity={1.4}
            position={[3, -2, -1]}
            scale={[4, 2, 1]}
            color={ACCENT_DIM}
          />
        </Environment>

        <ParallaxRig still={still}>
          <Core still={still} />
          <Lattice still={still} />
        </ParallaxRig>
      </Canvas>
    </div>
  );
}
