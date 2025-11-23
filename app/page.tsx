"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const controls = useAnimation();
  const [phase, setPhase] = useState<"initial" | "zoom">("initial");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sequence = async () => {
      // Initial top-down sweep
      await controls.start({
        y: ["-100vh", "0vh"],
        transition: { duration: 3, ease: "easeOut" }
      });

      // Pause
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Zoom in phase
      setPhase("zoom");
      await controls.start({
        scale: [1, 2.2],
        y: ["0vh", "20vh"],
        transition: { duration: 3, ease: "easeInOut" }
      });
    };

    sequence();
  }, [controls]);

  const dustParticles = mounted ? [...Array(15)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${100 + Math.random() * 20}%`,
    duration: 8 + Math.random() * 4,
    delay: Math.random() * 8,
    xOffset: (Math.random() - 0.5) * 100,
  })) : [];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50">
      {/* Dust particles */}
      {mounted && dustParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-amber-200/40 rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -1000],
            x: [0, particle.xOffset],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Main animated container */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={controls}
      >
        <div className="relative w-[90vw] h-[90vh] max-w-[500px] max-h-[888px]">
          {/* Rattan carpet background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-[80%] h-[80%] rounded-full"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(160, 120, 80, 0.3) 0%, transparent 50%),
                  repeating-conic-gradient(
                    from 0deg,
                    #D4A574 0deg,
                    #C19A6B 2deg,
                    #D4A574 4deg
                  )
                `,
                boxShadow: "inset 0 0 80px rgba(139, 90, 43, 0.15)",
              }}
            />
          </div>

          {/* Sunlight gradient from side */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(255, 245, 220, 0.6) 0%, transparent 60%)",
            }}
          />

          {/* Animated leaf shadows */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-30"
            animate={{
              x: [0, 15, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Monstera leaf shadow */}
            <div
              className="absolute top-[10%] right-[15%] w-40 h-40"
              style={{
                background: `radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, transparent 70%)`,
                clipPath: `polygon(
                  50% 0%, 55% 15%, 70% 10%, 60% 25%, 80% 30%,
                  65% 40%, 85% 50%, 65% 60%, 75% 75%,
                  55% 65%, 50% 85%, 45% 65%, 25% 75%,
                  35% 60%, 15% 50%, 35% 40%, 20% 30%,
                  40% 25%, 30% 10%, 45% 15%
                )`,
              }}
            />

            {/* Palm leaf shadow */}
            <div
              className="absolute top-[20%] left-[20%] w-32 h-48"
              style={{
                background: `linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, transparent 100%)`,
                clipPath: `polygon(
                  45% 0%, 55% 0%, 52% 20%, 60% 25%,
                  57% 35%, 65% 40%, 60% 50%, 55% 60%,
                  52% 75%, 50% 100%, 48% 75%, 45% 60%,
                  40% 50%, 35% 40%, 43% 35%, 40% 25%, 48% 20%
                )`,
              }}
            />
          </motion.div>

          {/* T-shirt */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%]">
            {/* White t-shirt base */}
            <div
              className="relative w-full h-full"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)",
                clipPath: `polygon(
                  30% 5%, 70% 5%, 75% 10%, 85% 15%, 90% 20%,
                  90% 85%, 85% 90%, 75% 93%, 70% 95%, 30% 95%,
                  25% 93%, 15% 90%, 10% 85%, 10% 20%, 15% 15%, 25% 10%
                )`,
                boxShadow: `
                  0 10px 40px rgba(0, 0, 0, 0.08),
                  inset -5px -5px 20px rgba(0, 0, 0, 0.02),
                  inset 5px 5px 20px rgba(255, 255, 255, 0.9)
                `,
              }}
            >
              {/* Fabric texture */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.01) 1px, rgba(0,0,0,0.01) 2px),
                    repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.01) 1px, rgba(0,0,0,0.01) 2px)
                  `,
                }}
              />

              {/* Graphic design on back (visible in zoom phase) */}
              {phase === "zoom" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[50%] h-[40%]"
                >
                  {/* Abstract minimalist design */}
                  <div className="relative w-full h-full flex flex-col items-center justify-center gap-2">
                    {/* Sun icon */}
                    <div className="w-12 h-12 rounded-full border-2 border-amber-700 relative">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-amber-700 origin-left"
                          style={{
                            transform: `rotate(${i * 45}deg) translateX(-50%)`,
                          }}
                        />
                      ))}
                    </div>
                    {/* Text */}
                    <div className="text-amber-900 font-bold text-xs tracking-widest">
                      SUMMER
                    </div>
                    <div className="text-amber-800 text-[8px] tracking-wider">
                      COLLECTION
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Sleeve folds */}
              <div
                className="absolute top-[8%] right-[12%] w-16 h-8 opacity-10"
                style={{
                  background: "radial-gradient(ellipse, #000 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute top-[8%] left-[12%] w-16 h-8 opacity-10"
                style={{
                  background: "radial-gradient(ellipse, #000 0%, transparent 70%)",
                }}
              />
            </div>
          </div>

          {/* Black watch */}
          <motion.div
            className="absolute top-[60%] left-[25%] w-16 h-20"
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Watch face */}
            <div
              className="w-12 h-12 rounded-lg mx-auto"
              style={{
                background: "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)",
                boxShadow: `
                  0 4px 15px rgba(0, 0, 0, 0.3),
                  inset 1px 1px 2px rgba(255, 255, 255, 0.1)
                `,
              }}
            >
              <div className="w-full h-full rounded-lg border border-gray-700 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gray-900 border border-gray-600" />
              </div>
            </div>
            {/* Watch straps */}
            <div className="w-6 h-4 bg-black mx-auto -mt-2 rounded-sm" />
            <div className="w-6 h-4 bg-black mx-auto mt-8 rounded-sm" />
          </motion.div>

          {/* Black sunglasses */}
          <motion.div
            className="absolute top-[35%] right-[22%] w-20 h-8"
            animate={{
              rotate: [-15, -13, -15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transform: "rotate(-15deg)",
            }}
          >
            <div className="relative w-full h-full">
              {/* Lenses */}
              <div className="flex gap-1 items-center">
                <div
                  className="w-9 h-7 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
                  }}
                />
                <div className="w-1 h-0.5 bg-black" />
                <div
                  className="w-9 h-7 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
                  }}
                />
              </div>
              {/* Arms */}
              <div className="absolute top-1/2 -left-1 w-2 h-0.5 bg-black -translate-y-1/2" />
              <div className="absolute top-1/2 -right-1 w-2 h-0.5 bg-black -translate-y-1/2" />
            </div>
          </motion.div>

          {/* Soft vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.1) 100%)",
            }}
          />
        </div>
      </motion.div>

      {/* Brand text overlay - appears at the end */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "zoom" ? 1 : 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center z-10"
      >
        <div className="text-amber-900 font-bold text-2xl tracking-wider mb-1">
          SUMMER VIBES
        </div>
        <div className="text-amber-700 text-sm tracking-widest">
          Fresh · Clean · Minimal
        </div>
      </motion.div>
    </div>
  );
}
