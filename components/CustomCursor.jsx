"use client";

import { useEffect } from "react";

const CustomCursor = () => {
  useEffect(() => {
    const outer = document.createElement("div");
    const inner = document.createElement("div");

    outer.classList.add("cursor-outer");
    inner.classList.add("cursor-inner");

    document.body.appendChild(outer);
    document.body.appendChild(inner);

    // Set initial positions
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outerX = mouseX;
    let outerY = mouseY;
    let innerX = mouseX;
    let innerY = mouseY;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Outer circle follows with a smooth trailing effect
      outerX += (mouseX - outerX) * 0.09;
      outerY += (mouseY - outerY) * 0.09;

      // Inner circle follows with a faster, smooth effect
      innerX += (mouseX - innerX) * 0.18;
      innerY += (mouseY - innerY) * 0.18;

      outer.style.left = `${outerX}px`;
      outer.style.top = `${outerY}px`;
      inner.style.left = `${innerX}px`;
      inner.style.top = `${innerY}px`;

      requestAnimationFrame(animate);
    };

    // Add hover effect to interactive elements
    const addHoverEffects = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, input, textarea, select, [role='button']"
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          document.body.classList.add("hover-effect");
        });
        el.addEventListener("mouseleave", () => {
          document.body.classList.remove("hover-effect");
        });
      });
    };

    // Click effect
    const handleMouseDown = () => {
      document.body.classList.add("click-effect");
    };
    const handleMouseUp = () => {
      document.body.classList.remove("click-effect");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    requestAnimationFrame(animate);

    // Initialize hover effects
    addHoverEffects();
    const observer = new MutationObserver(addHoverEffects);
    observer.observe(document.body, { subtree: true, childList: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (document.body.contains(outer)) {
        document.body.removeChild(outer);
      }
      if (document.body.contains(inner)) {
        document.body.removeChild(inner);
      }
      observer.disconnect();
    };
  }, []);

  return null;
};

export default CustomCursor;
