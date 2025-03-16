import { Text } from "@react-three/drei";
import american from "/fonts/AmericanCaptain-MdEY.otf?url";
import { useNavigate } from "react-router";
import { useState } from "react";
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
