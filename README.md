# Gamified 3D Portfolio -- Implementation Tracker

## Overview
Transform the portfolio into a gamified experience with a 3D developer workspace hero section and an achievement system with easter eggs.

**Tech Stack:** React 19 + Vite 6 + Tailwind CSS v4 + Three.js + @react-three/fiber + @react-three/drei

---

## Phase 0: Decompose the Monolith [DONE]
Break the 1031-line `src/App.jsx` into modular components.

### What was done:
- **Data files** extracted to `src/data/`:
  - `experiences.js`, `projects.js`, `skills.js`, `extracurriculars.js`, `academics.js`
- **Components** extracted to `src/components/`:
  - `Card.jsx` -- Reusable card wrapper with hover effects
  - `NavSidebar.jsx` -- Fixed left nav with active section highlighting
- **Section components** in `src/components/sections/`:
  - `AboutFallback.jsx` -- Current hero (kept as mobile/fallback)
  - `ExperienceSection.jsx`, `ProjectsSection.jsx`, `ExtracurricularSection.jsx`
  - `AcademicsSection.jsx`, `SkillsSection.jsx`, `Footer.jsx`
- **Hooks** in `src/hooks/`:
  - `useScrollSection.js` -- Scroll detection + smooth navigation
- **App.jsx** reduced to composition root

---

## Phase 1-3: 3D Room -- "The Dev Workspace" [DONE]
A stylized low-poly developer office built entirely from Drei/Three.js primitives.

### What was built:
- **`src/components/three/RoomShell.jsx`** -- Floor (wood), back wall, baseboard, rug
- **`src/components/three/DevRoom.jsx`** -- Canvas orchestrator with OrbitControls, lighting, Environment, ContactShadows, Sparkles particles
- **`src/components/three/RoomObject.jsx`** -- Reusable hover/click wrapper with Html tooltip labels and subtle float animation
- **`src/components/three/Desk.jsx`** -- Desk surface, legs, keyboard, mouse, mousepad, name plate ("Leo Wei")
- **`src/components/three/Monitor.jsx`** -- Monitor with code displayed on screen (syntax-highlighted), screen glow, stand
- **`src/components/three/Bookshelf.jsx`** -- 4-shelf bookcase with color-coded books (blue=Languages, purple=AI/ML, green=Cloud, amber=Web)
- **`src/components/three/AwardShelf.jsx`** -- Shelf with gold/silver trophies and picture frame
- **`src/components/three/WindowView.jsx`** -- Larger window with day/night toggle and distant scenery
- **`src/components/three/CoffeeMug.jsx`** -- Mug with animated steam particles
- **`src/components/three/DeskLamp.jsx`** -- Toggleable lamp with SpotLight
- **`src/components/three/Plant.jsx`** -- Potted plant that grows on click (up to 5x, then blooms a flower)
- **`src/components/sections/HeroScene.jsx`** -- Full-viewport wrapper with overlay UI, social links, scroll indicator, explore prompt
- **`src/hooks/useDeviceCapability.js`** -- WebGL/mobile detection for fallback

### Camera controls:
- Auto-rotate (stops on first interaction)
- Clamped angles (cannot look under floor or spin fully around)
- Zoom disabled (wheel scrolls the page)
- Damping enabled for smooth feel

### Object -> Section mapping:
| Object | Clicks to | Achievement |
|--------|-----------|-------------|
| Monitor | Projects | -- |
| Bookshelf | Skills | "Bookworm" (hover 10 books) |
| Award Shelf | Extracurricular | -- |
| Name Plate | About | -- |
| Window | -- (day/night toggle) | "Night Owl" |
| Desk Lamp | -- (light toggle) | "Mood Lighting" |
| Coffee Mug | -- | "Caffeine Boost" |
| Plant | -- (grows) | "Green Thumb" (5 clicks) |

---

## Phase 4-6: Achievement System + Easter Eggs [DONE]
Full gamification layer with 10 achievements and 4 easter eggs.

### What was built:
- **`src/data/achievements.js`** -- Achievement definitions with icons, descriptions, points
- **`src/utils/storage.js`** -- localStorage get/set/clear helpers
- **`src/context/AchievementContext.jsx`** -- React Context managing all state (unlocked IDs, interaction tracking, counters)
- **`src/hooks/useAchievements.js`** -- Convenience hook
- **`src/components/gamification/AchievementToast.jsx`** -- Gold slide-in notification (top-right, auto-dismiss 4s)
- **`src/components/gamification/AchievementBadge.jsx`** -- Individual badge (colored if unlocked, grayed "???" if locked)
- **`src/components/gamification/AchievementPanel.jsx`** -- Drawer panel (trophy button bottom-right, shows all badges, progress bar, reset button)
- **`src/components/gamification/ProgressBar.jsx`** -- Thin gradient bar at top of hero section

### All 10 achievements:
| ID | Name | Icon | Trigger | Points |
|----|------|------|---------|--------|
| `first_click` | Curious Mind | magnifier | Click any room object | 10 |
| `all_objects` | Explorer | map | Interact with every object in the room | 50 |
| `night_owl` | Night Owl | moon | Toggle window to night | 15 |
| `mood_lighting` | Mood Lighting | lightbulb | Toggle desk lamp | 10 |
| `caffeine_boost` | Caffeine Boost | coffee | Click coffee mug | 10 |
| `green_thumb` | Green Thumb | seedling | Click plant 5x | 25 |
| `bookworm` | Bookworm | books | Hover 10 different skill books | 20 |
| `deep_diver` | Deep Diver | diver | Scroll all sections | 25 |
| `speed_reader` | Speed Reader | lightning | All sections in 60s | 40 |
| `konami` | Classic Gamer | gamepad | Up Up Down Down Left Right Left Right B A | 50 |

### Easter eggs implemented:
1. **Night Mode** -- Window toggles day/night, moon + stars appear
2. **Plant Growth** -- 5 clicks grows plant, 5th click sprouts pink flower
3. **Konami Code** -- Keyboard sequence triggers achievement
4. **Lamp Toggle** -- SpotLight on/off, room goes moody

### Wiring:
- `App.jsx` (`AppContent`) handles all room interactions via `handleRoomInteraction`
- Section visits tracked via `useScrollSection` + `trackSectionVisit` on active section change
- Book hover tracking wired via `onBookHover` in Bookshelf component
- Konami code listener in App's useEffect

---

## Remaining Work

### Polish & Optimization
- [ ] Test with `npm run dev` and verify all interactions work
- [ ] Tune 3D object positions and sizes for best visual composition
- [ ] Adjust OrbitControls angle limits for best viewing experience
- [ ] Add `prefers-reduced-motion` check to disable auto-rotate
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Consider code-splitting Three.js with dynamic import to reduce initial bundle

### Optional Enhancements
- [ ] Add sound effects for achievements (subtle "ding")
- [ ] Add confetti effect for Konami code achievement
- [ ] Improve book hover to show individual skill names in tooltips
- [ ] Add loading screen while 3D scene initializes

---

## File Structure (Current)
```
src/
  App.jsx                              (composition root with AchievementProvider)
  App.css                              (@import "tailwindcss")
  main.jsx                             (entry point)
  data/
    achievements.js                    (achievement definitions)
    experiences.js                     (work experience data)
    projects.js                        (project data + image imports)
    skills.js                          (skill categories)
    extracurriculars.js                (activities data)
    academics.js                       (education data)
  components/
    Card.jsx                           (reusable hover card)
    NavSidebar.jsx                     (fixed left navigation)
    sections/
      HeroScene.jsx                    (3D hero with fallback + overlay)
      AboutFallback.jsx                (original hero for mobile)
      ExperienceSection.jsx
      ProjectsSection.jsx
      ExtracurricularSection.jsx
      AcademicsSection.jsx
      SkillsSection.jsx
      Footer.jsx
    three/
      DevRoom.jsx                      (Canvas + lights + all objects)
      RoomShell.jsx                    (floor + back wall)
      RoomObject.jsx                   (reusable hover/click wrapper)
      Desk.jsx                         (desk + accessories)
      Monitor.jsx                      (screen with code text)
      Bookshelf.jsx                    (color-coded skill books)
      AwardShelf.jsx                   (trophies + picture frame)
      WindowView.jsx                   (day/night window + scenery)
      CoffeeMug.jsx                    (mug + steam)
      DeskLamp.jsx                     (toggleable lamp)
      Plant.jsx                        (growable plant)
    gamification/
      AchievementToast.jsx             (slide-in notification)
      AchievementBadge.jsx             (individual badge)
      AchievementPanel.jsx             (full drawer panel)
      ProgressBar.jsx                  (thin bar on hero)
  hooks/
    useScrollSection.js                (scroll detection)
    useAchievements.js                 (achievement context hook)
    useDeviceCapability.js             (WebGL/mobile detection)
  context/
    AchievementContext.jsx             (achievement state management)
  utils/
    storage.js                         (localStorage helpers)
```
