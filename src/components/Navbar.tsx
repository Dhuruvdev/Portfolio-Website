import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { getLenis, pauseScroll, resumeScroll } from "./utils/SmoothScroll";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

export const scrollState = {
  isPaused: true,
  setPaused: (paused: boolean) => {
    scrollState.isPaused = paused;
    if (paused) {
      pauseScroll();
      document.body.style.overflowY = "hidden";
    } else {
      resumeScroll();
      document.body.style.overflowY = "auto";
    }
  }
};

const Navbar = () => {
  useEffect(() => {
    scrollState.setPaused(true);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const section = element.getAttribute("data-href");
          if (section) {
            const target = document.querySelector(section);
            if (target) {
              const lenis = getLenis();
              if (lenis) {
                lenis.scrollTo(target as HTMLElement, {
                  offset: 0,
                  duration: 1.2,
                  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
              } else {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }
          }
        }
      });
    });
    
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Dhuruv Dev
        </a>
        <a
          href="mailto:dhuruvm4@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          dhuruvm4@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
