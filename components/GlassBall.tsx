
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { BallProps } from '../types';

const GlassBall: React.FC<BallProps> = ({ position, color, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current && hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
    } else if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    /* The mesh, sphereGeometry, meshPhysicalMaterial, and standard 'div' tags 
       are now correctly recognized due to the improved JSX augmentation in types.ts */
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          transmission={0.9}
          roughness={0.1}
          thickness={0.2}
          ior={1.5}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.2}
        />
        {hovered && (
          <Html distanceFactor={10}>
            <div className="bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none">
              Open Fortune
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  );
};

export default GlassBall;
