export const ACHIEVEMENTS = {
  first_click: {
    id: "first_click",
    name: "Curious Mind",
    icon: "\ud83d\udd0d",
    description: "Clicked your first object in the room",
    points: 10,
  },
  all_objects: {
    id: "all_objects",
    name: "Explorer",
    icon: "\ud83d\uddfa\ufe0f",
    description: "Interacted with every object in the room",
    points: 50,
  },
  night_owl: {
    id: "night_owl",
    name: "Night Owl",
    icon: "\ud83c\udf19",
    description: "Switched the room to night mode",
    points: 15,
  },
  mood_lighting: {
    id: "mood_lighting",
    name: "Mood Lighting",
    icon: "\ud83d\udca1",
    description: "Toggled the desk lamp",
    points: 10,
  },
  caffeine_boost: {
    id: "caffeine_boost",
    name: "Caffeine Boost",
    icon: "\u2615",
    description: "Found the coffee mug",
    points: 10,
  },
  green_thumb: {
    id: "green_thumb",
    name: "Green Thumb",
    icon: "\ud83c\udf31",
    description: "Grew the desk plant to full size",
    points: 25,
  },
  bookworm: {
    id: "bookworm",
    name: "Bookworm",
    icon: "\ud83d\udcda",
    description: "Hovered over 10 different skill books",
    points: 20,
  },
  deep_diver: {
    id: "deep_diver",
    name: "Deep Diver",
    icon: "\ud83e\udd3f",
    description: "Scrolled through every portfolio section",
    points: 25,
  },
  speed_reader: {
    id: "speed_reader",
    name: "Speed Reader",
    icon: "\u26a1",
    description: "Visited all sections within 60 seconds",
    points: 40,
  },
  konami: {
    id: "konami",
    name: "Classic Gamer",
    icon: "\ud83c\udfae",
    description: "Entered the Konami code",
    points: 50,
  },
};

export const TOTAL_ACHIEVEMENTS = Object.keys(ACHIEVEMENTS).length;
export const TOTAL_POINTS = Object.values(ACHIEVEMENTS).reduce(
  (sum, a) => sum + a.points,
  0
);

// Objects that count toward the "all_objects" achievement
export const INTERACTIVE_OBJECTS = [
  "projects",
  "skills",
  "extracurricular",
  "about",
  "window",
  "lamp",
  "coffee",
  "plant",
];
