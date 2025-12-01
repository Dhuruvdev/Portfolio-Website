import gsap from "gsap";
import { scrollState } from "../Navbar";
import { TextSplitter } from "./textSplitter";

export function initialFX() {
  document.body.style.overflowY = "auto";
  scrollState.setPaused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  const landingElements = document.querySelectorAll<HTMLElement>(".landing-info h3, .landing-intro h2, .landing-intro h1");
  const landingChars: HTMLElement[] = [];
  const landingTexts: TextSplitter[] = [];
  
  landingElements.forEach(elem => {
    const split = new TextSplitter(elem, { type: 'chars' });
    landingTexts.push(split);
    landingChars.push(...split.chars);
  });

  gsap.fromTo(
    landingChars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  const landingText2Elem = document.querySelector<HTMLElement>(".landing-h2-info");
  const landingText3Elem = document.querySelector<HTMLElement>(".landing-h2-info-1");
  const landingText4Elem = document.querySelector<HTMLElement>(".landing-h2-1");
  const landingText5Elem = document.querySelector<HTMLElement>(".landing-h2-2");

  if (landingText2Elem) {
    const landingText2 = new TextSplitter(landingText2Elem, { type: 'chars' });
    gsap.fromTo(
      landingText2.chars,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.025,
        delay: 0.3,
      }
    );

    if (landingText3Elem) {
      const landingText3 = new TextSplitter(landingText3Elem, { type: 'chars' });
      LoopText(landingText2, landingText3);
    }
  }

  if (landingText4Elem && landingText5Elem) {
    const landingText4 = new TextSplitter(landingText4Elem, { type: 'chars' });
    const landingText5 = new TextSplitter(landingText5Elem, { type: 'chars' });
    LoopText(landingText4, landingText5);
  }

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );
}

function LoopText(Text1: TextSplitter, Text2: TextSplitter) {
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
