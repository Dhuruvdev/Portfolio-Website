export type SplitType = 'chars' | 'words' | 'lines';

export interface SplitTextResult {
  chars?: HTMLElement[];
  words?: HTMLElement[];
  lines?: HTMLElement[];
  revert: () => void;
}

export class TextSplitter {
  private element: HTMLElement;
  private originalHTML: string;
  private splitElements: { chars?: HTMLElement[]; words?: HTMLElement[]; lines?: HTMLElement[] } = {};

  constructor(element: HTMLElement | string, options?: { type?: SplitType | SplitType[] }) {
    if (typeof element === 'string') {
      const found = document.querySelector<HTMLElement>(element);
      if (!found) throw new Error(`Element not found: ${element}`);
      this.element = found;
    } else {
      this.element = element;
    }

    this.originalHTML = this.element.innerHTML;
    
    const types = options?.type 
      ? Array.isArray(options.type) 
        ? options.type 
        : [options.type]
      : ['chars'];

    this.split(types);
  }

  private split(types: SplitType[]) {
    const text = this.element.textContent || '';
    
    if (types.includes('chars' as SplitType)) {
      this.splitChars(text);
    } else if (types.includes('words' as SplitType)) {
      this.splitWords(text);
    }
  }

  private splitChars(text: string) {
    const chars: HTMLElement[] = [];
    const html = text.split('').map((char) => {
      if (char === ' ') {
        return ' ';
      }
      return `<span class="char" style="display: inline-block;">${char}</span>`;
    }).join('');
    
    this.element.innerHTML = html;
    
    const charElements = this.element.querySelectorAll<HTMLElement>('.char');
    charElements.forEach(el => chars.push(el));
    
    this.splitElements.chars = chars;
  }

  private splitWords(text: string) {
    const words: HTMLElement[] = [];
    const wordArray = text.split(/\s+/).filter(word => word.length > 0);
    
    const html = wordArray.map((word, i) => {
      return `<span class="word" style="display: inline-block;">${word}</span>${i < wordArray.length - 1 ? ' ' : ''}`;
    }).join('');
    
    this.element.innerHTML = html;
    
    const wordElements = this.element.querySelectorAll<HTMLElement>('.word');
    wordElements.forEach(el => words.push(el));
    
    this.splitElements.words = words;
  }

  get chars() {
    return this.splitElements.chars || [];
  }

  get words() {
    return this.splitElements.words || [];
  }

  get lines() {
    return this.splitElements.lines || [];
  }

  revert() {
    this.element.innerHTML = this.originalHTML;
    this.splitElements = {};
  }
}
