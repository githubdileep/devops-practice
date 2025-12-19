'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FaSearch, FaLightbulb, FaPenNib, FaPaintBrush, FaCode, FaRocket, FaShieldAlt 
} from 'react-icons/fa';

const steps = [
  {
    id: 1,
    title: "Research",
    desc: "We dive deep into your industry, competitors, and audience to build a rock-solid foundation.",
    icon: <FaSearch />,
  },
  {
    id: 2,
    title: "Discovery",
    desc: "We define the strategy, sitemap, and user flows to ensure a seamless experience.",
    icon: <FaLightbulb />,
  },
  {
    id: 3,
    title: "Content",
    desc: "Our copywriters craft compelling narratives that speak directly to your customers' pain points.",
    icon: <FaPenNib />,
  },
  {
    id: 4,
    title: "Design",
    desc: "We create stunning, high-fidelity UI mockups that align perfectly with your brand identity.",
    icon: <FaPaintBrush />,
  },
  {
    id: 5,
    title: "Development",
    desc: "We breathe life into the designs using clean, modern, and high-performance code.",
    icon: <FaCode />,
  },
  {
    id: 6,
    title: "Optimization",
    desc: "Rigorous testing, SEO tuning, and performance checks before the big launch.",
    icon: <FaRocket />,
  },
  {
    id: 7,
    title: "Scaling",
    desc: "We secure, monitor, and scale your platform to handle real-world traffic, growth spikes, and long-term reliability.",
    icon: <FaShieldAlt />,
  }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="bg-transparent py-40 px-6 relative overflow-hidden">
      
      {/* Background Line Track */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-white/5" />
      
      {/* Header */}
      <div className="text-center mb-40 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight"
        >
          Our 7-Step <span className="text-red-600">Process.</span>
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-xl">
          A proven roadmap to turn your vision into a digital reality.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto relative">
        
        {/* THE GLOWING LASER LINE */}
        <motion.div 
          style={{ height: lineHeight }}
          className="absolute left-[28px] md:left-1/2 top-0 w-[4px] -ml-[2px] bg-gradient-to-b from-red-600 via-purple-600 to-blue-600 shadow-[0_0_30px_rgba(220,38,38,1)] z-0 rounded-full"
        />

        <div className="space-y-32">
          {steps.map((step, index) => (
            <div key={step.id} className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              
              {/* Spacer */}
              <div className="hidden md:block w-5/12" />

              {/* CENTRAL ICON NODE */}
              <div className="absolute left-[8px] md:left-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ margin: "-20% 0px -20% 0px" }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-black border-4 border-red-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(220,38,38,0.6)]"
                >
                  <span className="text-xl md:text-2xl font-bold">{step.id}</span>
                </motion.div>
              </div>

              {/* CARD CONTENT */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.6 }}
                // Increased Padding and Width
                className="ml-24 md:ml-0 w-full md:w-5/12 p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:border-red-600/50 hover:bg-white/10 transition-colors group"
              >
                {/* Bigger Icon */}
                <div className="text-5xl mb-6 text-gray-500 group-hover:text-red-500 transition-colors">
                  {step.icon}
                </div>
                
                {/* Bigger Title */}
                <h3 className="text-4xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                
                {/* Bigger Description */}
                <p className="text-gray-300 text-lg leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}