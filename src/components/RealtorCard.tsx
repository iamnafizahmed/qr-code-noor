import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

          {/* Premium Animated Avatar Ring */}
          <div className="relative group mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c] to-[#f0d078] rounded-full blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-300 animate-pulse" />
            <div className="relative w-24 h-24 rounded-full border-4 border-[#c9a84c] bg-gradient-to-br from-[#111c27] to-[#1e3a5f]/80 flex items-center justify-center shadow-inner p-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 760 800"
                className="w-full h-full text-white drop-shadow-[0_2px_8px_rgba(201,168,76,0.3)]"
              >
                <path 
                  d="M373.785 23.822C370.65 26.516 338.809 50.394 310 71.657a16858 16858 0 0 0-54.5 40.353c-21.486 15.963-69.914 51.633-110 81.021-43.19 31.665-102.267 75.155-107.25 78.955L33 275.99v42.505c0 23.378.25 42.505.555 42.505.817 0 11.599-7.392 22.445-15.388 5.225-3.852 14.675-10.658 21-15.123s18.25-12.997 26.5-18.959 24.9-17.929 37-26.595c12.1-8.665 27.972-20.183 35.271-25.595s17.315-12.765 22.257-16.34c4.941-3.575 16.54-12.125 25.773-19s21.431-15.875 27.104-20 17.578-12.905 26.455-19.512 29.558-21.907 45.959-34c16.4-12.093 34.175-25.241 39.5-29.217 5.324-3.977 11.305-8.116 13.289-9.198l3.608-1.969 10.563 8.198c12.155 9.433 36.809 27.693 111.221 82.376 29.15 21.422 60.2 44.295 69 50.829 38.055 28.256 50.764 37.627 63 46.451 7.15 5.157 14.503 10.48 16.34 11.829l3.341 2.453-.341 195.63-.34 195.63 35.751.5 35.75.5.075-205.5c.069-188.658.063-221.314-.04-223.137-.02-.351-22.536-17.001-50.035-37L624.002 202.5l-.001-61.74L624 79.02l-35.25.322-35.25.322-.533 33.918c-.598 38.016-.372 35.256-2.717 33.175-.962-.854-11.65-8.643-23.75-17.308-59.652-42.72-144.753-104.844-146.493-106.941-1.725-2.079-2.452-1.925-6.222 1.314M78 389.669c-14.575 10.409-30.663 21.792-35.75 25.296L33 421.336v354.672l120.25-.254 120.25-.254.263-35.25.263-35.25h-169.02l-.253-167.129-.253-167.128z" 
                  fill="#4f75a2" 
                  fillRule="evenodd"
                />
                <path 
                  d="M350.885 39.75c-14.519 10.862-34.046 25.406-43.392 32.319-9.346 6.912-27.539 20.37-40.428 29.905-33.106 24.492-59.638 44.028-105.065 77.364-74.745 54.849-119.511 88.01-124.75 92.408L32 276.155v42.922c0 30.667.316 42.923 1.105 42.923.608 0 3.195-1.41 5.75-3.133 17.996-12.139 79.776-56.155 126.145-89.872 12.375-8.999 26.55-19.293 31.5-22.876s17.55-12.857 28-20.609c33.292-24.697 83.779-61.663 96.654-70.768 3.66-2.588 16.71-12.264 29-21.501 31.286-23.515 28.467-21.719 31.24-19.902 1.279.838 2.951 2.138 3.716 2.889 1.257 1.235 15.813 12.304 32.89 25.012 3.575 2.66 7.178 5.382 8.007 6.048s7.354 5.448 14.5 10.626A5197 5197 0 0 1 468 178.009c7.975 5.875 22.825 16.674 33 23.997s22.55 16.304 27.5 19.957a21347 21347 0 0 1 56 41.51c31.557 23.482 48.925 36.213 56.265 41.243 4.186 2.869 8.314 6.019 9.173 7 1.408 1.608 1.513 20.982 1.062 196.784l-.5 195-47.25.292-47.25.291-.021-3.291c-.011-1.811-.074-63.592-.139-137.292l-.118-134 31.139-.264c33.267-.283 34.448-.487 29.263-5.076-3.117-2.757-45.781-48.713-58.624-63.146-10.026-11.267-30.976-34.359-37.538-41.376-2.224-2.377-3.778-1.537-9.103 4.92-2.242 2.718-13.402 15.067-24.801 27.442-22.912 24.874-56.202 61.57-62.813 69.239-5.93 6.879-6.365 6.759 24.564 6.775 15.23.007 28.703.285 29.941.616l2.25.603v106.825c0 108.229-.123 112.028-3.438 106.532-1.369-2.269-36.759-49.631-44.868-60.046-10.062-12.923-38.564-50.192-60.833-79.544a25827 25827 0 0 0-27.379-36 16086 16086 0 0 1-34.868-46c-11.004-14.575-22.747-30.1-26.096-34.5l-6.088-8H201.5v269h72l.256-74.244c.253-73.064.287-74.213 2.166-72.334 1.05 1.05 7.975 9.934 15.389 19.743 11.784 15.592 21.868 28.857 46.189 60.76 7.188 9.428 39.104 50.818 47.867 62.075 23.764 30.526 39.319 50.644 47.165 61 41.341 54.564 51.564 67.675 54.987 70.516 1.552 1.288 235.986 1.813 237.268.531 1.223-1.224.815-499.802-.411-501.028-.728-.728-6.398-4.962-12.6-9.408-16.329-11.708-52.775-38.248-71.068-51.752L624.916 201.7l.13-60.803c.072-33.442-.161-61.274-.517-61.85-1.187-1.921-71.179-1.401-71.922.535-.334.87-.607 15.945-.607 33.5S551.613 145 551.14 145c-1.501 0-36.41-24.919-103.64-73.981-11-8.027-21.575-15.687-23.5-17.022-4.503-3.123-32.779-24.002-40.166-29.658-3.116-2.387-5.864-4.339-6.107-4.339s-12.322 8.887-26.842 19.75m22.9-15.928C370.65 26.516 338.809 50.394 310 71.657a16858 16858 0 0 0-54.5 40.353c-21.486 15.963-69.914 51.633-110 81.021-43.19 31.665-102.267 75.155-107.25 78.955L33 275.99v42.505c0 23.378.25 42.505.555 42.505.817 0 11.599-7.392 22.445-15.388 5.225-3.852 14.675-10.658 21-15.123s18.25-12.997 26.5-18.959 24.9-17.929 37-26.595c12.1-8.665 27.972-20.183 35.271-25.595s17.315-12.765 22.257-16.34c4.941-3.575 16.54-12.125 25.773-19s21.431-15.875 27.104-20 17.578-12.905 26.455-19.512 29.558-21.907 45.959-34c16.4-12.093 34.175-25.241 39.5-29.217 5.324-3.977 11.305-8.116 13.289-9.198l3.608-1.969 10.563 8.198c12.155 9.433 36.809 27.693 111.221 82.376 29.15 21.422 60.2 44.295 69 50.829 38.055 28.256 50.764 37.627 63 46.451 7.15 5.157 14.503 10.48 16.34 11.829l3.341 2.453-.341 195.63-.34 195.63 35.751.5 35.75.5.075-205.5c.069-188.658.063-221.314-.04-223.137-.02-.351-22.536-17.001-50.035-37L624.002 202.5l-.001-61.74L624 79.02l-35.25.322-35.25.322-.533 33.918c-.598 38.016-.372 35.256-2.717 33.175-.962-.854-11.65-8.643-23.75-17.308-59.652-42.72-144.753-104.844-146.493-106.941-1.725-2.079-2.452-1.925-6.222 1.314m-2.314 208.428c-6.082 24.642-5.351 24.061-43.221 34.348-2.994.813-1.255 4.179 2.5 4.838 2.063.362 10.111 2.659 17.887 5.104l14.136 4.446 1.963 4.257c1.079 2.341 3.878 10.332 6.22 17.757 6.128 19.43 8.01 22.335 9.544 14.739 1.287-6.371 10.458-34.281 11.963-36.407 1.7-2.4 12.268-6.179 24.833-8.878 11.516-2.474 10.793-3.198-11.697-11.699-16.805-6.353-16.681-6.214-20.771-23.287-1.708-7.133-3.511-14.655-4.006-16.718-2.185-9.111-5.17-5.441-9.351 11.5M99.948 372.837c-5.896 3.766-65.123 46.006-66.6 47.499-1.285 1.3-3.156 350.542-1.899 354.504l.686 2.16 86.682-.244 86.683-.245-86.25-.261-86.25-.261V421.336l9.25-6.371c5.088-3.504 21.175-14.887 35.75-25.296l26.5-18.926.253 167.128.253 167.129h169.02l-.263 35.25-.263 35.25-28 .532-28 .532 28.5-.032 28.5-.032.262-36.244.263-36.245-84.263-.255-84.262-.256-.253-165.953c-.274-179.464.134-168.817-6.299-164.71" 
                  fill="#f0d078" 
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Identity details */}
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight font-serif">
            Noor The Realtor
          </h1>
          <p className="text-xs uppercase tracking-[0.15em] text-[#c9a84c] font-medium mt-1">
            Licensed Real Estate Agent
          </p>
          
          <div className="flex items-center gap-1.5 mt-2 text-slate-400 text-sm">
            <MapPin size={14} className="text-[#c9a84c]" />
            <span>Newfoundland & Labrador, Canada</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 mt-4 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30">
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
