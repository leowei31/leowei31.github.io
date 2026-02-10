import React, { useMemo } from "react";
import { Text } from "@react-three/drei";
import RoomObject from "./RoomObject";
import { skills } from "../../data/skills";

const shelfColors = ["#3b82f6", "#8b5cf6", "#22c55e", "#f59e0b"];
const shelfCaps = [6, 5, 4, 4];

const Bookshelf = ({ onClick, onBookHover }) => {
  const bookGroups = useMemo(
    () =>
      skills.slice(0, 4).map((group, index) => ({
        color: shelfColors[index],
        label: group.category,
        books: group.items.slice(0, shelfCaps[index]),
      })),
    []
  );

  const bookSizes = useMemo(
    () =>
      bookGroups.map((group) =>
        group.books.map((_, index) => {
          const width = 0.06 + ((index * 13) % 4) * 0.0075;
          const height = 0.26 + ((index * 17) % 5) * 0.03;
          return { width, height };
        })
      ),
    [bookGroups]
  );

  return (
    <RoomObject onClick={onClick} label="View Skills" baseY={0} hoverLift={0}>
      <group position={[-3.2, -0.25, -2.7]}>
        {/* Shelf frame - back */}
        <mesh position={[0, 2, -0.2]} castShadow>
          <boxGeometry args={[1.4, 3.5, 0.05]} />
          <meshStandardMaterial color="#654321" roughness={0.7} />
        </mesh>

        {/* Shelf frame - sides */}
        <mesh position={[-0.68, 2, 0]} castShadow>
          <boxGeometry args={[0.05, 3.5, 0.4]} />
          <meshStandardMaterial color="#5a3a1a" roughness={0.7} />
        </mesh>
        <mesh position={[0.68, 2, 0]} castShadow>
          <boxGeometry args={[0.05, 3.5, 0.4]} />
          <meshStandardMaterial color="#5a3a1a" roughness={0.7} />
        </mesh>

        {/* Shelves (4 levels) */}
        {[0.5, 1.3, 2.1, 2.9].map((y, shelfIndex) => (
          <group key={shelfIndex}>
            {/* Shelf plank */}
            <mesh position={[0, y, 0]}>
              <boxGeometry args={[1.3, 0.04, 0.38]} />
              <meshStandardMaterial color="#6b4226" roughness={0.6} />
            </mesh>

            {/* Books on this shelf */}
            {bookGroups[shelfIndex] && (
              <group>
                {bookGroups[shelfIndex].books.map((bookName, bookIndex) => {
                  const { width: bookWidth, height: bookHeight } =
                    bookSizes[shelfIndex][bookIndex];
                  const xOffset = -0.5 + bookIndex * 0.18;
                  return (
                    <group
                      key={bookIndex}
                      onPointerOver={(e) => {
                        e.stopPropagation();
                        onBookHover?.(bookName);
                      }}
                    >
                      <mesh
                        position={[xOffset, y + 0.02 + bookHeight / 2, 0]}
                        castShadow
                      >
                        <boxGeometry args={[bookWidth, bookHeight, 0.2]} />
                        <meshStandardMaterial
                          color={bookGroups[shelfIndex].color}
                          roughness={0.8}
                        />
                      </mesh>
                    </group>
                  );
                })}

                {/* Category label */}
                <Text
                  position={[0, y + 0.45, 0.15]}
                  fontSize={0.06}
                  color="#fff"
                  anchorX="center"
                  anchorY="middle"
                  font={undefined}
                >
                  {bookGroups[shelfIndex].label}
                </Text>
              </group>
            )}
          </group>
        ))}
      </group>
    </RoomObject>
  );
};

export default Bookshelf;
