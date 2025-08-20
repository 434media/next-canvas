"use client"
import Link from "next/link"

interface BoxProps {
  color: string
  title: string
  width?: string
  height?: string
}

export default function Box({ color, title, width, height }: BoxProps) {
  const slug = title.toLowerCase().replace(/\s+/g, "-")

  const handleClick = () => {
    sessionStorage.setItem("saved-scroll", window.scrollY.toString())
  }

  return (
    <Link
      href={`/boxes/${slug}`}
      className="block focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg" // Added accessibility focus styles
      onClick={handleClick}
      aria-label={`Explore ${title} section`} // Added aria-label for accessibility
    >
      <div
        className={`box ${color} absolute rounded-xl flex items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 will-change-transform border-2 border-black/10`} // Enhanced styling with Digital Canvas theme
        style={{
          width: width || "100px",
          height: height || "100px",
          left: "50%",
          top: "50%",
          transform: "translate3d(-50%, -50%, 0)",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
        }}
      >
        <h3
          className={`text-sm md:text-lg lg:text-xl font-black text-center px-2 tracking-wide uppercase ${
            color === "bg-yellow-400" || color === "bg-amber-400" || color === "bg-amber-500"
              ? "text-black"
              : "text-white"
          } drop-shadow-sm`}
        >
          {title}
        </h3>
      </div>
    </Link>
  )
}
