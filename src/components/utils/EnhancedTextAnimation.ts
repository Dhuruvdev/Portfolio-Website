import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface TextAnimationOptions {
  type?: 'chars' | 'words' | 'lines';
  duration?: number;
  stagger?: number;
  ease?: string;
  delay?: number;
  y?: number;
  x?: number;
  rotation?: number;
  scale?: number;
  blur?: number;
  scrollTrigger?: boolean;
  triggerStart?: string;
  triggerEnd?: string;
}

export class EnhancedTextSplitter {
  private element: HTMLElement;
  private originalHTML: string;
  public chars: HTMLElement[] = [];
  public words: HTMLElement[] = [];
  public lines: HTMLElement[] = [];

  constructor(element: HTMLElement | string) {
    if (typeof element === 'string') {
      const found = document.querySelector<HTMLElement>(element);
      if (!found) throw new Error(`Element not found: ${element}`);
      this.element = found;
    } else {
      this.element = element;
    }
    this.originalHTML = this.element.innerHTML;
  }

  splitChars(): HTMLElement[] {
    const text = this.element.textContent || '';
    this.chars = [];
    
    const html = text.split('').map((char) => {
      if (char === ' ') {
        return '<span class="split-space" style="display: inline;">&nbsp;</span>';
      }
      return `<span class="split-char" style="display: inline-block; will-change: transform, opacity;">${char}</span>`;
    }).join('');
    
    this.element.innerHTML = html;
    
    this.element.querySelectorAll<HTMLElement>('.split-char').forEach(el => {
      this.chars.push(el);
    });
    
    return this.chars;
  }

  splitWords(): HTMLElement[] {
    const text = this.element.textContent || '';
    this.words = [];
    
    const wordArray = text.split(/\s+/).filter(word => word.length > 0);
    
    const html = wordArray.map((word, i) => {
      return `<span class="split-word" style="display: inline-block; will-change: transform, opacity;">${word}</span>${i < wordArray.length - 1 ? ' ' : ''}`;
    }).join('');
    
    this.element.innerHTML = html;
    
    this.element.querySelectorAll<HTMLElement>('.split-word').forEach(el => {
      this.words.push(el);
    });
    
    return this.words;
  }

  splitLines(): HTMLElement[] {
    const text = this.element.textContent || '';
    this.lines = [];
    
    const lineArray = text.split('\n').filter(line => line.trim().length > 0);
    
    const html = lineArray.map((line) => {
      return `<div class="split-line" style="display: block; will-change: transform, opacity; overflow: hidden;">${line}</div>`;
    }).join('');
    
    this.element.innerHTML = html;
    
    this.element.querySelectorAll<HTMLElement>('.split-line').forEach(el => {
      this.lines.push(el);
    });
    
    return this.lines;
  }

  revert(): void {
    this.element.innerHTML = this.originalHTML;
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}

export function createCharRevealAnimation(
  element: HTMLElement | string,
  options: TextAnimationOptions = {}
): { splitter: EnhancedTextSplitter; animation: gsap.core.Tween } {
  const defaults: TextAnimationOptions = {
    duration: 1,
    stagger: 0.03,
    ease: 'power3.out',
    delay: 0,
    y: 80,
    rotation: 10,
    blur: 5,
  };

  const config = { ...defaults, ...options };
  const splitter = new EnhancedTextSplitter(element);
  const chars = splitter.splitChars();

  const animation = gsap.fromTo(
    chars,
    {
      y: config.y,
      opacity: 0,
      rotate: config.rotation,
      filter: `blur(${config.blur}px)`,
    },
    {
      y: 0,
      opacity: 1,
      rotate: 0,
      filter: 'blur(0px)',
      duration: config.duration,
      stagger: config.stagger,
      ease: config.ease,
      delay: config.delay,
      scrollTrigger: config.scrollTrigger ? {
        trigger: typeof element === 'string' ? element : element,
        start: config.triggerStart || 'top 80%',
        end: config.triggerEnd || 'bottom 20%',
        toggleActions: 'play none none reverse',
      } : undefined,
    }
  );

  return { splitter, animation };
}

export function createWordRevealAnimation(
  element: HTMLElement | string,
  options: TextAnimationOptions = {}
): { splitter: EnhancedTextSplitter; animation: gsap.core.Tween } {
  const defaults: TextAnimationOptions = {
    duration: 0.8,
    stagger: 0.05,
    ease: 'power3.out',
    delay: 0,
    y: 60,
  };

  const config = { ...defaults, ...options };
  const splitter = new EnhancedTextSplitter(element);
  const words = splitter.splitWords();

  const animation = gsap.fromTo(
    words,
    {
      y: config.y,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: config.duration,
      stagger: config.stagger,
      ease: config.ease,
      delay: config.delay,
      scrollTrigger: config.scrollTrigger ? {
        trigger: typeof element === 'string' ? element : element,
        start: config.triggerStart || 'top 80%',
        end: config.triggerEnd || 'bottom 20%',
        toggleActions: 'play none none reverse',
      } : undefined,
    }
  );

  return { splitter, animation };
}

export function createLineRevealAnimation(
  element: HTMLElement | string,
  options: TextAnimationOptions = {}
): { splitter: EnhancedTextSplitter; animation: gsap.core.Tween } {
  const defaults: TextAnimationOptions = {
    duration: 1,
    stagger: 0.15,
    ease: 'power3.inOut',
    delay: 0,
    y: 100,
  };

  const config = { ...defaults, ...options };
  const splitter = new EnhancedTextSplitter(element);
  const lines = splitter.splitLines();

  const animation = gsap.fromTo(
    lines,
    {
      y: config.y,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: config.duration,
      stagger: config.stagger,
      ease: config.ease,
      delay: config.delay,
      scrollTrigger: config.scrollTrigger ? {
        trigger: typeof element === 'string' ? element : element,
        start: config.triggerStart || 'top 80%',
        end: config.triggerEnd || 'bottom 20%',
        toggleActions: 'play none none reverse',
      } : undefined,
    }
  );

  return { splitter, animation };
}

export function createTypewriterEffect(
  element: HTMLElement | string,
  options?: {
    duration?: number;
    stagger?: number;
    ease?: string;
    cursor?: boolean;
    cursorBlinkSpeed?: number;
  }
): { splitter: EnhancedTextSplitter; animation: gsap.core.Tween } {
  const defaults = {
    duration: 0.1,
    stagger: 0.05,
    ease: 'none',
    cursor: true,
    cursorBlinkSpeed: 0.5,
  };

  const config = { ...defaults, ...options };
  const splitter = new EnhancedTextSplitter(element);
  const chars = splitter.splitChars();

  const animation = gsap.fromTo(
    chars,
    { opacity: 0, display: 'none' },
    {
      opacity: 1,
      display: 'inline-block',
      duration: config.duration,
      stagger: config.stagger,
      ease: config.ease,
    }
  );

  return { splitter, animation };
}

export function createGlitchTextEffect(
  element: HTMLElement | string,
  options?: {
    duration?: number;
    intensity?: number;
    delay?: number;
  }
): { splitter: EnhancedTextSplitter; animation: gsap.core.Timeline } {
  const defaults = {
    duration: 0.05,
    intensity: 5,
    delay: 0,
  };

  const config = { ...defaults, ...options };
  const splitter = new EnhancedTextSplitter(element);
  const chars = splitter.splitChars();

  const tl = gsap.timeline({ delay: config.delay });

  chars.forEach((char, i) => {
    tl.fromTo(
      char,
      {
        x: gsap.utils.random(-config.intensity, config.intensity),
        y: gsap.utils.random(-config.intensity, config.intensity),
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: config.duration,
        ease: 'power2.out',
      },
      i * 0.02
    );
  });

  return { splitter, animation: tl };
}

export function createWaveTextEffect(
  element: HTMLElement | string,
  options?: {
    amplitude?: number;
    duration?: number;
    stagger?: number;
    repeat?: number;
  }
): { splitter: EnhancedTextSplitter; animation: gsap.core.Timeline } {
  const defaults = {
    amplitude: 20,
    duration: 0.6,
    stagger: 0.05,
    repeat: 0,
  };

  const config = { ...defaults, ...options };
  const splitter = new EnhancedTextSplitter(element);
  const chars = splitter.splitChars();

  const tl = gsap.timeline({ repeat: config.repeat });

  tl.fromTo(
    chars,
    { y: 0 },
    {
      y: -config.amplitude,
      duration: config.duration / 2,
      stagger: config.stagger,
      ease: 'power2.out',
    }
  ).to(
    chars,
    {
      y: 0,
      duration: config.duration / 2,
      stagger: config.stagger,
      ease: 'power2.in',
    },
    '-=0.3'
  );

  return { splitter, animation: tl };
}
