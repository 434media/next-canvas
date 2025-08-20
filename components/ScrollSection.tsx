"use client";

import React, { ReactNode } from "react";

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  spacing?: "none" | "small" | "medium" | "large";
  id?: string;
  minHeight?: string;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  className = "",
  spacing = "medium",
  id,
  minHeight = "100vh"
}) => {
  const spacingClasses = {
    none: "",
    small: "py-8",
    medium: "py-16",
    large: "py-32"
  };

  return (
    <section 
      id={id}
      className={`scroll-section ${spacingClasses[spacing]} ${className}`}
      style={{
        position: "relative",
        minHeight: minHeight,
        width: "100%",
        // Ensure proper stacking context
        zIndex: 1
      }}
    >
      {children}
    </section>
  );
};

export default ScrollSection; 