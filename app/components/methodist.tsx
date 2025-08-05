import { Home, Play } from "lucide-react"
import Image from "next/image"
import logo from "@/public/mhm_logo.png"

const WaveShape = () => (
  <svg 
    version="1.0" 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 560"
    preserveAspectRatio="xMidYMid meet"
    className="absolute inset-0 w-full h-full z-5"
  >
    {/* First line */}
    <g transform="translate(0.000000,560.000000) scale(0.100000,-0.100000)" fill="#AE2F54" stroke="#AE2F54" strokeWidth="1000">
      <path d="M2676 5578 c-23 -120 -93 -379 -131 -483 -77 -213 -225 -504 -341
-670 -19 -27 -51 -74 -72 -103 -20 -29 -46 -64 -57 -76 -11 -13 -40 -48 -65
-79 -68 -84 -346 -356 -509 -497 -423 -366 -578 -521 -743 -742 -41 -55 -133
-233 -163 -316 -47 -129 -65 -254 -65 -440 0 -460 130 -804 407 -1074 156
-153 329 -266 813 -536 93 -52 285 -177 379 -247 96 -72 301 -263 318 -298 7
-13 18 -18 38 -15 26 3 22 9 -93 125 -201 201 -358 312 -807 568 -233 133
-437 260 -476 297 -8 7 -37 31 -64 52 -218 170 -382 443 -446 741 -40 189 -50
524 -19 655 89 378 271 620 845 1120 347 304 455 408 640 621 47 53 178 240
241 342 159 256 280 543 358 850 46 180 53 227 32 227 -8 0 -18 -10 -20 -22z"/>
    </g>
    
    {/* Second line - translated to the right */}
    <g transform="translate(100.600000,560.000000) scale(0.100000,-0.100000)" fill="#AE2F54" stroke="#AE2F54" strokeWidth="1000">
      <path d="M2676 5578 c-23 -120 -93 -379 -131 -483 -77 -213 -225 -504 -341
-670 -19 -27 -51 -74 -72 -103 -20 -29 -46 -64 -57 -76 -11 -13 -40 -48 -65
-79 -68 -84 -346 -356 -509 -497 -423 -366 -578 -521 -743 -742 -41 -55 -133
-233 -163 -316 -47 -129 -65 -254 -65 -440 0 -460 130 -804 407 -1074 156
-153 329 -266 813 -536 93 -52 285 -177 379 -247 96 -72 301 -263 318 -298 7
-13 18 -18 38 -15 26 3 22 9 -93 125 -201 201 -358 312 -807 568 -233 133
-437 260 -476 297 -8 7 -37 31 -64 52 -218 170 -382 443 -446 741 -40 189 -50
524 -19 655 89 378 271 620 845 1120 347 304 455 408 640 621 47 53 178 240
241 342 159 256 280 543 358 850 46 180 53 227 32 227 -8 0 -18 -10 -20 -22z"/>
    </g>

    <g transform="translate(200.600000,560.000000) scale(0.100000,-0.100000)" fill="#AE2F54" stroke="#AE2F54" strokeWidth="1000">
      <path d="M2676 5578 c-23 -120 -93 -379 -131 -483 -77 -213 -225 -504 -341
-670 -19 -27 -51 -74 -72 -103 -20 -29 -46 -64 -57 -76 -11 -13 -40 -48 -65
-79 -68 -84 -346 -356 -509 -497 -423 -366 -578 -521 -743 -742 -41 -55 -133
-233 -163 -316 -47 -129 -65 -254 -65 -440 0 -460 130 -804 407 -1074 156
-153 329 -266 813 -536 93 -52 285 -177 379 -247 96 -72 301 -263 318 -298 7
-13 18 -18 38 -15 26 3 22 9 -93 125 -201 201 -358 312 -807 568 -233 133
-437 260 -476 297 -8 7 -37 31 -64 52 -218 170 -382 443 -446 741 -40 189 -50
524 -19 655 89 378 271 620 845 1120 347 304 455 408 640 621 47 53 178 240
241 342 159 256 280 543 358 850 46 180 53 227 32 227 -8 0 -18 -10 -20 -22z"/>
    </g>

    <g transform="translate(300.600000,560.000000) scale(0.100000,-0.100000)" fill="#AE2F54" stroke="#AE2F54" strokeWidth="1000">
      <path d="M2676 5578 c-23 -120 -93 -379 -131 -483 -77 -213 -225 -504 -341
-670 -19 -27 -51 -74 -72 -103 -20 -29 -46 -64 -57 -76 -11 -13 -40 -48 -65
-79 -68 -84 -346 -356 -509 -497 -423 -366 -578 -521 -743 -742 -41 -55 -133
-233 -163 -316 -47 -129 -65 -254 -65 -440 0 -460 130 -804 407 -1074 156
-153 329 -266 813 -536 93 -52 285 -177 379 -247 96 -72 301 -263 318 -298 7
-13 18 -18 38 -15 26 3 22 9 -93 125 -201 201 -358 312 -807 568 -233 133
-437 260 -476 297 -8 7 -37 31 -64 52 -218 170 -382 443 -446 741 -40 189 -50
524 -19 655 89 378 271 620 845 1120 347 304 455 408 640 621 47 53 178 240
241 342 159 256 280 543 358 850 46 180 53 227 32 227 -8 0 -18 -10 -20 -22z"/>
    </g>

    <g transform="translate(400.600000,560.000000) scale(0.100000,-0.100000)" fill="#AE2F54" stroke="#AE2F54" strokeWidth="1000">
      <path d="M2676 5578 c-23 -120 -93 -379 -131 -483 -77 -213 -225 -504 -341
-670 -19 -27 -51 -74 -72 -103 -20 -29 -46 -64 -57 -76 -11 -13 -40 -48 -65
-79 -68 -84 -346 -356 -509 -497 -423 -366 -578 -521 -743 -742 -41 -55 -133
-233 -163 -316 -47 -129 -65 -254 -65 -440 0 -460 130 -804 407 -1074 156
-153 329 -266 813 -536 93 -52 285 -177 379 -247 96 -72 301 -263 318 -298 7
-13 18 -18 38 -15 26 3 22 9 -93 125 -201 201 -358 312 -807 568 -233 133
-437 260 -476 297 -8 7 -37 31 -64 52 -218 170 -382 443 -446 741 -40 189 -50
524 -19 655 89 378 271 620 845 1120 347 304 455 408 640 621 47 53 178 240
241 342 159 256 280 543 358 850 46 180 53 227 32 227 -8 0 -18 -10 -20 -22z"/>
    </g>

    <g transform="translate(500.600000,560.000000) scale(0.100000,-0.100000)" fill="#AE2F54" stroke="#AE2F54" strokeWidth="1000">
      <path d="M2676 5578 c-23 -120 -93 -379 -131 -483 -77 -213 -225 -504 -341
-670 -19 -27 -51 -74 -72 -103 -20 -29 -46 -64 -57 -76 -11 -13 -40 -48 -65
-79 -68 -84 -346 -356 -509 -497 -423 -366 -578 -521 -743 -742 -41 -55 -133
-233 -163 -316 -47 -129 -65 -254 -65 -440 0 -460 130 -804 407 -1074 156
-153 329 -266 813 -536 93 -52 285 -177 379 -247 96 -72 301 -263 318 -298 7
-13 18 -18 38 -15 26 3 22 9 -93 125 -201 201 -358 312 -807 568 -233 133
-437 260 -476 297 -8 7 -37 31 -64 52 -218 170 -382 443 -446 741 -40 189 -50
524 -19 655 89 378 271 620 845 1120 347 304 455 408 640 621 47 53 178 240
241 342 159 256 280 543 358 850 46 180 53 227 32 227 -8 0 -18 -10 -20 -22z"/>
    </g>

    <g transform="translate(600.600000,560.000000) scale(0.100000,-0.100000)" fill="#AE2F54" stroke="#AE2F54" strokeWidth="1000">
      <path d="M2676 5578 c-23 -120 -93 -379 -131 -483 -77 -213 -225 -504 -341
-670 -19 -27 -51 -74 -72 -103 -20 -29 -46 -64 -57 -76 -11 -13 -40 -48 -65
-79 -68 -84 -346 -356 -509 -497 -423 -366 -578 -521 -743 -742 -41 -55 -133
-233 -163 -316 -47 -129 -65 -254 -65 -440 0 -460 130 -804 407 -1074 156
-153 329 -266 813 -536 93 -52 285 -177 379 -247 96 -72 301 -263 318 -298 7
-13 18 -18 38 -15 26 3 22 9 -93 125 -201 201 -358 312 -807 568 -233 133
-437 260 -476 297 -8 7 -37 31 -64 52 -218 170 -382 443 -446 741 -40 189 -50
524 -19 655 89 378 271 620 845 1120 347 304 455 408 640 621 47 53 178 240
241 342 159 256 280 543 358 850 46 180 53 227 32 227 -8 0 -18 -10 -20 -22z"/>
    </g>
  </svg>
);

export default function Component() {
  return (
    <div className="h-screen bg-[#ffffff] overflow-hidden relative">
      {/* Flowy curved line and blue background */}
      <WaveShape />

      <div className="container mx-auto px-0 py-10 h-full paddingtop-[-100] relative z-10">
        {/* Header */}
        <div className="flex items-center gap-0 mb-16">
          <Image src={logo} alt="Methodist Healthcare Ministries" width={150} height={150} />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center my-0 h-full py-[-px] py-[-] py-[0px-] py-[0px--] py-[0px-] py-[0p]">
          {/* Left Content */}
          <div className="space-y-2">
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold text-[#142257] leading-tight">
                Methodist
                <br />
                Healthcare
                <br />
                Ministries
              </h1>

              <div className="inline-flex items-center gap-3 bg-[#15b2f5] text-white px-6 py-3 rounded-2xl">
                <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>
                <span className="font-semibold text-lg">Learn More</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-[#142257] mb-2">50+</div>
                <div className="text-[#74848b] text-lg">Unique Blocks</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-[#142257] mb-2">100+</div>
                <div className="text-[#74848b] text-lg">Components</div>
              </div>
            </div>
          </div>

          {/* Right Bulletin Board */}
          <div className="relative h-full flex items-center justify-center">
            {/* Central Video Box */}
            <div className="relative w-80 h-48 bg-white rounded-xl shadow-2xl z-20 transform rotate-1">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=192&width=320"
                  alt="Video"
                  width={320}
                  height={192}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-[#15b2f5] ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm font-semibold">Methodist Healthcare Ministries</div>
                  <div className="text-xs opacity-90">Watch our latest project</div>
                </div>
              </div>
            </div>

            {/* Image Box 1 - Top Left with Stats */}
            <div className="absolute top-16 left-8 w-56 h-32 bg-white rounded-xl shadow-lg transform -rotate-12 z-15">
              <div className="p-4 h-full flex">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-[#15b2f5] mb-1">240+</div>
                  <div className="text-xs text-[#74848b] mb-2">Satisfied Clients</div>
                  <div className="text-2xl font-bold text-[#142257]">99%</div>
                  <div className="text-xs text-[#74848b]">Success Rate</div>
                </div>
                <div className="w-16 h-16 bg-[#d5dcdf] rounded-lg flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt="Happy customer"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Image Box 2 - Top Right */}
            <div className="absolute top-8 right-4 w-48 h-36 bg-white rounded-xl shadow-lg transform rotate-8 z-15">
              <div className="p-4">
                <Image
                  src="/placeholder.svg?height=80&width=160"
                  alt="Solar panel installation"
                  width={160}
                  height={80}
                  className="w-full h-20 object-cover rounded-lg mb-2"
                />
                <div className="text-sm font-semibold text-[#142257]">Solar Panel Installation</div>
                <div className="text-xs text-[#74848b]">Professional & Efficient</div>
              </div>
            </div>

            {/* Image Box 3 - Bottom Left */}
            <div className="absolute bottom-20 left-12 w-52 h-40 bg-white rounded-xl shadow-lg transform rotate-6 z-15">
              <div className="p-4">
                <Image
                  src="/placeholder.svg?height=96&width=176"
                  alt="Home renovation"
                  width={176}
                  height={96}
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <div className="text-sm font-semibold text-[#142257] mb-1">Complete Home Renovation</div>
                <div className="text-xs text-[#74848b]">Transform your living space</div>
              </div>
            </div>

            {/* Image Box 4 - Bottom Right with Stats */}
            <div className="absolute bottom-12 right-8 w-60 h-36 bg-white rounded-xl shadow-lg transform -rotate-4 z-15">
              <div className="p-4 h-full flex">
                <div className="w-20 h-20 bg-[#d5dcdf] rounded-lg flex-shrink-0 mr-3">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Professional team"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-[#15b2f5] mb-1">20+</div>
                  <div className="text-xs text-[#74848b] mb-2">Years Experience</div>
                  <div className="text-2xl font-bold text-[#142257]">500+</div>
                  <div className="text-xs text-[#74848b]">Projects Completed</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-32 right-20 w-3 h-3 bg-white/60 rounded-full transform rotate-45"></div>
            <div className="absolute bottom-32 left-20 w-2 h-2 bg-white/40 rounded-full"></div>
            <div className="absolute top-1/2 right-12 w-4 h-4 bg-white/50 rounded-full transform -rotate-12"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
