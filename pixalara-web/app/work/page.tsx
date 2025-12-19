'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
// FIXED IMPORTS
import { FaExternalLinkAlt } from 'react-icons/fa';
import { FaArrowRight, FaClock, FaGraduationCap, FaIndustry, FaCube, FaShapes } from 'react-icons/fa6';
import Link from 'next/link';

// === PROJECT DATA ===
const projects = [
  {
    id: 1,
    title: "Pixalara Growth School",
    category: "EdTech Platform",
    desc: "A learning platform focused on DevOps, Cloud, and SRE training with real-world labs, scalable infrastructure, and a performance-first UI.",
    gradient: "from-cyan-500 to-blue-600",
    link: "https://growthschool.pixalara.com",
    status: "live",
    icon: <FaGraduationCap />,
  },
  {
    id: 2,
    title: "Finetech Power Controls",
    category: "Industrial Website",
    desc: "A corporate website for an electrical and power solutions company, designed for credibility, clarity, and lead generation.",
    gradient: "from-orange-500 to-red-600",
    link: "https://finetechpowercontrols.com",
    status: "live",
    icon: <FaIndustry />,
  },
  {
    id: 3,
    title: "Work in Progress",
    category: "Upcoming Project",
    desc: "We’re currently engineering a new digital platform. Full case study coming soon.",
    gradient: "from-purple-600 to-pink-500",
    status: "wip",
    icon: <FaCube />,
  },
  {
    id: 4,
    title: "Work in Progress",
    category: "Upcoming Project",
    desc: "An exciting new project is under active development. Stay tuned for the launch.",
    gradient: "from-emerald-500 to-teal-400",
    status: "wip",
    icon: <FaShapes />,
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
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.2, 0.8]); // Lighting effect

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to card center (-0.5 to 0.5)
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
      style={{ perspective: 1000 }} // Essential for 3D effect
      className={`group relative ${project.status === 'live' ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {/* 3D ROTATING CARD */}
      <motion.div
        style={{ rotateX, rotateY, filter: `brightness(${brightness})` }}
        className={`w-full aspect-[2/1] rounded-[2rem] bg-gradient-to-br ${project.gradient} relative overflow-hidden mb-6 border border-white/10 shadow-2xl transition-all duration-200 flex items-center justify-center`}
      >
        
        {/* Animated Gloss/Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />

        {/* Floating 3D Icon */}
        <motion.div 
          style={{ z: 50 }} // Push icon forward in 3D space
          className="text-white/30 text-6xl md:text-8xl drop-shadow-2xl transform group-hover:scale-110 group-hover:text-white/50 transition-all duration-500 relative z-10"
        >
          {project.icon}
        </motion.div>

        {/* Hover Overlay CTA */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30 backdrop-blur-[2px]">
           {project.status === 'live' && project.link && (
             <a 
               href={project.link}
               target="_blank"
               rel="noopener noreferrer"
               className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300 hover:scale-105 shadow-xl text-sm md:text-base"
             >
                View Live Site <FaExternalLinkAlt />
             </a>
           )}

           {project.status === 'wip' && (
             <div className="bg-black/50 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300 cursor-default shadow-xl text-sm md:text-base">
                Coming Soon <FaClock />
             </div>
           )}
        </div>
      </motion.div>

      {/* Project Info - Scales slightly on hover */}
      <div className="flex justify-between items-start px-2 group-hover:translate-x-2 transition-transform duration-300">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed">{project.desc}</p>
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
    <main className="min-h-screen pt-24 pb-20 px-6 relative overflow-hidden">
      
      {/* === BACKGROUND ATMOSPHERE (NEW) === */}
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
      <div className="max-w-7xl mx-auto mb-32 text-center md:text-left relative z-10">
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
                  transition={{ delay: 0.2 + (i * 0.05) }} // Letter stagger
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
          transition={{ delay: 0.8 }} // Delayed after title
          className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed"
        >
          We don't just build websites. We engineer <span className="text-white font-bold">digital breakthroughs.</span> From immersive 3D worlds to high-frequency fintech dashboards, this is where code meets art.
        </motion.p>
      </div>

      {/* === PROJECTS GRID === */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 relative z-10">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* === BOTTOM CTA === */}
      <div className="mt-32 text-center relative z-10">
        <h2 className="text-3xl text-white mb-8 font-bold">Have a project in mind?</h2>
        <Link href="/contact">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-white/20 text-white px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            Let's Build It
          </motion.button>
        </Link>
      </div>

    </main>
  );
}