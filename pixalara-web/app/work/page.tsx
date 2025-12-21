'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';
import Link from 'next/link';

// === PROJECT DATA ===
const projects = [
  {
    id: 1,
    title: "Pixalara Growth School",
    category: "EdTech Platform",
    desc: "A learning platform focused on DevOps, Cloud, and SRE training with real-world labs, scalable infrastructure, and a performance-first UI.",
    link: "https://growthschool.pixalara.com",
    status: "live",
    // Image: Student/Learning with Tech Vibe
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: 2,
    title: "Fine Tech Power Controls",
    category: "Industrial Website",
    desc: "A corporate website for an electrical and power solutions company, designed for credibility, clarity, and lead generation.",
    link: "https://finetechpowercontrols.com",
    status: "live",
    // Image: High-Quality Industrial Power/Factory
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "NexStore E-Commerce",
    category: "Coming Soon",
    desc: "A next-gen shopping experience with AI recommendations and seamless checkout. Launching soon.",
    status: "wip",
    // Image: Modern Shopping/Fashion
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "GoBus Booking App",
    category: "Coming Soon",
    desc: "A smart bus booking application featuring real-time tracking and instant seat reservation.",
    status: "wip",
    // Image: Travel/Map/Bus
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop",
  },
];

// === 3D TILT CARD COMPONENT ===
const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse Position State
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth Spring Animation for Tilt
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  // Calculate Rotation
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.1, 0.9]); 

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const normalizedX = (e.clientX - rect.left) / width - 0.5;
    const normalizedY = (e.clientY - rect.top) / height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }} 
      className={`group relative ${project.status === 'live' ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {/* 3D ROTATING CARD */}
      <motion.div
        style={{ rotateX, rotateY, filter: `brightness(${brightness})` }}
        className="w-full h-[220px] md:h-[280px] rounded-[1.5rem] bg-neutral-900 relative overflow-hidden mb-6 border border-white/10 shadow-2xl transition-all duration-200"
      >
        
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
          />
          {/* Dark Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300" />
        </div>

        {/* Animated Gloss Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />

        {/* MODERN BUTTON OVERLAY */}
        <div className="absolute inset-0 flex items-center justify-center z-30">
           
           {project.status === 'live' && project.link && (
             <a 
               href={project.link}
               target="_blank"
               rel="noopener noreferrer"
               className="bg-white/90 backdrop-blur-md text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300 text-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0"
             >
                View Live Site <FaExternalLinkAlt className="text-xs" />
             </a>
           )}

           {project.status === 'wip' && (
             <div className="bg-black/60 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 cursor-default shadow-lg text-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0">
                Coming Soon <FaClock className="text-xs" />
             </div>
           )}
        </div>
      </motion.div>

      {/* Project Info */}
      <div className="flex justify-between items-start px-2 group-hover:translate-x-2 transition-transform duration-300">
        <div>
          <h3 className="text-lg md:text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed">{project.desc}</p>
        </div>
        <span className={`hidden md:block text-xs font-bold border px-3 py-1.5 rounded-full uppercase tracking-widest ${project.status === 'wip' ? 'text-gray-500 border-white/10' : 'text-white border-white/30'}`}>
          {project.category}
        </span>
      </div>
    </motion.div>
  );
};

export default function WorkPage() {
  return (
    // UPDATED: Removed bottom padding (pb-0) to allow seamless blend into Footer
    <main className="min-h-screen pt-24 pb-0 px-6 relative overflow-hidden">
      
      {/* === BACKGROUND ATMOSPHERE === */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
         <motion.div 
           animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} 
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-20 left-10 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" 
         />
         <motion.div 
           animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }} 
           transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[150px]" 
         />
      </div>

      {/* === HEADER === */}
      <div className="max-w-7xl mx-auto mb-24 text-center md:text-left relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-cyan-400 font-bold tracking-widest uppercase mb-4"
        >
          Selected Works
        </motion.p>
        
        {/* STAGGERED TEXT REVEAL */}
        <motion.h1 
          className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-tight mb-8"
        >
          <motion.span 
             initial={{ opacity: 0, y: 30 }} 
             animate={{ opacity: 1, y: 0 }} 
             transition={{ delay: 0.1 }}
          >
            MADE BY
          </motion.span> <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 inline-block">
             {Array.from("PIXALARA.").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (i * 0.05) }} 
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
             ))}
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }} 
          className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed"
        >
          We don't just build websites. We engineer <span className="text-white font-bold">digital breakthroughs.</span> From immersive 3D worlds to high-frequency fintech dashboards, this is where code meets art.
        </motion.p>
      </div>

      {/* === PROJECTS GRID === */}
      {/* Added mb-20 to give some space before the fade-out */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-20 mb-20 relative z-10">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* === PREMIUM BLENDING EFFECT === */}
      {/* Replaced the hard CTA with a soft atmospheric transition that flows into the Footer */}
      <div className="relative w-full h-40 mt-10">
        
        {/* 1. Atmospheric Glow connecting to the Footer's 'Get a Quote' section */}
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-purple-900/20 blur-[120px] pointer-events-none z-0" />
        
        {/* 2. Soft Gradient Fade at the very bottom to blend into black */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
      </div>

    </main>
  );
}