import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import "./styles/EnhancedCursor.css";

const EnhancedCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const updateCursor = useCallback(() => {
    if (!cursorRef.current || !cursorDotRef.current) return;

    const smoothFactor = isHovering.current ? 0.2 : 0.15;
    
    cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, smoothFactor);
    cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, smoothFactor);

    gsap.set(cursorRef.current, {
      x: cursorPos.current.x,
      y: cursorPos.current.y,
      force3D: true,
    });

    gsap.set(cursorDotRef.current, {
      x: mousePos.current.x,
      y: mousePos.current.y,
      force3D: true,
    });

    rafId.current = requestAnimationFrame(updateCursor);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const setupInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll<HTMLElement>(
        'a, button, [data-cursor], .hover-link, input, textarea, [role="button"]'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          isHovering.current = true;
          
          const cursorType = el.dataset.cursor || "default";
          
          if (cursorType === "disable") {
            gsap.to(cursor, {
              scale: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          } else if (cursorType === "icons") {
            const rect = el.getBoundingClientRect();
            gsap.to(cursor, {
              width: rect.width + 20,
              height: rect.height + 20,
              borderRadius: 10,
              duration: 0.3,
              ease: "power2.out",
            });
          } else {
            gsap.to(cursor, {
              scale: 1.5,
              duration: 0.3,
              ease: "elastic.out(1, 0.5)",
            });
            
            gsap.to(cursorDot, {
              scale: 0,
              duration: 0.2,
              ease: "power2.out",
            });
          }
        });

        el.addEventListener("mouseleave", () => {
          isHovering.current = false;
          
          gsap.to(cursor, {
            scale: 1,
            width: 50,
            height: 50,
            borderRadius: "50%",
            duration: 0.3,
            ease: "power2.out",
          });
          
          gsap.to(cursorDot, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        el.addEventListener("mousedown", () => {
          gsap.to(cursor, {
            scale: 0.8,
            duration: 0.1,
            ease: "power2.out",
          });
        });

        el.addEventListener("mouseup", () => {
          gsap.to(cursor, {
            scale: isHovering.current ? 1.5 : 1,
            duration: 0.2,
            ease: "elastic.out(1, 0.5)",
          });
        });
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    setupInteractiveElements();

    const observer = new MutationObserver(() => {
      setupInteractiveElements();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    rafId.current = requestAnimationFrame(updateCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, [updateCursor]);

  return (
    <>
      <div className="enhanced-cursor" ref={cursorRef} />
      <div className="enhanced-cursor-dot" ref={cursorDotRef} />
    </>
  );
};

export default EnhancedCursor;
