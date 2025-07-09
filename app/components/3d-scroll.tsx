import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './ImageUnmaskComponent.css';

gsap.registerPlugin(ScrollTrigger);

const ImageUnmaskComponent = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const pad = 4;
  
  // State to track the circle position
  const [circlePosition, setCirclePosition] = useState({
    x: 53.55, // Default x position (percentage)
    y: 14.3  // Default y position (percentage)
  });

  // Grid items for the 3D animation
  const gridItems = [
    "oklch()", "scroll()", "text-box-trim", "pow()", "@property", "top-layer",
    "@view-transition", "var()", "clamp()", "view()", "HELLO", "@layer",
    "@swash", "subgrid", "in oklab", ":popover-open", "abs()", "sin()",
    ":has()", "::marker", "1cap", "scrollbar-color", "scroll-timeline",
    "view-timeline", "overlay", "scale", "ascent-override", "initial-letter",
    "inset", "@container", "accent-color", "color-mix()", "@scope",
    "@starting-style", "override-colors", "anchor()", "scroll-snap",
    "::backdrop", "::cue", ":focus-visible", ":user-valid", ":fullscreen",
    ":dir()", "caret-color", "aspect-ratio", "cross-fade()", "image-set()",
    "env()", "place-content", "gap"
  ];

  // Function to find and calculate the position of the first "o" in "Properties"
  const findAndPositionCircle = () => {
    // Find the Properties text in the DOM
    const propertiesSpan = document.querySelector('.bg-gradient-to-r.from-blue-400.via-purple-400.to-teal-400.text-transparent.bg-clip-text');
    if (!propertiesSpan) return;
    
    // The word is "Properties" - find the position of the first "o"
    const text = propertiesSpan.textContent || '';
    const oIndex = text.toLowerCase().indexOf('o');
    
    if (oIndex === -1) return;
    
    // Create a temporary span to measure the position
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.textContent = text.substring(0, oIndex + 1);
    propertiesSpan.appendChild(tempSpan);
    
    // Get the bounding rectangles
    const spanRect = propertiesSpan.getBoundingClientRect();
    const tempRect = tempSpan.getBoundingClientRect();
    const svgRect = svgRef.current?.getBoundingClientRect();
    
    // Remove the temporary span
    propertiesSpan.removeChild(tempSpan);
    
    if (!svgRect) return;
    
    // Calculate the position of the "o" relative to the viewport
    const oX = tempRect.right - (tempRect.width / 2);
    const oY = tempRect.top + (tempRect.height / 2);
    
    // Calculate the position as a percentage of the SVG
    const xPercent = ((oX - svgRect.left) / svgRect.width) * 100;
    const yPercent = ((oY - svgRect.top) / svgRect.height) * 100;
    
    // Update the circle position
    setCirclePosition({
      x: xPercent,
      y: yPercent
    });
  };

  useEffect(() => {
    const svg = svgRef.current;
    const circle = circleRef.current;
    
    if (!svg || !circle) return;
    
    // Start with a small circle radius
    const startRadius = 5;
    // End with a large circle radius - will be calculated
    let maxRadius = 1000;

    // Set initial circle radius
    gsap.set(circle, {
      attr: { r: startRadius }
    });

    // Create the timeline animation
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".overlay-container",
        pin: true,
        start: "top top",
        end: "+=2000",
        scrub: 1,
        markers: false,
      }
    });
    
    // Add animation to increase circle radius
    tl.to(circle, {
      attr: { r: () => maxRadius },
      ease: "power1.inOut",
      duration: 1
    });

    // Function to handle resizing
    function resize() {
      if (!svg) return;
      
      // Calculate container dimensions
      const r = svg.getBoundingClientRect();
      const rectWidth = r.width + pad;
      const rectHeight = r.height + pad;
      
      // Calculate maximum radius (diagonal of the container)
      const dx = rectWidth / 2;
      const dy = rectHeight / 2;
      maxRadius = Math.sqrt(dx * dx + dy * dy) * 2;
      
      // Find and position the circle on the "o" in "Properties"
      findAndPositionCircle();
      
      // Reset timeline and refresh ScrollTrigger
      tl.invalidate();
      ScrollTrigger.refresh();
    }

    // Add event listeners
    window.addEventListener("resize", resize);
    window.addEventListener("load", resize);
    
    // Set a timeout to ensure the DOM is fully rendered
    const timer = setTimeout(() => {
      findAndPositionCircle();
      resize();
    }, 500);
    
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", resize);
      clearTimeout(timer);
      tl.kill();
    };
  }, []);

  return (
    <div className="w-full h-full pointer-events-none">
      <section className="image-unmask w-full h-full pointer-events-none">
        {/* 3D Grid Animation behind the mask */}
        <div className="stuck-grid">
          {gridItems.map((item, index) => (
            <div 
              key={index} 
              className={`grid-item${index === 10 ? " special" : ""}`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* SVG Mask that will be applied to the entire overlay container */}
        <svg id="svg" ref={svgRef} className="w-full h-full pointer-events-none">
          <defs>
            <mask id="overlay-mask">
              <rect width="100%" height="100%" fill="white"></rect>
              <circle
                id="circle"
                ref={circleRef}
                cx={`${circlePosition.x}%`}
                cy={`${circlePosition.y}%`}
                r="10"
                fill="black"
              ></circle>
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="white"
            opacity="0"
            mask="url(#overlay-mask)"
          ></rect>
        </svg>
      </section>
    </div>
  );
};

export default ImageUnmaskComponent;
