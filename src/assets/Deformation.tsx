import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Text } from "@react-three/drei";
import bebes from "/fonts/BebasNeue-Regular.ttf?url";
import american from "/fonts/AmericanCaptain-MdEY.otf?url";
import { Link, Navigate, useNavigate } from "react-router";

const WaveShaderMaterial = shaderMaterial(
  { time: 0 },
  // Vertex Shader
  `
    uniform float time;
    varying vec2 vUv;
  
    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(pos.x * 5.0 + time) * 0.5; // Wave effect
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
    `,
  // Fragment Shader
  `
    uniform float time;
    varying vec2 vUv;
  
    void main() {
      float wave = sin(vUv.y * 10.0 + time) * 0.5 + 0.5;
      
      vec3 primary = vec3(213.0/255.0, 41.0/255.0, 65.0/255.0); // #D52941
      vec3 secondary = vec3(153.0/255.0, 13.0/255.0, 53.0/255.0); // #990D35
      vec3 tertiary = vec3(252.0/255.0, 213.0/255.0, 129.0/255.0); // #FCD581
      vec3 white2 = vec3(255.0/255.0, 248.0/255.0, 232.0/255.0); // #FFF8E8
  
      vec3 gradient = mix(primary, secondary, wave);
      gradient = mix(gradient, tertiary, sin(vUv.x * 3.0 + time * 0.5) * 0.5 + 0.5);
      gradient = mix(gradient, white2, cos(vUv.y * 2.0 + time * 0.7) * 0.5 + 0.5);
  
      gl_FragColor = vec4(gradient, 1.0);
    }
    `
);

extend({ WaveShaderMaterial });

export function DeformingMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  // GSAP animation for slow movement
  useGSAP(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        y: 1, // Move up slowly
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[30, 15, 5, 4]} />
        {/* @ts-ignore */}
        <waveShaderMaterial ref={shaderRef} />
      </mesh>

      <mesh position={[0, 2.1, 0.5]}>
        <Text font={bebes} fontSize={0.2} anchorX={"center"}>
          PULLFRAME by Bhavya Patel
          <meshStandardMaterial
            color="white"
            transparent={true}
            opacity={0.9}
          />
        </Text>
      </mesh>

      <mesh position={[0, 1.7, 0]}>
        <Text font={bebes} fontSize={1} anchorX={"center"}>
          REVEAL MOTION
          <meshStandardMaterial
            color="white"
            transparent={true}
            opacity={0.9}
          />
        </Text>
      </mesh>
      <mesh position={[0, 0.8, 0.7]}>
        <Text font={bebes} fontSize={0.4} anchorX={"center"}>
          ADVANCED MOTION
          <meshStandardMaterial
            color="white"
            transparent={true}
            opacity={0.9}
          />
        </Text>
      </mesh>
      <mesh position={[0, 0.4, 0.7]}>
        <Text font={bebes} fontSize={0.4} anchorX={"center"}>
          ANALYSIS AT YOUR FINGER TIPS
          <meshStandardMaterial
            color="white"
            transparent={true}
            opacity={0.9}
          />
        </Text>
      </mesh>

      <Button
        text="Get Started"
        position={[0, -0.3, 0.5]}
        link="/login"
        size={0.4}
      />
      <Button
        text="View Demo"
        position={[0, -0.9, 0.5]}
        link="/demo"
        size={0.4}
      />

      <pointLight position={[0, 0, 10]} intensity={10000} />

      <EffectComposer>
        <Noise opacity={0.4} blendFunction={BlendFunction.HARD_LIGHT} />
      </EffectComposer>
    </>
  );
}

interface ButtonProps {
  text: string;
  link: string;
  position: number[];
  size: number;
}
export const Button = ({ text, link, position, size }: ButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
    console.log("Button clicked!");
  };
  return (
    <>
      <mesh
        position={[position[0], position[1], position[2]]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        <Text font={american} fontSize={size} anchorX={"center"}>
          {text}
          <meshStandardMaterial
            color={hovered ? "black" : "white"}
            transparent={true}
            opacity={1}
          />
        </Text>
      </mesh>
    </>
  );
};
