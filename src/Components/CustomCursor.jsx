import React, { useEffect, useRef, useState } from "react";
import "./CSS/CustomCursor.css";

const CustomCursor = () => {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Check if mouse is hovering over interactive elements
      const target = e.target;
      const isInteractive = target.closest("button, a, input, select, textarea, .productCard, .categoryPill, .clickable");
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    let animationFrameId;
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHovered ? "hovered" : ""} ${
          isClicked ? "clicked" : ""
        }`}
      />
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isHovered ? "hovered" : ""} ${
          isClicked ? "clicked" : ""
        }`}
      />
    </>
  );
};

export default CustomCursor;
