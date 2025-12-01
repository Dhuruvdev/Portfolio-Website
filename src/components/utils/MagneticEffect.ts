import gsap from 'gsap';

interface MagneticOptions {
  strength?: number;
  ease?: string;
  duration?: number;
}

export function createMagneticEffect(
  element: HTMLElement,
  options: MagneticOptions = {}
): () => void {
  const defaults: MagneticOptions = {
    strength: 0.5,
    ease: 'power3.out',
    duration: 0.5,
  };

  const config = { ...defaults, ...options };

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * config.strength!;
    const deltaY = (e.clientY - centerY) * config.strength!;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      ease: config.ease,
      duration: config.duration,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      ease: 'elastic.out(1, 0.3)',
      duration: 0.8,
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
    gsap.killTweensOf(element);
  };
}

export function createHoverScale(
  element: HTMLElement,
  options?: {
    scale?: number;
    duration?: number;
    ease?: string;
  }
): () => void {
  const defaults = {
    scale: 1.1,
    duration: 0.4,
    ease: 'power2.out',
  };

  const config = { ...defaults, ...options };

  const handleMouseEnter = () => {
    gsap.to(element, {
      scale: config.scale,
      ease: config.ease,
      duration: config.duration,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      scale: 1,
      ease: 'elastic.out(1, 0.3)',
      duration: 0.6,
    });
  };

  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
    gsap.killTweensOf(element);
  };
}

export function createTiltEffect(
  element: HTMLElement,
  options?: {
    maxTilt?: number;
    perspective?: number;
    scale?: number;
    speed?: number;
    easing?: string;
  }
): () => void {
  const defaults = {
    maxTilt: 15,
    perspective: 1000,
    scale: 1.05,
    speed: 300,
    easing: 'cubic-bezier(0.03, 0.98, 0.52, 0.99)',
  };

  const config = { ...defaults, ...options };

  element.style.transformStyle = 'preserve-3d';
  element.style.perspective = `${config.perspective}px`;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -config.maxTilt;
    const rotateY = ((x - centerX) / centerX) * config.maxTilt;

    gsap.to(element, {
      rotateX,
      rotateY,
      scale: config.scale,
      ease: 'power2.out',
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      ease: 'power2.out',
      duration: 0.5,
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
    gsap.killTweensOf(element);
  };
}

export function initMagneticButtons(): () => void {
  const cleanupFunctions: (() => void)[] = [];
  
  const magneticElements = document.querySelectorAll<HTMLElement>('[data-magnetic]');
  
  magneticElements.forEach((element) => {
    const strength = parseFloat(element.dataset.magneticStrength || '0.5');
    const cleanup = createMagneticEffect(element, { strength });
    cleanupFunctions.push(cleanup);
  });

  return () => {
    cleanupFunctions.forEach((cleanup) => cleanup());
  };
}

export function initTiltCards(): () => void {
  const cleanupFunctions: (() => void)[] = [];
  
  const tiltElements = document.querySelectorAll<HTMLElement>('[data-tilt]');
  
  tiltElements.forEach((element) => {
    const maxTilt = parseFloat(element.dataset.tiltMax || '15');
    const cleanup = createTiltEffect(element, { maxTilt });
    cleanupFunctions.push(cleanup);
  });

  return () => {
    cleanupFunctions.forEach((cleanup) => cleanup());
  };
}
