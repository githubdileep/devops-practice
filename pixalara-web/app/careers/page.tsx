'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  FaArrowRight, FaClock, FaMapMarkerAlt,
  FaLaptop, FaMoneyBillWave, 
  FaComments, FaShapes, FaChartLine, FaUsers, 
  FaTimes, FaLink, FaChevronDown, FaCheckCircle, FaPaperPlane
} from 'react-icons/fa';

// === 1. JOB DATA ===
const jobs = [
  {
    id: 1,
    role: "Senior Full Stack Developer",
    dept: "Engineering",
    type: "Full-Time",
    location: "Remote",
    description: "Lead our engineering initiatives using the bleeding-edge stack: Next.js 15, React Server Components, TypeScript, Node.js, and AWS Serverless. You will architect scalable systems, manage database migrations, and mentor junior developers."
  },
  {
    id: 2,
    role: "Frontend Developer",
    dept: "Development",
    type: "Full-Time",
    location: "Remote",
    description: "Join our development team to build lightning-fast web applications using Next.js, React, and Tailwind CSS. Obsession with performance is a must."
  },
  {
    id: 4,
    role: "DevOps Engineer",
    dept: "Engineering",
    type: "Full-Time",
    location: "Remote",
    description: "We need a infrastructure wizard to manage our AWS/GCP cloud environments. Handling CI/CD pipelines, Docker, and Kubernetes orchestration."
  },
  {
    id: 5,
    role: "Web Development Intern",
    dept: "Development",
    type: "Internship",
    location: "Remote",
    description: "This position is for students who are very passionate about web technologies and design. You will work alongside senior engineers on live projects, learning Next.js, TypeScript, and modern UI patterns."
  }
];

// === 2. PERKS DATA ===
const perks = [
  { icon: <FaLaptop />, title: "Remote First", desc: "Work from anywhere. We focus on shipping code, not counting hours." },
  { icon: <FaMoneyBillWave />, title: "Top-Tier Pay", desc: "Competitive salaries, equity options, and performance bonuses." },
  { icon: <FaComments />, title: "Communication", desc: "We keep our entire team up-to-date through regular meetings and one-on-ones." },
  { icon: <FaShapes />, title: "Building Skill Sets", desc: "Work on diverse assignments giving you opportunities to level up your skills." },
  { icon: <FaChartLine />, title: "Long-Term Growth", desc: "We hire the best to give them long-term careers and create future superstars." },
  { icon: <FaUsers />, title: "Diversity & Inclusion", desc: "We are a committed equal opportunity employer and do not discriminate." }
];

// === 3. COUNTRY CODES ===
const countryCodes = [
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "GB", flag: "🇬🇧" },
  { code: "+971", country: "AE", flag: "🇦🇪" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+1", country: "CA", flag: "🇨🇦" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+65", country: "SG", flag: "🇸🇬" },
  { code: "+66", country: "TH", flag: "🇹🇭" },
  { code: "+", country: "OT", flag: "🌐" },
];

// === PREMIUM ANIMATIONS (FIXED WITH ': Variants') ===
const containerVariants: Variants = { 
  hidden: { opacity: 0 }, 
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
  } 
};

const cardVariants: Variants = { 
  hidden: { opacity: 0, y: 30, scale: 0.95 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 20 } 
  } 
};

const hoverPerk: Variants = {
  hover: { 
    y: -10,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: "rgba(168, 85, 247, 0.5)",
    boxShadow: "0px 10px 30px -10px rgba(168, 85, 247, 0.3)",
    transition: { type: "spring", stiffness: 300 }
  }
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 } 
  },
  exit: { opacity: 0, scale: 0.9, y: 20 }
};

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [countryCode, setCountryCode] = useState(countryCodes[0]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      access_key: "499a22d8-6998-4c43-9c83-44491ed1ffde", 
      subject: `New Application: ${selectedJob?.role}`,
      from_name: "Pixalara Careers Form",
      botcheck: formData.get('botcheck'), 
      name: formData.get('name'),
      email: formData.get('email'),
      full_phone: `${countryCode.code} ${formData.get('mobile')}`,
      portfolio_link: formData.get('portfolio_link'),
      job_role: selectedJob?.role,
      department: selectedJob?.dept
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setSelectedJob(null);
        }, 4000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  }

  return (
    <main className="min-h-screen pt-40 px-6 pb-20 overflow-hidden">
      
      {/* Background Glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. HEADER */}
      <div className="max-w-7xl mx-auto mb-24 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-9xl font-bold text-white mb-8 tracking-tighter"
        >
          Come Work <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            With Us.
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-400 max-w-2xl leading-relaxed"
        >
          We are a team of obsessives building the future of the web. 
          If you hate boring work, you'll fit right in.
        </motion.p>
      </div>

      {/* 2. PERKS - WITH MAGNETIC HOVER */}
      <section className="max-w-7xl mx-auto mb-32 relative z-10">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Pixalara?</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {perks.map((perk, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="p-8 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-sm cursor-default"
            >
              <motion.div 
                variants={hoverPerk}
                className="h-full w-full absolute inset-0 rounded-[2rem] border border-transparent pointer-events-none"
              />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-black/50 rounded-2xl flex items-center justify-center text-2xl text-cyan-400 mb-6 group-hover:text-purple-400 transition-colors shadow-lg shadow-cyan-900/20">
                  {perk.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{perk.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{perk.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. OPEN ROLES - WITH INTERACTIVE LIST */}
      <div className="max-w-7xl mx-auto space-y-4 mb-20 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-10">Open Roles</h2>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              variants={cardVariants}
              onClick={() => setSelectedJob(job)}
              whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-8 md:p-10 rounded-3xl bg-white/5 border border-white/5 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden backdrop-blur-sm"
            >
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-400 transition-all">
                  {job.role}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500 uppercase tracking-widest">
                  <span className="text-cyan-400">{job.dept}</span>
                  <span className="flex items-center gap-1"><FaMapMarkerAlt /> Remote</span>
                  <span className="flex items-center gap-1"><FaClock /> {job.type}</span>
                </div>
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all shadow-lg">
                  <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 4. GLASSMORPHIC APPLICATION MODAL - WITH SPRING PHYSICS */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div 
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-white/10 rounded-[2.5rem] p-8 w-full max-w-2xl max-h-[85vh] overflow-y-auto custom-scrollbar relative shadow-2xl shadow-purple-900/30"
            >
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors text-xl bg-white/5 p-3 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all"
              >
                <FaTimes />
              </button>

              {status === 'success' ? (
                <div className="py-20 text-center flex flex-col items-center justify-center h-full">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                  >
                    <FaCheckCircle className="text-5xl text-green-500" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-4">Application Sent!</h3>
                  <p className="text-gray-400 max-w-xs mx-auto">
                    We've received your details. We will check your portfolio link and get back to you shortly.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8 border-b border-white/10 pb-6 pr-10">
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3 block">{selectedJob.dept}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedJob.role}</h2>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                      <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5"><FaMapMarkerAlt /> Remote</span>
                      <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5"><FaClock /> {selectedJob.type}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-base">{selectedJob.description}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">Apply Now</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                        <input type="text" name="name" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none transition-colors" placeholder="John Doe" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                        <input type="email" name="email" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none transition-colors" placeholder="john@example.com" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mobile Number</label>
                      <div className="flex gap-3 relative">
                        <div className="w-32 shrink-0 relative" ref={dropdownRef}>
                          <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-white flex items-center justify-between hover:border-purple-500 transition-all">
                            <span className="flex items-center gap-2 text-sm">
                              <span>{countryCode.flag}</span>
                              <span className="font-bold">{countryCode.code}</span>
                            </span>
                            <FaChevronDown className="text-[10px] text-gray-500" />
                          </button>
                          {isDropdownOpen && (
                            <div className="absolute top-full mt-2 left-0 w-56 bg-neutral-900 border border-white/10 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto custom-scrollbar">
                              {countryCodes.map((c) => (
                                <button key={c.country} type="button" onClick={() => { setCountryCode(c); setIsDropdownOpen(false); }} className="w-full px-4 py-3 hover:bg-white/10 flex items-center gap-3 text-left text-sm text-gray-300 border-b border-white/5 last:border-none">
                                  <span className="text-lg">{c.flag}</span> <span className="font-bold">{c.code}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <input type="tel" name="mobile" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none" placeholder="98765 43210" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Resume / Portfolio Link</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><FaLink /></div>
                        <input type="url" name="portfolio_link" required placeholder="https://drive.google.com/file/d/..." className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-purple-500 outline-none transition-colors" />
                      </div>
                      <p className="text-[10px] text-gray-500 pl-1">Paste a link to your Google Drive, LinkedIn, or Portfolio.</p>
                    </div>

                    <button type="submit" disabled={status === 'sending'} className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-2 mt-4 shadow-lg hover:shadow-purple-500/25">
                      {status === 'sending' ? 'Sending...' : <>Submit Application <FaPaperPlane /></>}
                    </button>
                    {status === 'error' && <p className="text-red-500 text-sm text-center">Something went wrong. Please check your Access Key.</p>}
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. CTA */}
      <div className="max-w-7xl mx-auto mt-20 p-12 text-center rounded-[3rem] bg-gradient-to-b from-neutral-900/50 to-black/50 border border-white/10 backdrop-blur-sm relative z-10">
        <h3 className="text-3xl font-bold text-white mb-4">Don't see your role?</h3>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">We are always looking for exceptional talent. If you think you can add value, pitch us.</p>
        <a href="mailto:careers@pixalara.com" className="inline-flex items-center gap-2 text-white border-b border-purple-500 pb-1 hover:text-purple-400 transition-colors font-bold tracking-wide">
          Email your portfolio <FaArrowRight className="text-sm" />
        </a>
      </div>

    </main>
  );
}