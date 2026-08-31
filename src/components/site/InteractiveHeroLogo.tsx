import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

const BLUE = "#75A7DF";
const NAVY = "#2A5B84";
const AMBER = "#D9842B";

/** 64-unit logo space -> world units, centred. */
const px = (x: number) => (x - 30) / 8;
const py = (y: number) => (32 - y) / 8;

/** The Z/3 stroke: top bar, diagonal, short bar, then the open loop. */
function useStrokeCurve() {
  return useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const push = (x: number, y: number) => pts.push(new THREE.Vector3(x, y, 0));

    // straight run: top bar -> diagonal -> short bar
    const line = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      seg: number,
    ) => {
      for (let i = 1; i <= seg; i++) {
        push(x1 + ((x2 - x1) * i) / seg, y1 + ((y2 - y1) * i) / seg);
      }
    };

    push(px(17.5), py(13));
    line(px(17.5), py(13), px(40), py(13), 8);
    line(px(40), py(13), px(20), py(34.5), 12);
    line(px(20), py(34.5), px(24), py(34.5), 3);

    // open loop, swept clockwise from the short bar's end
    const cx = px(29);
    const cy = py(42);
    const r = 1.16;
    const a0 = (123.7 * Math.PI) / 180;
    const a1 = (-140 * Math.PI) / 180;
    const steps = 44;
    for (let i = 1; i <= steps; i++) {
      const a = a0 + ((a1 - a0) * i) / steps;
      push(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    }

    const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.05);
    return { curve, start: pts[0]!, end: pts[pts.length - 1]! };
  }, []);
}

function Mark({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const dot = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { curve, start, end } = useStrokeCurve();

  const tube = useMemo(
    () => new THREE.TubeGeometry(curve, 220, 0.3, 12, false),
    [curve],
  );

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const p = pointer.current ?? { x: 0, y: 0 };
    if (group.current) {
      const ty = p.x * 0.34;
      const tx = -p.y * 0.28;
      group.current.rotation.y += (ty - group.current.rotation.y) * (1 - Math.exp(-6 * dt));
      group.current.rotation.x += (tx - group.current.rotation.x) * (1 - Math.exp(-6 * dt));
    }
    if (spin.current) {
      const idle = Math.abs(p.x) + Math.abs(p.y) < 0.02 ? 1 : 0.18;
      spin.current.rotation.y += dt * 0.22 * idle;
    }
    if (dot.current) {
      const base = hovered ? 1.18 : 1;
      const pulse = hovered ? 1 + Math.sin(state.clock.elapsedTime * 4) * 0.07 : 1;
      const s = base * pulse;
      dot.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <group ref={spin}>
        {/* rear ring */}
        <mesh position={[px(25), py(41.5), -0.34]} castShadow>
          <torusGeometry args={[1.31, 0.3, 14, 72]} />
          <meshStandardMaterial color={NAVY} roughness={0.42} metalness={0.15} />
        </mesh>

        {/* Z / 3 stroke */}
        <mesh geometry={tube}>
          <meshStandardMaterial color={BLUE} roughness={0.3} metalness={0.2} />
        </mesh>
        {/* rounded stroke terminals */}
        <mesh position={start}>
          <sphereGeometry args={[0.3, 20, 16]} />
          <meshStandardMaterial color={BLUE} roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={end}>
          <sphereGeometry args={[0.3, 20, 16]} />
          <meshStandardMaterial color={BLUE} roughness={0.3} metalness={0.2} />
        </mesh>

        {/* gold terminus dot */}
        <mesh
          ref={dot}
          position={[px(40), py(13), 0.14]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.42, 32, 24]} />
          <meshStandardMaterial
            color={AMBER}
            roughness={0.22}
            metalness={0.3}
            emissive={AMBER}
            emissiveIntensity={hovered ? 0.55 : 0.12}
          />
        </mesh>
      </group>
    </group>
  );
}

type Burst = { id: number; dirs: THREE.Vector3[]; born: number };

function Particles({ bursts }: { bursts: React.RefObject<Burst[]> }) {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const list = bursts.current ?? [];
    const now = state.clock.elapsedTime;
    let i = 0;
    for (const b of list) {
      const age = now - b.born;
      for (const d of b.dirs) {
        const m = meshes.current[i++];
        if (!m) continue;
        const life = Math.max(0, 1 - age / 1.1);
        m.visible = life > 0;
        m.position.set(d.x * age * 3.2, d.y * age * 3.2, d.z * age * 3.2);
        m.scale.setScalar(0.07 * life);
      }
    }
    for (; i < meshes.current.length; i++) {
      const m = meshes.current[i];
      if (m) m.visible = false;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 72 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshes.current[i] = el;
          }}
          visible={false}
        >
          <sphereGeometry args={[1, 8, 6]} />
          <meshBasicMaterial color={BLUE} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function PointerRig({
  pointer,
  bursts,
}: {
  pointer: React.RefObject<{ x: number; y: number }>;
  bursts: React.RefObject<Burst[]>;
}) {
  const { clock } = useThree();
  return (
    <mesh
      position={[0, 0, -3]}
      onPointerMove={(e) => {
        pointer.current = { x: e.uv ? e.uv.x * 2 - 1 : 0, y: e.uv ? e.uv.y * 2 - 1 : 0 };
      }}
      onPointerOut={() => {
        pointer.current = { x: 0, y: 0 };
      }}
      onPointerDown={() => {
        const dirs = Array.from({ length: 24 }, () =>
          new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5,
          ).normalize(),
        );
        const next = [...(bursts.current ?? []), { id: Math.random(), dirs, born: clock.elapsedTime }];
        bursts.current = next.slice(-3);
      }}
      visible={false}
    >
      <planeGeometry args={[40, 40]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
}

export function InteractiveHeroLogo({ className }: { className?: string }) {
  const pointer = useRef({ x: 0, y: 0 });
  const bursts = useRef<Burst[]>([]);

  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-card/25 backdrop-blur-md ${className ?? ""}`}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 8]} intensity={1.6} />
        <directionalLight position={[-6, -2, 4]} intensity={0.5} color={BLUE} />
        <Environment>
          <Lightformer intensity={1.6} position={[0, 4, 3]} scale={[8, 8, 1]} />
          <Lightformer
            intensity={0.9}
            color="#85B7EB"
            position={[-5, 0, 2]}
            rotation-y={Math.PI / 2}
            scale={[12, 4, 1]}
          />
        </Environment>
        <PointerRig pointer={pointer} bursts={bursts} />
        <Mark pointer={pointer} />
        <Particles bursts={bursts} />
      </Canvas>
    </div>
  );
}

export default InteractiveHeroLogo;
