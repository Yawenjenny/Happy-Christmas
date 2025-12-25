
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// Import types to ensure global JSX augmentation for Three.js elements is active
import '../types';

const Snow: React.FC = () => {
  const count = 2000;
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 40;
      temp[i * 3 + 1] = Math.random() * 40;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 1] -= 0.05 + Math.random() * 0.05;
      positions[i3] += Math.sin(time + positions[i3 + 2]) * 0.01;

      if (positions[i3 + 1] < -5) {
        positions[i3 + 1] = 30;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    /* The 'points', 'bufferGeometry', 'bufferAttribute', and 'pointsMaterial' elements 
       are now correctly typed thanks to the JSX augmentation in types.ts */
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default Snow;
