'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FaLinkedin, FaInstagram, FaArrowRight, FaCheck, FaSpinner } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Social Media Data
  const socialLinks = [
    { Icon: FaLinkedin, href: "https://www.linkedin.com/company/pixalara/" },
    { Icon: FaInstagram, href: "https://www.instagram.com/pixalara/" },
    { Icon: FaXTwitter, href: "https://x.com/pixalara" }
  ];

  // Handle Newsletter Submission
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('sending');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "fc78a175-8f5d-4b45-94bd-ca3cd956725e", // Using your existing key
          subject: "New Newsletter Subscriber",
          from_name: "Pixalara Website",
          email: email,
          message: `New subscriber: ${email}`
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-black relative overflow-hidden border-t border-white/10">
      
      {/* 1. CALL TO ACTION SECTION */}
      {/* Only show if NOT on contact page */}
      {pathname !== '/contact' && (
        <div className="relative py-32 px-6 text-center z-10">
          
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight"
          >
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Scale?</span>
          </motion.h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            Let's build something extraordinary together. Your digital empire starts with a single click.
          </p>

          <Link href="/contact">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold text-lg tracking-wide hover:bg-gray-200 transition-all"
            >
              <span>Get a Quote</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>
      )}

      {/* 2. MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16 border-t border-white/10 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Column 1: Brand */}
        <div className="space-y-6">
          <h3 className="text-3xl font-extrabold tracking-tighter mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
              PIXALARA
            </span>
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Pixalara is a digital-first technology studio crafting high-performance websites, scalable applications, and cloud-ready solutions for growing brands.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map(({ Icon, href }, i) => (
              <a 
                key={i} 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links (UPDATED) */}
        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
            <li><Link href="/work" className="hover:text-cyan-400 transition-colors">Our Work</Link></li>
            <li><Link href="/services" className="hover:text-cyan-400 transition-colors">What We Do</Link></li>
            <li><Link href="/careers" className="hover:text-cyan-400 transition-colors">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h4 className="text-white font-bold mb-6">Services</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Web Design & Development</Link></li>
            <li><Link href="/services" className="hover:text-cyan-400 transition-colors">App Development</Link></li>
            <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Web Hosting</Link></li>
            <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Branding & Identity</Link></li>
            <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Domain & Business Mail</Link></li>
            <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Digital Marketing</Link></li>
            <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Cloud & DevOps</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-6">Stay Updated</h4>
          <form onSubmit={handleSubscribe} className="flex bg-white/5 rounded-lg overflow-hidden border border-white/10 p-1 relative">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={status === 'success' ? "Subscribed!" : "Email address"}
              disabled={status === 'success' || status === 'sending'}
              className="bg-transparent text-white px-4 py-2 outline-none w-full text-sm placeholder:text-gray-600 disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={status === 'success' || status === 'sending'}
              className={`text-white px-4 py-2 rounded-md transition-all flex items-center justify-center min-w-[40px] ${
                status === 'success' ? 'bg-green-500' : 'bg-white/10 hover:bg-purple-600'
              }`}
            >
              {status === 'sending' ? (
                <FaSpinner className="animate-spin" size={14} />
              ) : status === 'success' ? (
                <FaCheck size={14} />
              ) : (
                <FaArrowRight size={14} />
              )}
            </button>
          </form>
          {status === 'error' && (
             <p className="text-red-500 text-xs mt-2">Error joining. Please try again.</p>
          )}
        </div>

      </div>

      {/* 3. BOTTOM COPYRIGHT BAR */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Pixalara. All rights reserved.
        </div>

        {/* Legal Links Section */}
        <div className="flex gap-8 text-xs text-gray-500 font-medium">
          <Link href="/careers" className="hover:text-white transition-colors">
            Careers
          </Link>
          <Link href="/privacy-policy" target="_blank" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" target="_blank" className="hover:text-white transition-colors">
            Terms & Conditions
          </Link>
        </div>

      </div>

    </footer>
  );
}