import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Centralized GSAP configuration to prevent conflicts
let isRegistered = false;
let pinnedSections = new Set<string>();
let activeScrollTriggers = new Map<string, ScrollTrigger>();

export const initializeGSAP = () => {
  if (typeof window === "undefined" || isRegistered) return;
  
  try {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
    console.log("GSAP ScrollTrigger registered successfully");
  } catch (error) {
    console.warn("GSAP ScrollTrigger registration failed:", error);
  }
};

// Export a function to check if GSAP is ready
export const isGSAPReady = () => {
  return typeof window !== "undefined" && isRegistered;
};

// Function to register a pinned section
export const registerPinnedSection = (sectionId: string) => {
  if (pinnedSections.has(sectionId)) {
    console.warn(`Section ${sectionId} is already registered as pinned`);
    return false;
  }
  pinnedSections.add(sectionId);
  console.log(`Registered pinned section: ${sectionId}`);
  return true;
};

// Function to unregister a pinned section
export const unregisterPinnedSection = (sectionId: string) => {
  pinnedSections.delete(sectionId);
  console.log(`Unregistered pinned section: ${sectionId}`);
};

// Function to get all pinned sections
export const getPinnedSections = () => {
  return Array.from(pinnedSections);
};

// Function to register a ScrollTrigger instance
export const registerScrollTrigger = (id: string, trigger: ScrollTrigger) => {
  activeScrollTriggers.set(id, trigger);
  console.log(`Registered ScrollTrigger: ${id}`);
};

// Function to unregister a ScrollTrigger instance
export const unregisterScrollTrigger = (id: string) => {
  const trigger = activeScrollTriggers.get(id);
  if (trigger) {
    trigger.kill();
    activeScrollTriggers.delete(id);
    console.log(`Unregistered ScrollTrigger: ${id}`);
  }
};

// Function to get all active ScrollTriggers
export const getActiveScrollTriggers = () => {
  return Array.from(activeScrollTriggers.keys());
};

// Function to refresh all ScrollTriggers
export const refreshAllScrollTriggers = () => {
  ScrollTrigger.refresh();
  console.log("Refreshed all ScrollTriggers");
};

// Test function to verify GSAP is working
export const testGSAP = () => {
  if (!isGSAPReady()) {
    console.warn("GSAP not ready");
    return false;
  }
  
  try {
    // Simple test to verify GSAP and ScrollTrigger are working
    const testElement = document.createElement('div');
    testElement.style.position = 'absolute';
    testElement.style.left = '-9999px';
    document.body.appendChild(testElement);
    
    gsap.set(testElement, { opacity: 0 });
    gsap.to(testElement, { opacity: 1, duration: 0.1 });
    
    document.body.removeChild(testElement);
    console.log("GSAP test passed");
    return true;
  } catch (error) {
    console.error("GSAP test failed:", error);
    return false;
  }
};

// Function to safely manage body overflow
export const setBodyOverflow = (overflow: string) => {
  if (typeof window === "undefined") return;
  
  // Only set overflow if no other sections are pinned
  if (overflow === "hidden" && pinnedSections.size === 0) {
    document.body.style.overflow = overflow;
  } else if (overflow !== "hidden") {
    document.body.style.overflow = overflow;
  }
};

export { gsap, ScrollTrigger }; 