
import React, { useMemo } from 'react';
import * as THREE from 'three';
import GlassBall from './GlassBall';
import { BALL_COLORS } from '../constants';
// Import types to ensure global JSX augmentation for Three.js elements is active
import '../types';

interface TreeProps {
  onBallClick: () => void;
}

const Tree: React.FC<TreeProps> = ({ onBallClick }) => {
  const panels = useMemo(() => {
    return [0, 1, 2, 3].map((i) => {
      const angle = (i * Math.PI) / 2;
      return {
        rotation: [0, angle, 0] as [number, number, number],
      };
    });
  }, []);

  const balls = useMemo(() => {
    const temp = [];
    const ballCount = 35;
    for (let i = 0; i < ballCount; i++) {
      const height = Math.random() * 8;
      const maxWidthAtHeight = (8 - height) * 0.45;
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * maxWidthAtHeight;
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      temp.push({
        position: [x, height - 2, z] as [number, number, number],
        color: BALL_COLORS[Math.floor(Math.random() * BALL_COLORS.length)],
      });
    }
    return temp;
  }, []);

  return (
    /* All Three.js intrinsic elements like 'group', 'mesh', and 'planeGeometry' 
       are now recognized via the augmentation defined in types.ts */
    <group>
      {panels.map((p, i) => (
        <mesh key={i} rotation={p.rotation} position={[0, 2, 0]}>
          <planeGeometry args={[6, 8]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.1}
            transmission={0.9}
            roughness={0.05}
            metalness={0.1}
            ior={1.47}
            thickness={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.05, 0.1, 8.5, 8]} />
        <meshBasicMaterial color="#ffd700" />
      </mesh>

      {balls.map((b, i) => (
        <GlassBall
          key={i}
          position={b.position}
          color={b.color}
          onClick={onBallClick}
        />
      ))}

      <mesh position={[0, 6.2, 0]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2} />
        <pointLight color="#ffd700" intensity={5} distance={10} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} metalness={0} />
      </mesh>
    </group>
  );
};

export default Tree;
