"use client"

import { useEffect, useState } from "react"

export function NorthernLights() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-full h-full absolute inset-0 z-0 bg-black" />
  }

  return (
    <div className="w-full h-full absolute inset-0 z-0 overflow-hidden bg-linear-to-b from-[#0a0e27] via-[#16213e] to-[#0f0f23]">
      {/* Northern Lights Layers */}
      <div className="absolute inset-0 opacity-60">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
      </div>

      {/* Stars */}
      <div className="stars-container">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Snowflakes */}
      <div className="snowflakes">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              fontSize: `${10 + Math.random() * 10}px`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <style jsx>{`
        .aurora {
          position: absolute;
          width: 200%;
          height: 100%;
          top: 0;
          left: -50%;
          opacity: 0.7;
          filter: blur(60px);
          animation: aurora-movement 20s ease-in-out infinite;
        }

        .aurora-1 {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(0, 255, 150, 0.3) 25%,
            rgba(100, 200, 255, 0.3) 50%,
            rgba(200, 100, 255, 0.3) 75%,
            transparent 100%
          );
          animation-duration: 15s;
        }

        .aurora-2 {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(50, 255, 200, 0.2) 25%,
            rgba(150, 100, 255, 0.2) 50%,
            rgba(255, 150, 200, 0.2) 75%,
            transparent 100%
          );
          animation-duration: 20s;
          animation-delay: 2s;
        }

        .aurora-3 {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(100, 200, 255, 0.15) 25%,
            rgba(200, 255, 150, 0.15) 50%,
            rgba(255, 200, 150, 0.15) 75%,
            transparent 100%
          );
          animation-duration: 25s;
          animation-delay: 4s;
        }

        @keyframes aurora-movement {
          0%,
          100% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          25% {
            transform: translateX(-10%) translateY(5%) rotate(1deg);
          }
          50% {
            transform: translateX(10%) translateY(-5%) rotate(-1deg);
          }
          75% {
            transform: translateX(-5%) translateY(10%) rotate(0.5deg);
          }
        }

        .stars-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle linear infinite;
          box-shadow: 0 0 3px rgba(255, 255, 255, 0.8);
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .snowflakes {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .snowflake {
          position: absolute;
          top: -10%;
          color: rgba(255, 255, 255, 0.8);
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
          animation: snowfall linear infinite;
        }

        @keyframes snowfall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) translateX(100px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
