
import { ThreeElements } from '@react-three/fiber';

// Fix: Augment the global JSX and React namespaces to include Three.js intrinsic elements.
// By providing these in the global scope and using an index signature, we ensure that
// both Three.js tags (like <mesh>) and standard HTML tags (like <div>) are correctly
// recognized by the TypeScript compiler across various configurations.
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {
      [elemName: string]: any;
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {
        [elemName: string]: any;
      }
    }
  }
}

export interface Fortune {
  text: string;
  author?: string;
}

export interface BallProps {
  position: [number, number, number];
  color: string;
  onClick: () => void;
}
