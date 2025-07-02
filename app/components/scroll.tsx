import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './ImageUnmaskComponent.css';

gsap.registerPlugin(ScrollTrigger);

const ImageUnmaskComponent = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const pad = 4;

  useEffect(() => {
    const svg = svgRef.current;
    const circle = circleRef.current;
    
    if (!svg || !circle) return;
    
    // Start with a small circle radius
    const startRadius = 10;
    // End with a large circle radius - will be calculated
    let maxRadius = 1000;

    // Set initial circle radius
    gsap.set(circle, {
      attr: { r: startRadius }
    });

    // Create the timeline animation
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".image-unmask",
        pin: true,
        start: "top top",
        end: "+=2000",
        scrub: 1,
        markers: false, // Remove debug markers
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
      
      // Reset timeline and refresh ScrollTrigger
      tl.invalidate();
      ScrollTrigger.refresh();
    }

    // Add event listeners
    window.addEventListener("resize", resize);
    window.addEventListener("load", resize);
    
    // Call resize immediately
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", resize);
      tl.kill();
    };
  }, []);

  return (
    <div>
      <section>
      </section>

      <section className="image-unmask">
        <svg id="svg" ref={svgRef}>
          <defs>
            <mask id="mask">
              <rect width="100%" height="100%" fill="white"></rect>
              <circle
                id="circle"
                ref={circleRef}
                cx="50%"
                cy="50%"
                r="10"
                fill="black"
              ></circle>
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="black"
            mask="url(#mask)"
          ></rect>
        </svg>
      </section>
    </div>
  );
};

export default ImageUnmaskComponent;