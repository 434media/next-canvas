"use client"
import * as THREE from "three"
import { Canvas, useFrame, extend } from "@react-three/fiber"
import { OrbitControls, Sparkles, Stars, Environment } from "@react-three/drei"
import { useRef, useMemo, useState, useEffect, Suspense } from "react"
import { useAudio } from "./audio-provider"

// Extend THREE with ExtrudeGeometry if needed (it's built-in but good practice for custom geometries)
extend({ ExtrudeGeometry: THREE.ExtrudeGeometry })

function ReactiveStars() {
  const { analyser } = useAudio()
  const groupRef = useRef<THREE.Group>(null)
  const dataArray = useMemo(() => new Uint8Array(128), [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Constant slow rotation
    groupRef.current.rotation.y += delta * 0.02

    if (analyser) {
      analyser.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length
      
      // Pulse scale based on bass/volume
      // Scaling > 1 moves stars further away (zoom out effect)
      // Scaling < 1 moves stars closer (zoom in effect)
      const scale = 1 + (average / 255) * 0.2
      groupRef.current.scale.setScalar(scale)
      
      // Add extra rotation speed based on volume
      groupRef.current.rotation.y += (average / 255) * 0.01
    }
  })

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  )
}

function Reindeer({ color = "#8B4513", noseColor = "#8B4513", position }: { color?: string, noseColor?: string, position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.25, 0.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Neck & Head */}
      <group position={[0.3, 0.2, 0]} rotation={[0, 0, 0.5]}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.15, 0.3, 0.15]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Head */}
        <mesh position={[0.1, 0.3, 0]}>
          <boxGeometry args={[0.2, 0.15, 0.15]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Nose */}
        <mesh position={[0.2, 0.3, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color={noseColor} emissive={noseColor === "red" ? "red" : "black"} emissiveIntensity={noseColor === "red" ? 2 : 0} />
          {noseColor === "red" && <pointLight color="red" intensity={1} distance={2} />}
        </mesh>
        {/* Antlers */}
        <mesh position={[0, 0.4, 0.1]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3]} />
          <meshStandardMaterial color="#5C4033" />
        </mesh>
        <mesh position={[0, 0.4, -0.1]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3]} />
          <meshStandardMaterial color="#5C4033" />
        </mesh>
      </group>
      {/* Legs - Flight pose */}
      <mesh position={[-0.15, -0.15, 0.1]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.08, 0.3, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.15, -0.15, -0.1]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.08, 0.3, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.15, -0.15, 0.1]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.08, 0.3, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.15, -0.15, -0.1]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.08, 0.3, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  )
}

function Sleigh() {
  return (
    <group>
      {/* Runners */}
      <group position={[0, -0.3, 0]}>
        <mesh position={[0, 0, 0.35]}>
          <boxGeometry args={[1.8, 0.05, 0.05]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, -0.35]}>
          <boxGeometry args={[1.8, 0.05, 0.05]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Curved front of runners */}
        <mesh position={[0.9, 0.1, 0.35]} rotation={[0, 0, 0.5]}>
           <boxGeometry args={[0.4, 0.05, 0.05]} />
           <meshStandardMaterial color="#C0C0C0" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0.9, 0.1, -0.35]} rotation={[0, 0, 0.5]}>
           <boxGeometry args={[0.4, 0.05, 0.05]} />
           <meshStandardMaterial color="#C0C0C0" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Carriage Body */}
      <mesh position={[-0.2, 0, 0]}>
        <boxGeometry args={[1.2, 0.5, 0.8]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      {/* Gold Trim */}
      <mesh position={[-0.2, 0.25, 0]}>
        <boxGeometry args={[1.25, 0.05, 0.85]} />
        <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Santa */}
      <group position={[0, 0.3, 0]}>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#CC0000" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.35, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#FFCC99" />
        </mesh>
        {/* Beard */}
        <mesh position={[0.1, 0.3, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
        {/* Hat */}
        <mesh position={[0, 0.45, 0]} rotation={[0, 0, -0.2]}>
          <coneGeometry args={[0.16, 0.4, 16]} />
          <meshStandardMaterial color="#CC0000" />
        </mesh>
        <mesh position={[0, 0.65, 0]} rotation={[0, 0, -0.2]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
      
      {/* Sack of gifts */}
      <mesh position={[-0.5, 0.3, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#5C4033" />
      </mesh>
    </group>
  )
}

function SantaSleigh() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    // Move across the screen from left to right
    // Cycle every 20 seconds for a slightly slower, more majestic pass
    const cycle = t % 20
    // Start further left (-30) and go further right (30)
    const x = -30 + cycle * 3 // Speed = 3 units/sec

    groupRef.current.position.x = x
    // Smoother wave motion
    groupRef.current.position.y = 6 + Math.sin(t * 1.5) * 1.5
    groupRef.current.position.z = -10 + Math.cos(t * 0.8) * 3

    // Bank the sleigh slightly based on y-movement
    groupRef.current.rotation.z = Math.cos(t * 1.5) * 0.15
    // Slight tilt up/down based on y-velocity
    groupRef.current.rotation.x = Math.sin(t * 0.8) * 0.05
  })

  return (
    <group ref={groupRef}>
      {/* Rudolph (Lead) */}
      <Reindeer position={[3.5, 0, 0]} noseColor="red" />

      {/* Second Row */}
      <Reindeer position={[2.2, 0, 0.4]} />
      <Reindeer position={[2.2, 0, -0.4]} />

      {/* Third Row */}
      <Reindeer position={[0.9, 0, 0.4]} />
      <Reindeer position={[0.9, 0, -0.4]} />

      {/* Sleigh */}
      <group position={[-1.5, 0, 0]}>
        <Sleigh />
      </group>

      {/* Magic Dust Trail - Enhanced */}
      <Sparkles count={40} scale={[6, 2, 2]} size={4} speed={0.4} opacity={0.6} color="#ffd700" position={[-2, 0, 0]} />
    </group>
  )
}

export default function ChristmasScene() {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    console.log('ChristmasScene mounted')
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full absolute inset-0 z-0 bg-black flex items-center justify-center">
        <p className="text-white">Loading 3D Scene...</p>
      </div>
    )
  }

  // High performance: render full 3D scene with error boundary
  return (
    <div ref={canvasRef} className="w-full h-full absolute inset-0 z-0" style={{ width: '100%', height: '100%' }}>
      <Canvas 
        dpr={[1, 1.5]} // Limit pixel ratio to 1.5 to save performance on retina screens
        camera={{ position: [0, 0, 8], fov: 50 }} 
        gl={{ 
          antialias: false, // Disable antialiasing for performance
          alpha: false, 
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
          stencil: false,
          depth: true
        }}
        onCreated={(state) => {
          console.log('Canvas created successfully')
          
          const handleContextRestored = () => {
            console.log('WebGL context restored')
          }
          
          state.gl.domElement.addEventListener('webglcontextrestored', handleContextRestored, false)
        }}
      >
        <color attach="background" args={["#000000"]} />

        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="blue" />
          <pointLight position={[0, 0, 5]} intensity={0.5} color="white" />

          <SantaSleigh />

          {/* Environment - Reduced counts for performance */}
          <ReactiveStars />
          <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.4} color="#ffffff" />

          {/* Controls - restricted movement to keep view centered */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.8}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}
