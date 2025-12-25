'use client';
import { motion } from 'framer-motion';
// Switching to 'si' (Simple Icons) for better startup coverage
import { 
  SiVercel, SiSupabase, SiNextdotjs, SiTailwindcss, 
  SiPrisma, SiStripe, SiLinear, SiNotion 
} from 'react-icons/si';

// Modern Startup Stack Logos
const brands = [
  { name: "Vercel", icon: <SiVercel /> },
  { name: "Supabase", icon: <SiSupabase /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "Prisma", icon: <SiPrisma /> },
  { name: "Stripe", icon: <SiStripe /> },
  { name: "Linear", icon: <SiLinear /> },
  { name: "Notion", icon: <SiNotion /> },
];

export default function BrandMarquee() {
  return (
    <section className="py-20 bg-black overflow-hidden relative border-t border-white/5">
      
      <div className="text-center mb-10 px-4">
        <p className="text-sm font-bold text-gray-500 tracking-[0.2em] uppercase">
          Powering Next-Gen Startups
        </p>
      </div>

      {/* Gradient Masks for Fade Effect */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-10" />

      {/* Marquee Container */}
      <div className="flex">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ 
            duration: 30, // Slower for a more premium feel
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-16 pr-16 whitespace-nowrap"
        >
          {/* Render Logos Twice to Create Seamless Loop */}
          {[...brands, ...brands].map((brand, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 text-4xl text-gray-800 hover:text-white transition-colors duration-500 cursor-pointer group"
            >
              {/* Icon */}
              <span className="group-hover:text-cyan-400 transition-colors">{brand.icon}</span>
              
              {/* Text Name (Optional: Remove if you only want logos) */}
              <span className="text-lg font-bold font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-2">
                {brand.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}