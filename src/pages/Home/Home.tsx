import { NavThreeDim } from "../../assets/NavThreeDim";
import { Canvas } from "@react-three/fiber";
import { DeformingMesh } from "../../assets/Deformation";

export const Home = () => {
  return (
    <>
      <div className="flex-col">
        {/* <Navbar /> */}
        <div className="mx-auto w-screen h-screen top-0 ">
          <Canvas>
            <DeformingMesh />
            <NavThreeDim />
          </Canvas>
        </div>
      </div>
    </>
  );
};
