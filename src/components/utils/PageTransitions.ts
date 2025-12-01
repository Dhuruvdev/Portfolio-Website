import gsap from 'gsap';

export interface TransitionOptions {
  duration?: number;
  ease?: string;
  delay?: number;
}

export function createPageEnterTransition(options: TransitionOptions = {}): gsap.core.Timeline {
  const defaults = {
    duration: 0.8,
    ease: 'power3.inOut',
    delay: 0,
  };

  const config = { ...defaults, ...options };
  const tl = gsap.timeline({ delay: config.delay });

  tl.fromTo(
    '.page-content',
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: config.duration,
      ease: config.ease,
    }
  );

  return tl;
}

export function createPageExitTransition(options: TransitionOptions = {}): gsap.core.Timeline {
  const defaults = {
    duration: 0.5,
    ease: 'power2.in',
    delay: 0,
  };

  const config = { ...defaults, ...options };
  const tl = gsap.timeline({ delay: config.delay });

  tl.to('.page-content', {
    opacity: 0,
    y: -30,
    duration: config.duration,
    ease: config.ease,
  });

  return tl;
}

export function createSlideTransition(
  direction: 'left' | 'right' | 'up' | 'down',
  options: TransitionOptions = {}
): gsap.core.Timeline {
  const defaults = {
    duration: 0.8,
    ease: 'power3.inOut',
    delay: 0,
  };

  const config = { ...defaults, ...options };
  const tl = gsap.timeline({ delay: config.delay });

  const directionMap = {
    left: { x: '-100%', y: 0 },
    right: { x: '100%', y: 0 },
    up: { x: 0, y: '-100%' },
    down: { x: 0, y: '100%' },
  };

  const { x, y } = directionMap[direction];

  tl.fromTo(
    '.page-content',
    { x, y, opacity: 0 },
    {
      x: 0,
      y: 0,
      opacity: 1,
      duration: config.duration,
      ease: config.ease,
    }
  );

  return tl;
}

export function createCurtainTransition(options: TransitionOptions = {}): gsap.core.Timeline {
  const defaults = {
    duration: 1,
    ease: 'power4.inOut',
    delay: 0,
  };

  const config = { ...defaults, ...options };
  const tl = gsap.timeline({ delay: config.delay });

  tl.fromTo(
    '.transition-curtain',
    { scaleY: 0, transformOrigin: 'bottom' },
    {
      scaleY: 1,
      duration: config.duration / 2,
      ease: config.ease,
    }
  ).to('.transition-curtain', {
    scaleY: 0,
    transformOrigin: 'top',
    duration: config.duration / 2,
    ease: config.ease,
  });

  return tl;
}

export function createFadeTransition(options: TransitionOptions = {}): gsap.core.Timeline {
  const defaults = {
    duration: 0.5,
    ease: 'power2.inOut',
    delay: 0,
  };

  const config = { ...defaults, ...options };
  const tl = gsap.timeline({ delay: config.delay });

  tl.fromTo(
    '.page-content',
    { opacity: 0 },
    {
      opacity: 1,
      duration: config.duration,
      ease: config.ease,
    }
  );

  return tl;
}

export function createRevealTransition(options: TransitionOptions = {}): gsap.core.Timeline {
  const defaults = {
    duration: 1.2,
    ease: 'power3.out',
    delay: 0,
  };

  const config = { ...defaults, ...options };
  const tl = gsap.timeline({ delay: config.delay });

  tl.fromTo(
    '.reveal-element',
    {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0,
    },
    {
      clipPath: 'inset(0 0% 0 0)',
      opacity: 1,
      duration: config.duration,
      ease: config.ease,
      stagger: 0.1,
    }
  );

  return tl;
}

export function createLoadingTransition(onComplete?: () => void): gsap.core.Timeline {
  const tl = gsap.timeline({
    onComplete,
  });

  tl.to('.loading-screen', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.inOut',
  })
  .to('.loading-screen', {
    display: 'none',
    duration: 0,
  })
  .fromTo(
    '.main-content',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    },
    '-=0.3'
  );

  return tl;
}

export function createSectionTransition(
  section: HTMLElement | string,
  options: TransitionOptions = {}
): gsap.core.Timeline {
  const defaults = {
    duration: 1,
    ease: 'power3.out',
    delay: 0,
  };

  const config = { ...defaults, ...options };
  const tl = gsap.timeline({
    delay: config.delay,
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  });

  tl.fromTo(
    section,
    {
      opacity: 0,
      y: 80,
    },
    {
      opacity: 1,
      y: 0,
      duration: config.duration,
      ease: config.ease,
    }
  );

  return tl;
}
