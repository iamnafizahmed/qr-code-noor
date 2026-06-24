import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import noorLogo from '../assets/images/noorw.png';
import { 
  Phone, 
  Mail, 
  Globe, 
  Facebook, 
  Instagram, 
  ChevronRight, 
  Copy, 
  Check, 
  Share2, 
  UserPlus, 
  MapPin
} from 'lucide-react';

export default function RealtorCard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [cardUrl, setCardUrl] = useState('https://info.noortherealtor.ca');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCardUrl(window.location.href);
    }
  }, []);

  const handleCopy = (text: string, label: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSaveContact = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Noor The Realtor',
      'ORG:Noor The Realtor',
      'TITLE:Licensed Real Estate Agent',
      'TEL;TYPE=CELL,PREF:+17096807582',
      'EMAIL;TYPE=INTERNET,PREF:info@noortherealtor.ca',
      'URL:https://www.noortherealtor.ca/',
      'NOTE:Real Estate Services in Newfoundland & Labrador',
      'ADR;TYPE=WORK:;;Newfoundland and Labrador;NL;;Canada',
      'END:VCARD'
    ].join('\n');

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Noor_The_Realtor.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setCopiedText('Contact Saved');
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Noor The Realtor - Digital Business Card',
        text: 'Licensed Real Estate Agent in Newfoundland & Labrador, Canada',
        url: cardUrl,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(cardUrl);
      setCopiedText('Link Copied');
      setTimeout(() => setCopiedText(null), 2000);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Main Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full bg-[#0f1923] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl shadow-black/80 backdrop-blur-md z-10"
      >
        {/* Luxury Gold Border Line */}
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#c9a84c] via-[#f0d078] to-[#c9a84c]" />

        {/* Card Header */}
        <div className="relative pt-10 pb-6 px-6 flex flex-col items-center text-center border-b border-white/5 bg-gradient-to-b from-[#162738]/50 to-[#0f1923]">
          
          {/* Action buttons (Share) */}
          <div className="absolute top-4 right-4">
            <button 
              onClick={handleShare} 
              title="Share Card"
              className="p-2.5 rounded-full bg-white/5 hover:bg-[#c9a84c]/20 border border-white/10 hover:border-[#c9a84c]/40 text-white/70 hover:text-[#f0d078] transition-all duration-200 cursor-pointer"
            >
              <Share2 size={16} />
            </button>
          </div>

          {/* High-Fidelity Brand Logo (PNG) */}
          <div className="w-full max-w-[290px] mx-auto mb-4 mt-2">
            <img 
              src={noorLogo} 
              alt="Noor The Realtor Logo" 
              className="w-full h-auto drop-shadow-[0_4px_12px_rgba(201,168,76,0.15)]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Subtitles & Status */}
          <p className="text-xs uppercase tracking-[0.15em] text-[#c9a84c] font-medium">
            Licensed Real Estate Agent
          </p>
          
          <div className="flex items-center gap-1.5 mt-2.5 text-slate-400 text-sm">
            <MapPin size={14} className="text-[#c9a84c]" />
            <span>Newfoundland & Labrador, Canada</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 mt-4.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-semibold text-[#f0d078] uppercase tracking-wider">
              Available now
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="px-6 py-6 space-y-6">
          
          {/* Main Contacts Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold font-sans">
                Contact & Direct Access
              </h2>
            </div>

            <div className="space-y-3">
              {/* Phone Button */}
              <div className="group relative flex items-center bg-white/3 border border-white/8 hover:border-[#c9a84c]/40 hover:bg-[#c9a84c]/5 rounded-xl overflow-hidden transition-all duration-200">
                <a 
                  href="tel:+17096807582" 
                  className="flex-1 flex items-center gap-4 p-3.5 text-left select-all"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform duration-200">
                    <Phone size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400/70">Phone</span>
                    <span className="block text-sm font-medium text-slate-100 truncate">+1 (709) 680-7582</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-500 group-hover:text-[#c9a84c] group-hover:translate-x-0.5 transition-all" />
                </a>
                <button 
                  onClick={(e) => handleCopy('+17096807582', 'Phone', e)}
                  title="Copy Phone Number"
                  className="px-3.5 self-stretch border-l border-white/5 hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Copy size={14} />
                </button>
              </div>

              {/* Email Button */}
              <div className="group relative flex items-center bg-white/3 border border-white/8 hover:border-[#c9a84c]/40 hover:bg-[#c9a84c]/5 rounded-xl overflow-hidden transition-all duration-200">
                <a 
                  href="mailto:info@noortherealtor.ca" 
                  className="flex-1 flex items-center gap-4 p-3.5 text-left"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-sky-500/10 text-sky-400 group-hover:scale-105 transition-transform duration-200">
                    <Mail size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400/70">Email</span>
                    <span className="block text-sm font-medium text-slate-100 truncate">info@noortherealtor.ca</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-500 group-hover:text-[#c9a84c] group-hover:translate-x-0.5 transition-all" />
                </a>
                <button 
                  onClick={(e) => handleCopy('info@noortherealtor.ca', 'Email', e)}
                  title="Copy Email Address"
                  className="px-3.5 self-stretch border-l border-white/5 hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Copy size={14} />
                </button>
              </div>

              {/* Website Button */}
              <div className="group relative flex items-center bg-white/3 border border-white/8 hover:border-[#c9a84c]/40 hover:bg-[#c9a84c]/5 rounded-xl overflow-hidden transition-all duration-200">
                <a 
                  href="https://www.noortherealtor.ca/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 flex items-center gap-4 p-3.5 text-left"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#c9a84c]/10 text-[#f0d078] group-hover:scale-105 transition-transform duration-200">
                    <Globe size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400/70">Website</span>
                    <span className="block text-sm font-medium text-slate-100 truncate">noortherealtor.ca</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-500 group-hover:text-[#c9a84c] group-hover:translate-x-0.5 transition-all" />
                </a>
                <button 
                  onClick={(e) => handleCopy('https://www.noortherealtor.ca/', 'URL', e)}
                  title="Copy Website URL"
                  className="px-3.5 self-stretch border-l border-white/5 hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Social Row Divider */}
          <div className="h-px bg-white/5" />

          {/* Follow Section */}
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold font-sans mb-3">
              Social Connections
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <a 
                href="https://web.facebook.com/profile.php?id=61581085810421" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/3 border border-white/8 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-200 text-center"
              >
                <Facebook size={20} className="text-[#6aa1f5]" />
                <span className="text-xs text-slate-200 font-medium">Facebook</span>
              </a>
              
              <a 
                href="https://www.instagram.com/noortherealtornl/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/3 border border-white/8 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all duration-200 text-center"
              >
                <Instagram size={20} className="text-[#d4537e]" />
                <span className="text-xs text-slate-200 font-medium">Instagram</span>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 pb-8 text-center flex flex-col gap-3">
          <button 
            onClick={handleSaveContact}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#f0d078] hover:from-[#f0d078] hover:to-[#c9a84c] text-[#0f1923] hover:shadow-lg hover:shadow-amber-500/20 font-semibold rounded-2xl transition-all duration-300 text-sm cursor-pointer"
          >
            <UserPlus size={16} />
            Save Contact Card
          </button>
          
          <p className="text-[10px] text-slate-500 tracking-wider">
            Noor The Realtor &copy; {new Date().getFullYear()} • All rights reserved
          </p>
        </div>
      </motion.div>

      {/* Floating Status Notification Toast */}
      <AnimatePresence>
        {copiedText && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 px-4 py-2.5 bg-gradient-to-r from-[#c9a84c] to-[#f0d078] text-[#0f1923] text-xs font-semibold rounded-full shadow-lg border border-[#c9a84c]/20 flex items-center gap-2 z-50"
          >
            <Check size={14} className="stroke-[3]" />
            <span>{copiedText} Successfully</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
