'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVolumeMute, FaVolumeUp, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

// === ROTATING TEXT OPTIONS ===
const rollingTexts = [
  "We engineer high-performance digital experiences that scale.",
  "Designing and building websites that convert and grow businesses.",
  "Crafting bold brand identities that earn trust and recognition.",
  "Developing scalable apps and cloud systems for long-term success.",
  "Powering growth with clean code, speed, and reliability.",
  "Turning ideas into production-ready digital platforms.",
  "Helping ambitious brands launch, scale, and lead online."
];

export default function Hero() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null); // New Audio Reference
  const [textIndex, setTextIndex] = useState(0);

  // 1. CHECK SESSION STORAGE ON MOUNT
  useEffect(() => {
    const visited = sessionStorage.getItem('hasEnteredSite');
    if (visited) {
      setHasEntered(true);
    }
  }, []);

  // 2. FORCE AUDIO PLAY ON ENTRY
  useEffect(() => {
    if (hasEntered) {
      // Play Video (Muted)
      if (videoRef.current) {
        videoRef.current.muted = true; // Always mute the video track
        videoRef.current.play().catch(() => {});
      }
      // Play Separate Audio (Low Volume)
      if (audioRef.current) {
        audioRef.current.volume = 0.2; // Set volume to 20% (Very Calm)
        audioRef.current.play().catch((e) => console.log("Audio play error:", e));
      }
    }
  }, [hasEntered]);

  // 3. Lock scrolling
  useEffect(() => {
    if (!hasEntered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [hasEntered]);

  // 4. Auto-rotate text
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rollingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // === ENTER SITE HANDLER ===
  const handleEnter = () => {
    // 1. Play Video (Visuals only)
    if (videoRef.current) {
      videoRef.current.muted = true; 
      videoRef.current.play().catch(() => {});
    }

    // 2. Play Music (Audio only)
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // Start at 20%
      audioRef.current.play().catch((e) => console.log("Play error:", e));
    }

    setHasEntered(true);
    sessionStorage.setItem('hasEnteredSite', 'true');
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        // Unmute
        audioRef.current.volume = 0.2; // Return to low volume
        audioRef.current.muted = false;
      } else {
        // Mute
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-transparent flex items-center justify-center">
      
      {/* === NEW: SEPARATE AUDIO PLAYER === */}
      {/* Ensure you add 'hero-music.mp3' to your public folder */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/hero-music.mp3" type="audio/mp3" />
      </audio>

      {/* === 1. PREMIUM ENTRY OVERLAY === */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center cursor-pointer overflow-hidden"
            onClick={handleEnter}
          >
            {/* Atmospheric Background Glow */}
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-center relative z-10 px-6"
            >
              <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                  PIXALARA
                </span>
              </h1>

              <div className="space-y-2 mb-16">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-2xl md:text-4xl text-white font-light tracking-tight"
                >
                  Digital Experiences.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-2xl md:text-4xl text-gray-500 font-bold tracking-tight"
                >
                  Engineered to <span className="text-white">Scale.</span>
                </motion.p>
              </div>
              
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="group relative inline-flex items-center gap-4 px-10 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-500"
              >
                <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-gray-300 group-hover:text-white transition-colors">
                  Enter Site
                </span>
                <FaArrowRight className="text-gray-500 group-hover:translate-x-1 group-hover:text-cyan-400 transition-all duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* === 2. MAIN HERO CONTENT === */}
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10" />
        <video 
          ref={videoRef}
          preload="auto"
          loop 
          muted // ALWAYS MUTED - We use separate audio now
          playsInline 
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main Text Content */}
      {hasEntered && (
        <>
          <div className="relative z-20 text-center px-4 max-w-5xl">
            <motion.h1 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className="text-5xl md:text-8xl font-extrabold text-white tracking-tighter leading-tight mb-6"
            >
              WE BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600">
                DIGITAL EMPIRES
              </span>
            </motion.h1>

            {/* Rolling Text */}
            <div className="h-20 md:h-24 overflow-hidden relative mb-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={textIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto absolute w-full font-medium"
                >
                  {rollingTexts[textIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
               <Link href="/contact">
                <button className="bg-red-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-600/30">
                  Get Started
                </button>
               </Link>
            </motion.div>
          </div>

          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={toggleAudio}
            className="absolute bottom-10 right-10 z-30 bg-white/10 backdrop-blur-md p-4 rounded-full text-white hover:bg-white/20 transition-all border border-white/20 group"
          >
            {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
          </motion.button>
        </>
      )}
    </section>
  );
}