"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ParallaxHills() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  })


  const hill1X = 0
  const hill2X = useTransform(scrollYProgress, [0, 0.3], [0, -1500]) // Move right
  const hill3X = useTransform(scrollYProgress, [0, 0.3], [0, 1200]) // Move left
  const hill4X = useTransform(scrollYProgress, [0, 0.3], [0, -1200]) // Move right
  const hill5X = useTransform(scrollYProgress, [0, 0.3], [0, 1000]) // Move left

  // Opacity transforms for smooth transition
  const hillsOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3], [1, 0.8, 0])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-purple-800/10 to-black z-0" />

      {/* Hill 1 - Furthest back, moves left */}
      <motion.div className="absolute bottom-0 left-0 right-0 w-full z-1" style={{ x: hill1X, opacity: hillsOpacity }}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hill1-vHa7wY4thpbx8pfhVDRBTnmzeWGkmA.png"
          alt="Mountain silhouette"
          className="w-full h-auto object-cover object-bottom"
        />
      </motion.div>

      {/* Hill 2 - Moves right */}
      <motion.div className="absolute bottom-0 left-0 right-0 w-full z-2" style={{ x: hill2X, opacity: hillsOpacity }}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hill2-zmCA8iuyq24mJzFKljhrcXaPD7swC0.png"
          alt="Mountain silhouette"
          className="w-full h-auto object-cover object-bottom"
        />
      </motion.div>

      {/* Hill 3 - Moves left */}
      <motion.div className="absolute bottom-0 left-0 right-0 w-full z-3" style={{ x: hill3X, opacity: hillsOpacity }}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hill3-MzJ4huQqdZ7KhKtSwAvC0GQxyJOdvF.png"
          alt="Mountain silhouette"
          className="w-full h-auto object-cover object-bottom"
        />
      </motion.div>

      {/* Hill 4 - Moves right */}
      <motion.div className="absolute bottom-0 left-0 right-0 w-full z-4" style={{ x: hill4X, opacity: hillsOpacity }}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hill4-3DgrWgiMj1p1PX0sxKc0TfiXtk4KTi.png"
          alt="Mountain silhouette"
          className="w-full h-auto object-cover object-bottom"
        />
      </motion.div>

      {/* Hill 5 - Closest to viewer, moves left */}
      <motion.div className="absolute bottom-0 left-0 right-0 w-full z-5" style={{ x: hill5X, opacity: hillsOpacity }}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hill5-dvlNrpaNtOBBok9vxJ6ZDXZjqdZRxX.png"
          alt="Mountain silhouette"
          className="w-full h-auto object-cover object-bottom"
        />
      </motion.div>

      {/* Purple overlay for consistent theme */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-purple-900/30 mix-blend-overlay z-6" />
    </div>
  )
}

