import { ReactThreeFiber } from "@react-three/fiber";
import * as THREE from "three";
import Sphere from "./Sphere";

export const SphereScene = () => {
  return (
    <>
      <mesh>
        <Sphere />
      </mesh>
    </>
  );
};
