'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaPaintBrush, FaLayerGroup, FaMobileAlt, FaEnvelope, 
  FaServer, FaBullhorn, FaCloud, FaArrowRight,
  FaHtml5, FaReact, FaNodeJs, FaPython, FaAws, FaGoogle, FaMicrosoft, 
  FaWordpress, FaGoogleDrive, FaLaravel, FaJava, FaGithub, FaPhp, FaChartLine
} from 'react-icons/fa';
import { SiCloudflare, SiZoho, SiFramer, SiKubernetes } from 'react-icons/si';

// === SERVICE DATA ===
const services = [
  {
    id: "01",
    title: "Web Design & Development",
    icon: <FaPaintBrush />,
    color: "from-blue-600 to-cyan-400",
    description: "We don't just build websites; we engineer high-performance digital assets. Using Next.js and React, we create pixel-perfect, SEO-optimized platforms designed to load instantly and convert visitors into long-term partners.",
    features: ["High-Performance Architecture", "Next.js / React Engineering", "Conversion-Focused UX", "Scalable Component Systems"]
  },
  {
    id: "02",
    title: "App Development",
    icon: <FaMobileAlt />,
    color: "from-red-600 to-orange-500",
    description: "Extend your digital ecosystem to the palm of your customer's hand. We build native-grade mobile applications for iOS and Android that are secure, fast, and fully integrated with your backend infrastructure.",
    features: ["Cross-Platform Engineering", "React Native & Flutter", "Secure API Integration", "App Store Deployment"]
  },
  {
    id: "03",
    title: "Fully Managed Hosting",
    icon: <FaServer />,
    color: "from-indigo-600 to-blue-500",
    description: "Your digital presence requires a fortress, not just a folder. We provide fully managed, military-grade hosting solutions with daily backups, real-time threat monitoring, and 99.99% uptime guarantees.",
    features: ["NVMe High-Speed Servers", "Real-Time Threat Security", "Daily Automated Backups", "24/7 Uptime Monitoring"]
  },
  {
    id: "04",
    title: "Branding & Identity",
    icon: <FaLayerGroup />,
    color: "from-purple-600 to-pink-500",
    description: "A brand is more than a logo—it's the visual language of your business. We craft cohesive identities that resonate with modern audiences, ensuring consistency across every digital touchpoint.",
    features: ["Visual Identity Systems", "Brand Guidelines", "Modern UI/UX Design", "Corporate Strategy"]
  },
  {
    id: "05",
    title: "Business Security & Mail",
    icon: <FaEnvelope />,
    color: "from-emerald-500 to-teal-400",
    description: "Secure communications are the backbone of any enterprise. We set up professional Google Workspace or Microsoft 365 suites with advanced DNS configurations (DMARC/DKIM) to ensure your emails always hit the inbox.",
    features: ["Enterprise Mail Setup", "DMARC/DKIM Security", "Spam Protection", "Domain Management"]
  },
  {
    id: "06",
    title: "Digital Marketing",
    icon: <FaBullhorn />,
    color: "from-orange-500 to-yellow-400",
    description: "Visibility is the currency of the internet. We deploy data-driven SEO and PPC strategies to dominate search results, driving qualified traffic to your newly engineered platform.",
    features: ["Technical SEO", "Performance Marketing (PPC)", "Content Strategy", "Analytics & Reporting"]
  },
  {
    id: "07",
    title: "Cloud & DevOps",
    icon: <FaCloud />,
    color: "from-cyan-500 to-blue-500",
    description: "Stability is a luxury we make standard. We architect cloud-native infrastructure on AWS and Google Cloud that autoscales with your traffic. From CI/CD pipelines to Docker containerization, we ensure your system never sleeps.",
    features: ["Cloud-Native Architecture", "Automated CI/CD Pipelines", "Docker & Kubernetes", "Zero-Downtime Deployment"]
  }
];

// === TECH STACK DATA ===
const techRow1 = [
  { name: "Next.js", icon: <FaReact />, color: "text-white" },
  { name: "React", icon: <FaReact />, color: "text-cyan-400" },
  { name: "NodeJS", icon: <FaNodeJs />, color: "text-green-500" },
  { name: "TypeScript", icon: <FaHtml5 />, color: "text-blue-400" },
  { name: "AWS", icon: <FaAws />, color: "text-orange-400" },
  { name: "Framer", icon: <SiFramer />, color: "text-white" },
  { name: "Laravel", icon: <FaLaravel />, color: "text-red-600" },
  { name: "Docker", icon: <FaServer />, color: "text-blue-500" },
  { name: "Github", icon: <FaGithub />, color: "text-white" },
  { name: "PHP", icon: <FaPhp />, color: "text-indigo-400" },
];

const techRow2 = [
  { name: "Python", icon: <FaPython />, color: "text-yellow-400" },
  { name: "Google Cloud", icon: <FaGoogle />, color: "text-blue-500" },
  { name: "Kubernetes", icon: <SiKubernetes />, color: "text-blue-600" },
  { name: "Java", icon: <FaJava />, color: "text-red-500" },
  { name: "Cloudflare", icon: <SiCloudflare />, color: "text-orange-500" },
  { name: "Zoho", icon: <SiZoho />, color: "text-yellow-500" },
  { name: "MS Workspace", icon: <FaMicrosoft />, color: "text-blue-600" },
  { name: "G-Workspace", icon: <FaGoogleDrive />, color: "text-green-500" },
  { name: "Site24x7", icon: <FaChartLine />, color: "text-green-500" },
];

export default function ServicesPage() {
  return (
    // UPDATED: Changed pb-20 to pb-0 to allow seamless blend
    <main className="min-h-screen pt-24 pb-0 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-6 text-center mb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-xs mb-6">
            End-to-End Digital Solutions
          </p>
          <h1 className="relative z-10 text-5xl md:text-8xl font-bold text-white mb-6 tracking-tighter">
            Digital Experiences.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
              Engineered to Scale.
            </span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
        >
          We design, build, host, secure, and manage high-performance websites and cloud-native systems. 
          From stunning UI/UX to reliable infrastructure, we help modern brands launch faster and stay secure.
        </motion.p>
      </section>

      {/* 2. THE 7 SERVICE SECTIONS */}
      <div className="flex flex-col gap-12">
        {services.map((service, index) => (
          <section key={service.id} className="relative px-6 group">
            <div className={`absolute top-1/2 ${index % 2 === 0 ? 'right-0' : 'left-0'} -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r ${service.color} opacity-[0.08] blur-[120px] pointer-events-none`} />
            <div className="max-w-7xl mx-auto w-full">
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 md:gap-24`}>
                
                {/* Text Side */}
                <div className="flex-1 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className={`text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent mb-4 block`}>
                      {service.id}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mb-8">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                          {feature}
                        </div>
                      ))}
                    </div>
                    {/* Link */}
                    <Link 
                      href="/contact"
                      className="px-8 py-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all inline-flex items-center gap-3 font-bold text-sm uppercase tracking-widest backdrop-blur-md"
                    >
                      Start Project <FaArrowRight className="text-cyan-400" />
                    </Link>
                  </motion.div>
                </div>

                {/* Image Side */}
                <div className="flex-1 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-neutral-900/40 backdrop-blur-sm group-hover:border-white/20 transition-colors"
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                       <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${service.color} bg-opacity-10 flex items-center justify-center mb-6 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-500`}>
                          <div className="text-6xl text-white drop-shadow-md">
                            {service.icon}
                          </div>
                       </div>
                       <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                       <p className="text-gray-500 text-sm uppercase tracking-widest">Premium Service</p>
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-[0.03] mix-blend-overlay pointer-events-none`} />
                  </motion.div>
                </div>

              </div>
            </div>
          </section>
        ))}
      </div>

      {/* 3. TECHNOLOGY STACK (Dual Scroll) */}
      <section className="mt-20 pt-12 border-t border-white/5 relative overflow-hidden">
        <div className="text-center mb-12 relative z-10 px-6">
           <p className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-4">Our Arsenal</p>
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
             Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Stack</span>
           </h2>
           <p className="text-gray-400">Powering your digital empire with the world's most advanced frameworks.</p>
        </div>
        
        {/* Row 1: Left Scroll */}
        <div className="flex overflow-hidden mb-6">
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 md:gap-8 px-4"
          >
            {[...techRow1, ...techRow1].map((tech, index) => (
              <div key={index} className="flex-shrink-0 flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all cursor-default group">
                <span className={`text-3xl md:text-4xl ${tech.color} group-hover:scale-110 transition-transform`}>{tech.icon}</span>
                <span className="text-gray-300 font-bold tracking-wide text-sm md:text-base group-hover:text-white">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right Scroll */}
        <div className="flex overflow-hidden mb-8">
          <motion.div 
            initial={{ x: "-50%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 md:gap-8 px-4"
          >
            {[...techRow2, ...techRow2].map((tech, index) => (
              <div key={index} className="flex-shrink-0 flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-blue-500/30 transition-all cursor-default group">
                <span className={`text-3xl md:text-4xl ${tech.color} group-hover:scale-110 transition-transform`}>{tech.icon}</span>
                <span className="text-gray-300 font-bold tracking-wide text-sm md:text-base group-hover:text-white">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === PREMIUM BLENDING EFFECT === */}
      {/* Glows and gradients to bridge into the footer */}
      <div className="relative w-full h-40 mt-0">
        
        {/* 1. Atmospheric Glow connecting to the Footer's 'Ready to Scale' section */}
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-purple-900/20 blur-[120px] pointer-events-none z-0" />
        
        {/* 2. Soft Gradient Fade at the very bottom to blend into black */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
      </div>

    </main>
  );
}