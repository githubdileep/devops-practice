'use client';
import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';

// === PROJECT DATA ===
const projects = [
  {
    id: 1,
    title: "Pixalara Growth School",
    category: "Web Design", 
    tag: "EdTech Platform", 
    desc: "A learning platform focused on DevOps, Cloud, and SRE training with real-world labs, scalable infrastructure, and a performance-first UI.",
    link: "https://growthschool.pixalara.com",
    status: "live",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: 2,
    title: "Fine Tech Power Controls",
    category: "Web Design",
    tag: "Industrial",
    desc: "A corporate website for an electrical and power solutions company, designed for credibility, clarity, and lead generation.",
    link: "https://finetechpowercontrols.com",
    status: "live",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "NexStore E-Commerce",
    category: "App Development",
    tag: "E-Commerce",
    desc: "A next-gen shopping experience with AI recommendations and seamless checkout. Launching soon.",
    status: "wip",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "GoBus Booking App",
    category: "App Development",
    tag: "Mobile App",
    desc: "A smart bus booking application featuring real-time tracking and instant seat reservation.",
    status: "wip",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop",
  },
];

// Filter Categories
const filters = ["All", "Web Design", "App Development", "Branding"];

// === 3D TILT CARD COMPONENT ===
const ProjectCard = ({ project }: { project: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse position state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for tilt
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  // Transforms
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.1, 0.9]); 

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized position (-0.5 to 0.5)
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
      layout 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }} 
      className={`group relative ${project.status === 'live' ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {/* INNER CARD (Handles the 3D Tilt) */}
      <motion.div
        style={{ rotateX, rotateY, filter: `brightness(${brightness})` }}
        className="w-full h-[220px] md:h-[280px] rounded-[1.5rem] bg-neutral-900 relative overflow-hidden mb-6 border border-white/10 shadow-2xl transition-all duration-200"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300" />
        </div>

        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />

        {/* Hover Buttons */}
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

      {/* Text Content */}
      <div className="flex justify-between items-start px-2 group-hover:translate-x-2 transition-transform duration-300">
        <div className="flex-1 pr-6">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">{project.desc}</p>
        </div>
        <span className={`hidden md:block text-sm font-bold border px-4 py-1.5 rounded-full uppercase tracking-widest whitespace-nowrap ${project.status === 'wip' ? 'text-gray-500 border-white/10' : 'text-white border-white/30'}`}>
          {project.tag}
        </span>
      </div>
    </motion.div>
  );
};

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projects.filter(project => 
    activeFilter === "All" ? true : project.category === activeFilter
  );

  return (
    <main className="min-h-screen pt-24 pb-0 px-6 relative overflow-hidden">
      
      {/* Background Atmosphere */}
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

      <div className="max-w-7xl mx-auto mb-16 relative z-10">
        <div className="text-center md:text-left mb-12">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-400 font-bold tracking-widest uppercase mb-4"
          >
            Selected Works
          </motion.p>
          
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-tight mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
               PIXALARA
            </span> <br />
            PORTFOLIO.
          </h1>
        </div>

        {/* === FILTER TABS (Fixed Mobile Alignment) === */}
        {/* ADDED: justify-center for symmetry, gap-3 for mobile fit */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border overflow-hidden ${
                activeFilter === filter 
                  ? "text-black border-white" 
                  : "text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {activeFilter === filter && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-white rounded-full z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{filter}</span> 
            </button>
          ))}
        </div>
      </div>

      {/* === PROJECTS GRID === */}
      <motion.div 
        layout
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-20 mb-8 relative z-10 min-h-[50vh]"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="col-span-full text-center py-20 text-gray-500"
            >
              No projects found in this category yet.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer Blending */}
      <div className="relative w-full h-10 mt-0">
        <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-full max-w-4xl h-[200px] bg-purple-900/10 blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
      </div>

    </main>
  );
}