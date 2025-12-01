# Moncy Portfolio - Replit Setup

## Overview
This is a React + TypeScript portfolio website featuring 3D animations using Three.js, GSAP scroll animations, and interactive character models. The project has been successfully configured to run in the Replit environment.

## Project Structure
- **Frontend**: React 18 + TypeScript + Vite
- **3D Graphics**: Three.js with React Three Fiber
- **Animations**: GSAP (free version) with custom text splitting utility
- **Build Tool**: Vite 5.4.21
- **Dev Server**: Port 5000 (configured for Replit proxy)

## Recent Changes (December 1, 2025)

### GSAP Animation Combo Tools Implementation
Implemented a comprehensive animation system with the following GSAP combo tools:

1. **Lenis Smooth Scroll + GSAP ScrollTrigger**
   - `src/components/utils/SmoothScroll.ts` - Smooth scroll integration
   - Seamless scrolling experience with proper GSAP ticker integration
   - Scroll-triggered animations throughout the site

2. **Enhanced Text Animations**
   - `src/components/utils/EnhancedTextAnimation.ts` - Advanced text effects
   - Character, word, and line splitting with reveal animations
   - Typewriter, glitch, and wave text effects

3. **Magnetic & Tilt Effects**
   - `src/components/utils/MagneticEffect.ts` - Interactive element effects
   - Magnetic hover effects for buttons and links
   - 3D tilt effects for cards

4. **Enhanced Cursor**
   - `src/components/EnhancedCursor.tsx` - Smooth GSAP-powered cursor
   - Responsive to interactive elements with scale and morph effects
   - GPU-accelerated for smooth performance

5. **Page Transitions**
   - `src/components/utils/PageTransitions.ts` - Transition utilities
   - Fade, slide, curtain, and reveal transitions
   - Section-based scroll animations

6. **Animation Hooks**
   - `src/hooks/useAnimations.ts` - React hooks for easy integration
   - useScrollAnimation, useRevealAnimation, useParallax, useFadeIn
   - useStaggerAnimation for staggered child reveals

7. **Performance Optimizations**
   - CSS utility classes for will-change and GPU acceleration
   - Proper cleanup and memory management
   - Reduced motion support for accessibility

### Loading Screen Fix
1. **Added Fallback Timer**: 
   - 8-second fallback timer in Loading.tsx prevents infinite loading
   - Timer fires once on mount and forces completion if 3D models fail to load
   - Protected by ref flag to prevent duplicate triggers

2. **WebGL Error Handling**:
   - Scene.tsx now catches WebGL initialization failures
   - Sets loading to 100% when WebGL fails gracefully
   - Character model load errors are properly caught

3. **Error Boundaries**:
   - Created ErrorBoundary.tsx component for React error catching
   - Wrapped CharacterModel in App.tsx with ErrorBoundary
   - Wrapped TechStack in MainContainer.tsx with ErrorBoundary
   - Added try-catch blocks in initialFX.ts for animation errors

### GitHub Import Setup
1. **Removed Premium GSAP Dependencies**: 
   - Removed `@gsap/react`, `gsap-trial` packages that required authentication
   - Created custom `TextSplitter` utility to replace GSAP's SplitText plugin
   - Replaced `useGSAP` hook with React's `useLayoutEffect` + `gsap.context`
   - Replaced `ScrollSmoother` with native smooth scrolling + ScrollTrigger

2. **Vite Configuration for Replit**:
   - Configured dev server to bind to `0.0.0.0:5000`
   - Added allowed hosts for Replit domains (`.replit.dev`, `.repl.co`)
   - Enabled strict port enforcement

3. **Deployment Configuration**:
   - Type: Static site
   - Build command: `npm run build`
   - Output directory: `dist`

## Key Files Modified
- `package.json` - Removed premium GSAP dependencies
- `vite.config.ts` - Added Replit-specific server configuration
- `src/components/utils/textSplitter.ts` - New custom text splitting utility
- `src/components/Navbar.tsx` - Replaced ScrollSmoother with native scrolling
- `src/components/Work.tsx` - Replaced useGSAP with useLayoutEffect
- `src/components/utils/initialFX.ts` - Updated to use TextSplitter
- `src/components/utils/splitText.ts` - Updated to use TextSplitter

## Development

### Running Locally
```bash
npm install
npm run dev
```
Server runs at: http://localhost:5000

### Building for Production
```bash
npm run build
```

### Publishing
Click the "Publish" button in Replit to deploy the static site.

## Tech Stack
- **React** 18.3.1
- **TypeScript** 5.5.3
- **Vite** 5.4.1
- **Three.js** 0.168.0
- **GSAP** 3.12.7 (free version)
- **Lenis** (smooth scroll library)
- **React Three Fiber** 8.17.10
- **React Three Drei** 9.120.4

## Known Issues
- The original project used GSAP Club plugins which are not available in this version
- Custom TextSplitter provides basic functionality but may not have all features of the original SplitText plugin
- WebGL context may fail in certain screenshot/testing environments (expected)

## Notes
- All animations use the free version of GSAP
- The portfolio is fully functional with custom implementations replacing premium plugins
- Deployment is configured for static hosting (no backend required)
