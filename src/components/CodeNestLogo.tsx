"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function CodeNestLogo() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <Link href="/" className="flex items-center gap-3 sm:gap-4 group relative flex-shrink-0">
      {/* Ambient glow effect */}
      <div
        className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 
        rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl animate-pulse"
      />
      
      {/* Main logo container */}
      <div className="relative flex items-center gap-3 sm:gap-4">
        {/* Logo icon with nested elements */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Outer ring - rotating */}
          <motion.div
            className="absolute -inset-2 rounded-2xl border border-blue-500/30 opacity-0 group-hover:opacity-100"
            animate={isMounted ? { rotate: 360 } : {}}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Icon container */}
          <div
            className="relative bg-gradient-to-br from-[#1a1a2e] via-[#2a2a3e] to-[#0a0a0f] 
            p-3 sm:p-4 rounded-xl sm:rounded-2xl ring-1 ring-white/10 group-hover:ring-blue-400/30 
            transition-all duration-500 shadow-lg shadow-black/50 group-hover:shadow-blue-500/20"
          >
            {/* Custom CodeNest Icon */}
            <div className="relative w-6 h-6 sm:w-8 sm:h-8">
              {/* Background geometric pattern */}
              <svg
                viewBox="0 0 32 32"
                className="w-full h-full text-blue-400 group-hover:text-blue-300 transition-colors duration-500"
                fill="currentColor"
              >
                {/* Nest structure */}
                <motion.path
                  d="M8 4 L24 4 C26.2 4 28 5.8 28 8 L28 24 C28 26.2 26.2 28 24 28 L8 28 C5.8 28 4 26.2 4 24 L4 8 C4 5.8 5.8 4 8 4 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="60"
                  strokeDashoffset="60"
                  className="group-hover:animate-pulse"
                  animate={{
                    strokeDashoffset: [60, 0, 60],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Inner code brackets */}
                <motion.g
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Left bracket */}
                  <path
                    d="M12 10 L9 10 C8.4 10 8 10.4 8 11 L8 21 C8 21.6 8.4 22 9 22 L12 22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Right bracket */}
                  <path
                    d="M20 10 L23 10 C23.6 10 24 10.4 24 11 L24 21 C24 21.6 23.6 22 23 22 L20 22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Center slash */}
                  <motion.path
                    d="M18 12 L14 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isMounted ? { pathLength: 1 } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  />
                </motion.g>
                
                {/* Decorative dots */}
                <motion.circle
                  cx="16" cy="6" r="1"
                  className="text-purple-400"
                  fill="currentColor"
                  animate={isMounted ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0,
                  }}
                />
                <motion.circle
                  cx="26" cy="16" r="1"
                  className="text-cyan-400"
                  fill="currentColor"
                  animate={isMounted ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.7,
                  }}
                />
                <motion.circle
                  cx="6" cy="16" r="1"
                  className="text-pink-400"
                  fill="currentColor"
                  animate={isMounted ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1.4,
                  }}
                />
              </svg>
              
              {/* Inner glow */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 
                rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* Brand text */}
        <div className="flex flex-col relative">
          {/* Main brand name */}
          <motion.div
            className="relative"
            whileHover={{ y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span
              className="block text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r 
              from-blue-400 via-blue-300 to-purple-400 group-hover:from-blue-300 
              group-hover:via-purple-300 group-hover:to-cyan-300 text-transparent 
              bg-clip-text transition-all duration-500 tracking-tight"
            >
              Code
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                Nest
              </span>
            </span>
            
            {/* Underline effect */}
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 
              opacity-0 group-hover:opacity-100 transition-all duration-500"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.span
            className="text-xs sm:text-sm text-blue-400/70 group-hover:text-blue-300/90 
            font-medium transition-all duration-500 tracking-wide"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1, y: -0.5 }}
            transition={{ duration: 0.3 }}
          >
            <span className="hidden sm:inline">Interactive </span>
            Code Editor
            <motion.span
              className="inline-block ml-1 text-purple-400"
              animate={isMounted ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 2,
              }}
            >
              ✨
            </motion.span>
          </motion.span>
          
          {/* Version badge */}
          <motion.div
            className="absolute -top-1 -right-8 sm:-right-12 opacity-0 group-hover:opacity-100 
            transition-all duration-500"
            initial={{ scale: 0, rotate: -12 }}
            whileHover={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span
              className="text-[10px] px-1.5 py-0.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 
              text-green-400 rounded-full border border-green-500/30 font-bold tracking-wider"
            >
              BETA
            </span>
          </motion.div>
        </div>
      </div>

      {/* Floating particles effect */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          {[
            { x: 20, y: 15, endX: 80, endY: 40 },
            { x: 60, y: 25, endX: 120, endY: 60 },
            { x: 40, y: 35, endX: 100, endY: 80 }
          ].map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              initial={{
                x: particle.x,
                y: particle.y,
                opacity: 0,
              }}
              animate={{
                x: particle.endX,
                y: particle.endY,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </Link>
  );
}

export default CodeNestLogo;