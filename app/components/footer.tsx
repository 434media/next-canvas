import Image from "next/image"
import 'remixicon/fonts/remixicon.css'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 border-t border-white/10 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
              alt="Digital Canvas Logo"
              width={150}
              height={40}
              className="mb-4"
            />
            <p className="text-white/70 text-sm text-center md:text-left">
                Where Creativity Meets Technology
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <a href="/coworking-space" className="text-white/70 hover:text-white transition-colors">
                  Coworking Space
                </a>
              </li>
              <li>
                <a href="https://lu.ma/digitalcanvas" className="text-white/70 hover:text-white transition-colors">
                  Community Calendar
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://discord.gg/SCfmebDfW6" className="text-white/70 hover:text-white transition-colors">
                <i className="ri-discord-fill text-2xl"></i>
              </a>
              <a href="https://www.instagram.com/digitalcanvas.community/" className="text-white/70 hover:text-white transition-colors">
                <i className="ri-instagram-line text-2xl"></i>
              </a>
              <a href="https://x.com/digitalcanvas__" className="text-white/70 hover:text-white transition-colors">
                <i className="ri-twitter-x-line text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">&copy; {year} Digital Canvas. All rights reserved.</p>
        </div>
      </div>
      {/* Wireframe grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>
    </footer>
  )
}

export default Footer

