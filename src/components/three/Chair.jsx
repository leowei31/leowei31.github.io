import { RoundedBox } from "@react-three/drei";

const FABRIC = "#363a44";
const STEEL = "#1b1c20";

/** Modern task chair, pulled slightly away from the desk. Purely decorative. */
const Chair = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    {/* Star base */}
    {[0, 1, 2, 3, 4].map((i) => (
      <group key={i} rotation={[0, (i / 5) * Math.PI * 2, 0]}>
        <mesh position={[0.2, 0.09, 0]} castShadow>
          <boxGeometry args={[0.4, 0.035, 0.05]} />
          <meshStandardMaterial color={STEEL} roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0.38, 0.045, 0]} castShadow>
          <sphereGeometry args={[0.035, 12, 10]} />
          <meshStandardMaterial color="#0c0c0e" roughness={0.6} />
        </mesh>
      </group>
    ))}
    {/* Gas lift */}
    <mesh position={[0, 0.3, 0]} castShadow>
      <cylinderGeometry args={[0.03, 0.04, 0.38, 12]} />
      <meshStandardMaterial color={STEEL} roughness={0.35} metalness={0.7} />
    </mesh>
    {/* Seat */}
    <RoundedBox args={[0.58, 0.1, 0.56]} radius={0.05} smoothness={4} position={[0, 0.53, 0]} castShadow receiveShadow>
      <meshStandardMaterial color={FABRIC} roughness={0.9} />
    </RoundedBox>
    {/* Back */}
    <group position={[0, 0.58, -0.3]} rotation={[-0.12, 0, 0]}>
      <RoundedBox args={[0.54, 0.66, 0.07]} radius={0.035} smoothness={4} position={[0, 0.4, 0]} castShadow>
        <meshStandardMaterial color={FABRIC} roughness={0.9} />
      </RoundedBox>
      <RoundedBox args={[0.3, 0.12, 0.085]} radius={0.04} smoothness={4} position={[0, 0.78, 0.005]} castShadow>
        <meshStandardMaterial color="#ff6b3d" roughness={0.8} />
      </RoundedBox>
      <mesh position={[0, 0.1, -0.02]} castShadow>
        <boxGeometry args={[0.05, 0.2, 0.05]} />
        <meshStandardMaterial color={STEEL} roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  </group>
);

export default Chair;
