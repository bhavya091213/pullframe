import { Canvas } from "@react-three/fiber";
import { SphereScene } from "../../assets/SphereScene";
import { EffectComposer } from "@react-three/postprocessing";
import { Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Html } from "@react-three/drei";
import { Button } from "../../assets/Button";

export const Roadmap = () => {
  return (
    <div className="bg-white-2 h-screen w-screen">
      <div className="content-start pl-20 pt-20 absolute">
        <div className="flex-col p-10">
          <h1 className="text-8xl text-black font-display">Roadmap</h1>

          <RoadmapCard timeline="Q2 2025" event="EXTRACTION BETA RELEASE" />
          <RoadmapCard timeline="Q2 2025" event="API BETA RELEASE" />
          <RoadmapCard timeline="Q4 2025" event="STABILIZATION BETA RELEASE" />
          <RoadmapCard timeline="Q1 2026" event="PULLFRAME RELEASE" />
        </div>
      </div>
      <div className="absolute h-screen w-100 bg-gradient-to-r from-tertiary opacity-50 to-transparent"></div>

      <Canvas>
        <NavRoad />
        <mesh>
          {/* Blob Text */}
          <Html position={[0, 0, 0]}>
            <div className="text-8xl font-bold w-3xl font-display text-black justify-center">
              <h1>SEE BEYOND</h1>
              <span className="text-9xl">
                THE <span className="text-primary">NAKED EYE</span>
              </span>
            </div>
            <div className="text-3xl font-bold w-3xl font-display text-black justify-center">
              <h1>Catch every blink, twitch, and tiny tremor</h1>
              <h1>our motion extraction algorithm misses nothing</h1>
            </div>
          </Html>
        </mesh>
        <mesh scale={1.3}>
          <SphereScene />
        </mesh>

        <EffectComposer>
          <Noise opacity={0.4} blendFunction={BlendFunction.HARD_LIGHT} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

interface RoadmapCardProps {
  timeline: string;
  event: string;
}

export const RoadmapCard = ({ timeline, event }: RoadmapCardProps) => {
  return (
    <>
      <div className="p-2">
        <h2 className="text-3xl text-black font-display">{timeline}:</h2>
        <h2 className="text-2xl text-black font-body">- {event}</h2>
      </div>
    </>
  );
};

export const NavRoad = () => {
  return (
    <>
      <mesh position={[2.6, 2.6, 0]}>
        <Button
          text="Contact"
          position={[-2, 0, 0.5]}
          link="/contact"
          size={0.4}
        />
        <Button text="Home" position={[0, 0, 0.5]} link="/" size={0.4} />
        <Button
          text="Pricing"
          position={[2, 0, 0.5]}
          link="/contact"
          size={0.4}
        />
      </mesh>
    </>
  );
};
