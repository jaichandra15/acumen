"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { Navigation } from "@/components/navigation"
import { ParallaxHills } from "@/components/parallax-hills"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const [hasScrolled, setHasScrolled] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Text animations
  const textScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.5])
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -100])

  // Vision section animations
  const visionOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])
  const visionY = useTransform(scrollYProgress, [0.2, 0.3], [100, 0])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="text-white">
      {/* Navigation */}
      <Navigation />

      {/* Purple gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 to-black pointer-events-none z-0" />

      {/* Intro Section with ACUMEN text and parallax hills */}
      <div
        id="home"
        ref={introRef}
        className="h-screen flex items-center justify-center relative overflow-hidden bg-purple-radial sticky top-0"
      >
        {/* Parallax Hills Component */}
        <ParallaxHills />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <motion.div
            className="flex flex-col items-center"
            style={{
              scale: textScale,
              opacity: textOpacity,
              y: textY,
            }}
          >
            <h1 className="text-8xl md:text-9xl font-bold tracking-tighter gradient-text purple-glow">ACUMEN</h1>
            <p className="text-3xl md:text-4xl mt-4 gradient-text purple-glow">2025</p>
          </motion.div>
        </div>
      </div>

      {/* Vision Section - Revealed as hills part */}
      <motion.div
        id="vision"
        className="min-h-screen flex flex-col items-center justify-center relative z-10 bg-purple-gradient"
        style={{
          opacity: visionOpacity,
          y: visionY,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/30 to-black opacity-70" />

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 gradient-text purple-glow">Vision</h2>
            <p className="text-xl md:text-2xl text-gray-300">
              Clarity of thought and strategic foresight that guides our path forward. At ACUMEN 2025, we envision a
              future where technology and humanity converge to create unprecedented opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-purple-900/30">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Innovation</h3>
              <p className="text-gray-300">
                Pushing boundaries and exploring new frontiers in technology and business.
              </p>
            </div>

            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-purple-900/30">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Collaboration</h3>
              <p className="text-gray-300">Bringing together diverse minds to solve complex challenges collectively.</p>
            </div>

            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-purple-900/30">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Impact</h3>
              <p className="text-gray-300">Creating meaningful change that resonates beyond technology into society.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rest of the sections */}
      <div id="events">
        <ParallaxSection
          title="Events"
          description="Join our exclusive gatherings where innovation meets opportunity. Our events bring together the brightest minds to share insights and forge connections that drive progress."
          imageUrl="/placeholder.svg?height=600&width=800"
          reverse={true}
        />
      </div>

      <div id="organizers">
        <ParallaxSection
          title="Organizers"
          description="Meet the visionaries behind our mission. Our team of dedicated professionals brings decades of combined experience to create meaningful experiences and drive impactful initiatives."
          imageUrl="/placeholder.svg?height=600&width=800"
          reverse={false}
        />
      </div>

      <div
        className="h-screen flex flex-col items-center justify-center p-8 text-center bg-purple-radial relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Add a dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>
        <h2 className="text-5xl md:text-7xl font-bold mb-8 gradient-text purple-glow relative z-10">
          Begin Your Journey
        </h2>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-gray-300 relative z-10">
          Discover how our acumen can transform your vision into reality.
        </p>
        <button className="px-8 py-4 relative z-10 font-bold text-lg rounded-full transition-all hover:scale-105 bg-gradient-to-r from-purple-900 to-purple-600 hover:from-purple-800 hover:to-purple-500 text-white shadow-lg hover:shadow-purple-500/25">
          Get Started
        </button>
      </div>
    </div>
  )
}

interface ParallaxSectionProps {
  title: string
  description: string
  imageUrl: string
  reverse?: boolean
}

function ParallaxSection({ title, description, imageUrl, reverse = false }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  // Generate a unique background image for each section
  const bgImageUrl = `/placeholder.svg?height=1080&width=1920&text=${title}`

  return (
    <div
      ref={sectionRef}
      className={cn(
        "min-h-screen flex flex-col md:flex-row items-center justify-center p-8 gap-8 relative bg-purple-gradient",
        reverse && "md:flex-row-reverse",
      )}
      style={{
        backgroundImage: `url('${bgImageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Add a dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

      <div className="absolute inset-0 opacity-30">
        <div
          className={`absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/40 to-transparent ${reverse ? "opacity-70" : "opacity-40"}`}
        />
        <div
          className={`absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-purple-900/40 to-transparent ${!reverse ? "opacity-70" : "opacity-40"}`}
        />
      </div>

      <div className="flex-1 max-w-xl relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">{title}</h2>
        <p className="text-xl text-gray-300">{description}</p>
      </div>

      <motion.div className="flex-1 overflow-hidden rounded-lg relative z-10" style={{ y }}>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-transparent mix-blend-overlay rounded-lg pointer-events-none" />
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-auto object-cover rounded-lg shadow-lg shadow-purple-900/20"
        />
      </motion.div>
    </div>
  )
}

