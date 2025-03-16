import { Button } from "./Button";

export const NavThreeDim = () => {
  return (
    <>
      <mesh position={[0, -2.9, 0]}>
        <Button
          text="Contact"
          position={[-3, 0, 0.5]}
          link="/contact"
          size={0.4}
        />
        <Button
          text="Roadmap"
          position={[0, 0, 0.5]}
          link="/roadmap"
          size={0.4}
        />
        <Button
          text="Pricing"
          position={[3, 0, 0.5]}
          link="/contact"
          size={0.4}
        />
      </mesh>
    </>
  );
};

export default NavThreeDim;
