'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { 
  FaEnvelope, FaMapMarkerAlt, FaPaperPlane, 
  FaCheckCircle, FaSpinner, FaChevronDown, 
  FaHome, FaRocket, FaShieldAlt, FaClock 
} from 'react-icons/fa';

// === COUNTRY LIST ===
const countryCodes = [
  { code: "+91", country: "IN", flag: "🇮🇳" }, { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "GB", flag: "🇬🇧" }, { code: "+971", country: "AE", flag: "🇦🇪" },
  { code: "+61", country: "AU", flag: "🇦🇺" }, { code: "+1", country: "CA", flag: "🇨🇦" },
  { code: "+49", country: "DE", flag: "🇩🇪" }, { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+81", country: "JP", flag: "🇯🇵" }, { code: "+65", country: "SG", flag: "🇸🇬" },
  { code: "+", country: "OT", flag: "🌐" },
];

// === PROJECT TYPES ===
const projectTypes = [
  "Design Brand New Website",
  "Redesigning My Website",
  "Web Application",
  "Mobile Application",
  "Web Hosting",
  "Branding and Identity",
  "Domain and Business Mail Configuration",
  "Digital Marketing",
  "Cloud & DevOps Service"
];

// === ANIMATION VARIANTS ===
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.05, delayChildren: 0.2 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 50 } 
  }
};

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '', email: '', mobile: '', budget: '', message: ''
  });
  
  // Multi-Select Project Types
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  // Dropdown State
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const budgets = ["$50 - $100", "$100 - $1k", "$1k - $5k", "$5k - $10k", "$10k - $50k", "$50k+"];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle Project Selection
  const toggleProject = (project: string) => {
    if (selectedProjects.includes(project)) {
      setSelectedProjects(selectedProjects.filter(p => p !== project));
    } else {
      setSelectedProjects([...selectedProjects, project]);
    }
    setErrorMsg(''); // Clear error on selection
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (selectedProjects.length === 0) {
      setErrorMsg('Please select at least one project type.');
      return;
    }

    setStatus('submitting');

    const data = {
      access_key: "fc78a175-8f5d-4b45-94bd-ca3cd956725e", 
      subject: "New Project Inquiry - Pixalara",
      from_name: "Pixalara Website",
      ...formData,
      full_phone: `${selectedCountry.code} ${formData.mobile}`,
      project_types: selectedProjects.join(", ")
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
        setFormData({ name: '', email: '', mobile: '', budget: '', message: '' });
        setSelectedProjects([]);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  }

  return (
    <main className="min-h-screen pt-24 pb-0 px-6 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch relative z-10 mb-20">
        
        {/* === LEFT SIDE: INFO (Col Span 5) === */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col" 
        >
          {/* Top Content Wrapper */}
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6">
              Get In Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-[1.1]">
              Let's Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                Something Great.
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-lg leading-relaxed">
              Tell us about your goals. Whether it's a new platform, a rebrand, or cloud infrastructure, we are ready to engineer your success.
            </p>

            <div className="space-y-6 mb-12">
              <a href="mailto:hello@pixalara.com" className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-2xl text-blue-400 group-hover:scale-110 transition-transform">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Email Us</p>
                  <p className="text-xl text-white font-medium group-hover:text-blue-400 transition-colors">hello@pixalara.com</p>
                </div>
              </a>

              <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 transition-all">
                <div className="w-14 h-14 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-2xl text-purple-400">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">HQ</p>
                  <p className="text-xl text-white font-medium">Chicago, Illinois, USA</p>
                </div>
              </div>
            </div>
          </div>

          {/* === CONVERSION BOOSTER SECTION === */}
          <div className="border-t border-white/10 pt-10 mt-auto">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Why Global Brands Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">Pixalara</span>?
            </h3>
            <div className="space-y-6">
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 shrink-0">
                  <FaRocket />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">Rapid Execution</h4>
                  <p className="text-sm text-gray-400 mt-1">We don't just code; we ship. Launch your MVP in weeks, not months, with our agile sprint methodology.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                  <FaShieldAlt />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">Scalable Architecture</h4>
                  <p className="text-sm text-gray-400 mt-1">Built on AWS & Google Cloud. Our systems are designed to handle millions of users from Day 1.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                  <FaClock />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">24/7 Dedicated Support</h4>
                  <p className="text-sm text-gray-400 mt-1">Your business never sleeps, and neither do we. Get round-the-clock infrastructure monitoring and support.</p>
                </div>
              </div>

            </div>
          </div>

        </motion.div>


        {/* === RIGHT SIDE: THE MERGED FORM (Col Span 7) === */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="lg:col-span-7 relative flex flex-col h-full"
        >
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-neutral-900/50 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-900/10 relative overflow-visible flex-grow">
            
            {/* === COMPACT & CREATIVE SUCCESS POPUP === */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative w-[320px] p-6 rounded-[2rem] bg-[#0f0f0f] border border-white/10 shadow-2xl text-center overflow-hidden"
                  >
                    {/* Creative Top Gradient Bar */}
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />

                    <div className="relative z-10 flex flex-col items-center mt-2">
                      <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mb-4 ring-1 ring-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                        <FaCheckCircle className="text-2xl text-green-400" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2">Thank You</h3>
                      <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                        We've received your inquiry. Our team is already reviewing it and will get back to you shortly.
                      </p>

                      <div className="flex flex-col gap-3 w-full">
                        <Link href="/" className="w-full">
                          <button className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-white/5">
                             <FaHome /> Take me to Home
                          </button>
                        </Link>
                        <button 
                          onClick={() => setStatus('idle')} 
                          className="w-full py-3 rounded-xl border border-white/10 text-gray-400 font-bold text-sm hover:bg-white/5 hover:text-white transition-colors"
                        >
                          I Will Stay Here
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ANIMATED FORM CONTAINER */}
            <motion.form 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit} 
              className="space-y-6 relative z-10"
            >
              
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="space-y-3">
                  <label className="block text-sm text-gray-400 font-bold uppercase tracking-wider">Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="John Doe" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-black/60 transition-all" />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-3">
                  <label className="block text-sm text-gray-400 font-bold uppercase tracking-wider">Email</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="john@company.com" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-black/60 transition-all" />
                </motion.div>
              </div>

              {/* Row 2: Mobile */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="block text-sm text-gray-400 font-bold uppercase tracking-wider">Mobile Number</label>
                <div className="flex gap-3 relative">
                  <div className="w-32 shrink-0 relative" ref={dropdownRef}>
                    <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full h-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white flex items-center justify-between hover:border-purple-500 transition-all">
                      <span className="flex items-center gap-2 text-sm">
                        <span>{selectedCountry.flag}</span>
                        <span className="font-bold">{selectedCountry.code}</span>
                      </span>
                      <FaChevronDown className="text-[10px] text-gray-500" />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute top-full mt-2 left-0 w-64 bg-neutral-900 border border-white/10 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto custom-scrollbar">
                        {countryCodes.map((c) => (
                          <button key={c.country} type="button" onClick={() => { setSelectedCountry(c); setIsDropdownOpen(false); }} className="w-full px-4 py-3 hover:bg-white/10 flex items-center gap-3 text-left text-sm text-gray-300 border-b border-white/5 last:border-none">
                            <span className="text-lg">{c.flag}</span> <span className="font-bold">{c.code}</span> <span className="text-xs text-gray-500 truncate">{c.country}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input type="tel" name="mobile" required value={formData.mobile} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none" placeholder="98765 43210" />
                </div>
              </motion.div>

              {/* Row 3: PROJECT TYPE SELECTION (VERTICAL) */}
              <motion.div variants={itemVariants} className="space-y-4 pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm text-gray-400 font-bold uppercase tracking-wider">Project Type</label>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">(Select at least one)</span>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {projectTypes.map((project) => {
                    const isSelected = selectedProjects.includes(project);
                    return (
                      <div 
                        key={project}
                        onClick={() => toggleProject(project)}
                        className={`
                          group flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-300
                          ${isSelected 
                            ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}
                        `}
                      >
                        {/* Circular Checkbox UI */}
                        <div className={`
                          w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0
                          ${isSelected ? 'bg-purple-500 border-purple-500' : 'border-gray-500 group-hover:border-white'}
                        `}>
                          <div className={`w-2 h-2 bg-white rounded-full transition-transform duration-300 ${isSelected ? 'scale-100' : 'scale-0'}`} />
                        </div>
                        
                        <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                          {project}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {errorMsg && <p className="text-red-400 text-xs font-bold mt-2 animate-pulse">{errorMsg}</p>}
              </motion.div>

              {/* Row 4: Budget Selection (FIXED SPACING) */}
              <motion.div variants={itemVariants} className="mt-8">
                {/* Added 'block' and 'mb-6' to separate label from buttons */}
                <label className="block text-sm text-gray-400 font-bold uppercase tracking-wider mb-6">Project Budget</label>
                <div className="flex flex-wrap gap-3">
                  {budgets.map((b) => (
                    <motion.button 
                      key={b} 
                      type="button" 
                      onClick={() => setFormData({ ...formData, budget: b })} 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${formData.budget === b ? 'bg-white text-black border-white' : 'bg-white/5 text-gray-400 border-white/10 hover:border-purple-500 hover:text-white'}`}
                    >
                      {b}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Row 5: Details */}
              <motion.div variants={itemVariants} className="space-y-3 mt-4">
                <label className="block text-sm text-gray-400 font-bold uppercase tracking-wider">Project Details</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={6} placeholder="Tell us about your project goals and timeline..." className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-black/60 transition-all resize-none custom-scrollbar"></textarea>
              </motion.div>

              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <motion.button 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full py-5 rounded-xl bg-white text-black font-bold text-lg hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-purple-900/20"
              >
                {status === 'submitting' ? (
                  <>Submitting... <FaSpinner className="animate-spin" /></>
                ) : (
                  <>Submit <FaPaperPlane /></>
                )}
              </motion.button>

              {status === 'error' && (
                <p className="text-red-500 text-center text-sm mt-2">Something went wrong. Please check your connection.</p>
              )}

            </motion.form>
          </div>
        </motion.div>

      </div>

      {/* === PREMIUM BLENDING EFFECT === */}
      <div className="h-10" />

      {/* Glow and Gradient Container */}
      <div className="relative w-full h-20">
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-purple-900/20 blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
      </div>

    </main>
  );
}