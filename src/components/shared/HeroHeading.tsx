'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; 

const WORDS = [
  "manage expenses",
  "claim fuel",
  "save tax",
  "book LTA",
  "generate bills",
];

export function HeroHeading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center mb-8">
      
      {/* Line 1: The Setup (Static & Stable) */}
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
        Every tool you need to
      </h1>
      
      {/* Line 2: The Punchline (Animated & Centered) */}
      {/* We use a fixed height container to prevent vertical layout shifts */}
      <div className="relative h-[1.2em] w-full flex items-center justify-center overflow-visible">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0, filter: 'blur(8px)', scale: 0.9 }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ y: -20, opacity: 0, filter: 'blur(8px)', scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            
            // ABSOLUTE positioning keeps it centered exactly in the container
            // WHITESPACE-NOWRAP ensures "generate bills" doesn't break into two lines
            className="absolute text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-300% animate-text-shimmer bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 whitespace-nowrap"
            style={{ backgroundSize: '200% auto' }}
          >
            {WORDS[index]}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}