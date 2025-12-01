import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll, destroySmoothScroll, getLenis } from '../components/utils/SmoothScroll';
import { configureGSAP, refreshScrollTrigger } from '../components/utils/AnimationConfig';
import { initMagneticButtons, initTiltCards } from '../components/utils/MagneticEffect';

gsap.registerPlugin(ScrollTrigger);

export function useAnimations() {
  const cleanupRef = useRef<(() => void)[]>([]);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    configureGSAP();

    initSmoothScroll();

    const magneticCleanup = initMagneticButtons();
    const tiltCleanup = initTiltCards();
    
    cleanupRef.current.push(magneticCleanup, tiltCleanup);

    const resizeHandler = () => {
      refreshScrollTrigger();
    };

    window.addEventListener('resize', resizeHandler);

    setTimeout(() => {
      refreshScrollTrigger();
    }, 100);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      cleanupRef.current.forEach(cleanup => cleanup());
      destroySmoothScroll();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return {
    getLenis,
    refreshScrollTrigger,
  };
}

export function useScrollAnimation(
  ref: React.RefObject<HTMLElement>,
  animation: gsap.TweenVars,
  options?: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
  }
) {
  useEffect(() => {
    if (!ref.current) return;

    const defaults = {
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: false,
      markers: false,
    };

    const config = { ...defaults, ...options };

    const tween = gsap.to(ref.current, {
      ...animation,
      scrollTrigger: {
        trigger: ref.current,
        start: config.start,
        end: config.end,
        scrub: config.scrub,
        markers: config.markers,
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      tween.kill();
    };
  }, [ref, animation, options]);
}

export function useRevealAnimation(
  ref: React.RefObject<HTMLElement>,
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  }
) {
  useEffect(() => {
    if (!ref.current) return;

    const defaults = {
      y: 60,
      duration: 0.8,
      delay: 0,
      ease: 'power3.out',
    };

    const config = { ...defaults, ...options };

    const tween = gsap.fromTo(
      ref.current,
      { y: config.y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: config.duration,
        delay: config.delay,
        ease: config.ease,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [ref, options]);
}

export function useParallax(
  ref: React.RefObject<HTMLElement>,
  speed: number = 0.5
) {
  useEffect(() => {
    if (!ref.current) return;

    const tween = gsap.to(ref.current, {
      y: () => -ScrollTrigger.maxScroll(window) * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [ref, speed]);
}

export function useFadeIn(
  ref: React.RefObject<HTMLElement>,
  options?: {
    duration?: number;
    delay?: number;
    ease?: string;
  }
) {
  useEffect(() => {
    if (!ref.current) return;

    const defaults = {
      duration: 0.6,
      delay: 0,
      ease: 'power2.out',
    };

    const config = { ...defaults, ...options };

    const tween = gsap.fromTo(
      ref.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: config.duration,
        delay: config.delay,
        ease: config.ease,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [ref, options]);
}

export function useStaggerAnimation(
  containerRef: React.RefObject<HTMLElement>,
  childSelector: string,
  options?: {
    y?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
  }
) {
  useEffect(() => {
    if (!containerRef.current) return;

    const defaults = {
      y: 50,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    };

    const config = { ...defaults, ...options };
    const children = containerRef.current.querySelectorAll(childSelector);

    if (children.length === 0) return;

    const tween = gsap.fromTo(
      children,
      { y: config.y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: config.duration,
        stagger: config.stagger,
        ease: config.ease,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [containerRef, childSelector, options]);
}

export default useAnimations;
