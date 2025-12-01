import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ANIMATION_DEFAULTS = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
    verySlow: 1.5,
  },
  ease: {
    smooth: 'power2.out',
    smoothInOut: 'power2.inOut',
    elastic: 'elastic.out(1, 0.5)',
    bounce: 'bounce.out',
    expo: 'expo.out',
    expoInOut: 'expo.inOut',
    back: 'back.out(1.7)',
    backInOut: 'back.inOut(1.7)',
    circ: 'circ.out',
    circInOut: 'circ.inOut',
    power3: 'power3.out',
    power3InOut: 'power3.inOut',
    power4: 'power4.out',
    power4InOut: 'power4.inOut',
  },
  stagger: {
    fast: 0.02,
    normal: 0.05,
    slow: 0.1,
  },
};

export function configureGSAP(): void {
  gsap.defaults({
    ease: ANIMATION_DEFAULTS.ease.power3,
    duration: ANIMATION_DEFAULTS.duration.normal,
  });

  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  });

  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  });

  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
    markers: false,
  });
}

export function createRevealAnimation(element: HTMLElement | string, options?: {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}): gsap.core.Tween {
  const defaults = {
    y: 60,
    opacity: 0,
    duration: ANIMATION_DEFAULTS.duration.normal,
    delay: 0,
    ease: ANIMATION_DEFAULTS.ease.power3,
    stagger: ANIMATION_DEFAULTS.stagger.normal,
  };

  const config = { ...defaults, ...options };

  return gsap.fromTo(
    element,
    { y: config.y, opacity: config.opacity },
    {
      y: 0,
      opacity: 1,
      duration: config.duration,
      delay: config.delay,
      ease: config.ease,
      stagger: config.stagger,
    }
  );
}

export function createFadeAnimation(element: HTMLElement | string, options?: {
  duration?: number;
  delay?: number;
  ease?: string;
}): gsap.core.Tween {
  const defaults = {
    duration: ANIMATION_DEFAULTS.duration.normal,
    delay: 0,
    ease: ANIMATION_DEFAULTS.ease.smooth,
  };

  const config = { ...defaults, ...options };

  return gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: config.duration,
      delay: config.delay,
      ease: config.ease,
    }
  );
}

export function createScaleAnimation(element: HTMLElement | string, options?: {
  scale?: number;
  duration?: number;
  delay?: number;
  ease?: string;
}): gsap.core.Tween {
  const defaults = {
    scale: 0.9,
    duration: ANIMATION_DEFAULTS.duration.normal,
    delay: 0,
    ease: ANIMATION_DEFAULTS.ease.back,
  };

  const config = { ...defaults, ...options };

  return gsap.fromTo(
    element,
    { scale: config.scale, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: config.duration,
      delay: config.delay,
      ease: config.ease,
    }
  );
}

export function createBlurAnimation(element: HTMLElement | string, options?: {
  blur?: number;
  y?: number;
  duration?: number;
  delay?: number;
  ease?: string;
}): gsap.core.Tween {
  const defaults = {
    blur: 10,
    y: 40,
    duration: ANIMATION_DEFAULTS.duration.slow,
    delay: 0,
    ease: ANIMATION_DEFAULTS.ease.power3InOut,
  };

  const config = { ...defaults, ...options };

  return gsap.fromTo(
    element,
    { 
      filter: `blur(${config.blur}px)`, 
      y: config.y, 
      opacity: 0 
    },
    {
      filter: 'blur(0px)',
      y: 0,
      opacity: 1,
      duration: config.duration,
      delay: config.delay,
      ease: config.ease,
    }
  );
}

export function createSlideAnimation(
  element: HTMLElement | string, 
  direction: 'left' | 'right' | 'up' | 'down',
  options?: {
    distance?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  }
): gsap.core.Tween {
  const defaults = {
    distance: 100,
    duration: ANIMATION_DEFAULTS.duration.normal,
    delay: 0,
    ease: ANIMATION_DEFAULTS.ease.power3,
  };

  const config = { ...defaults, ...options };

  const directionMap = {
    left: { x: -config.distance, y: 0 },
    right: { x: config.distance, y: 0 },
    up: { x: 0, y: -config.distance },
    down: { x: 0, y: config.distance },
  };

  const { x, y } = directionMap[direction];

  return gsap.fromTo(
    element,
    { x, y, opacity: 0 },
    {
      x: 0,
      y: 0,
      opacity: 1,
      duration: config.duration,
      delay: config.delay,
      ease: config.ease,
    }
  );
}

export function createStaggeredReveal(elements: HTMLElement[] | string, options?: {
  y?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  delay?: number;
}): gsap.core.Tween {
  const defaults = {
    y: 80,
    duration: ANIMATION_DEFAULTS.duration.slow,
    stagger: ANIMATION_DEFAULTS.stagger.normal,
    ease: ANIMATION_DEFAULTS.ease.power3,
    delay: 0,
  };

  const config = { ...defaults, ...options };

  return gsap.fromTo(
    elements,
    { y: config.y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: config.duration,
      stagger: config.stagger,
      ease: config.ease,
      delay: config.delay,
    }
  );
}

export function createScrollTriggeredAnimation(
  element: HTMLElement | string,
  animation: gsap.TweenVars,
  triggerOptions?: ScrollTrigger.Vars
): gsap.core.Tween {
  const defaultTrigger: ScrollTrigger.Vars = {
    trigger: element as gsap.DOMTarget,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  };

  return gsap.to(element, {
    ...animation,
    scrollTrigger: { ...defaultTrigger, ...triggerOptions },
  });
}

export function killAllAnimations(): void {
  gsap.killTweensOf('*');
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}
