import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): Lenis {
  if (lenisInstance) {
    return lenisInstance;
  }

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function pauseScroll(): void {
  lenisInstance?.stop();
}

export function resumeScroll(): void {
  lenisInstance?.start();
}

export function scrollTo(target: string | number | HTMLElement, options?: {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
  immediate?: boolean;
  lock?: boolean;
  force?: boolean;
  onComplete?: () => void;
}): void {
  lenisInstance?.scrollTo(target, options);
}

export function destroySmoothScroll(): void {
  if (lenisInstance) {
    gsap.ticker.remove((time) => {
      lenisInstance?.raf(time * 1000);
    });
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export default {
  init: initSmoothScroll,
  get: getLenis,
  pause: pauseScroll,
  resume: resumeScroll,
  scrollTo,
  destroy: destroySmoothScroll,
};
