# Leo Wei -- Personal Portfolio

A gamified 3D portfolio website featuring an interactive developer workspace built with React and Three.js.

## Features

- **Scroll-driven 3D Dev Room** -- A modern low-poly workspace that stays pinned while scrolling flies the camera from a wide shot to the monitor, bookshelf and award shelf, with narration beats for each stop
- **Lenis smooth scrolling** -- Lenis is wired into the GSAP ticker so ScrollTrigger and all scroll animations share one clock
- **Scroll animations everywhere** -- Masked headline reveals, a drawing timeline, a pinned horizontal projects gallery with image parallax, stacking cards with count-up stats, and skill marquees that react to scroll velocity
- **Day/Night theme** -- Click the window (or use the toggle) to switch the whole site and the room between day and night
- **Interactive Objects** -- Growable plant, toggleable lamp, window that flips day and night, and section links hidden in the furniture
- **Built for phones too** -- Touch devices run the same scroll-driven room with portrait camera shots, a lighter render tier and an automatic quality fallback
- **Graceful fallbacks** -- Reduced-motion users and devices without WebGL get a static hero with a rotating-type portrait and no scroll hijacking

## Tech Stack

- React 19 + Vite 6
- Three.js + @react-three/fiber + drei + postprocessing (bloom)
- GSAP (ScrollTrigger, SplitText) + Lenis
- Tailwind CSS v4

## Getting Started

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run deploy
```

Deploys to GitHub Pages via the `gh-pages` branch.

## Live Site

[leow.ca](https://leow.ca)
