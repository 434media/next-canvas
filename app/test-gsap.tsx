"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, initializeGSAP, testGSAP, getPinnedSections } from "../lib/gsap-config";

// Initialize GSAP
initializeGSAP();

const TestGSAP = () => {
  useEffect(() => {
    // Test GSAP functionality
    const success = testGSAP();
    console.log("GSAP Test Result:", success);
    
    // Log current pinned sections
    console.log("Current pinned sections:", getPinnedSections());
    
    // Test ScrollTrigger functionality
    const testElement = document.createElement('div');
    testElement.style.position = 'absolute';
    testElement.style.left = '-9999px';
    testElement.style.width = '100px';
    testElement.style.height = '100px';
    testElement.style.backgroundColor = 'red';
    document.body.appendChild(testElement);
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: testElement,
        start: "top center",
        end: "bottom center",
        onEnter: () => console.log("ScrollTrigger test: Element entered"),
        onLeave: () => console.log("ScrollTrigger test: Element left"),
      }
    });
    
    tl.to(testElement, { opacity: 0.5, duration: 0.5 });
    
    // Cleanup
    return () => {
      tl.kill();
      document.body.removeChild(testElement);
    };
  }, []);

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>GSAP Test Component</h2>
      <p>Check the browser console for GSAP test results.</p>
    </div>
  );
};

export default TestGSAP; 