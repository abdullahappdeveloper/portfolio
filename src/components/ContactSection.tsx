import React, { useState } from 'react';
import { soundFx } from '../utils/audio';
import { Mail, Copy, Check, Send, Github, Linkedin, ArrowUp, Sparkles, MessageSquare, Terminal, QrCode } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const email = 'abdullahkhan.appdeveloper@gmail.com';

  const copyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playWarp();
    setSubmitted(true);
  };

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative py-24 bg-[#07090e] border-t border-slate-900 overflow-hidden">
      {/* Background Celestial Aura */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: LET'S CONNECT */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Futuristic Message Pod Terminal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white drop-shadow-[0_2px_12px_rgba(6,182,212,0.4)]">
            LET'S CONNECT
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Ready to collaborate on high-performance games, physics mechanics, or mobile engineering? Send a direct transmission.
          </p>
        </div>

        {/* Message Pod & Interactive Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Side Panel: Quick-Action Links (Email, Socials, QR Code Placeholder) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Quick Email Card */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 text-cyan-400 mb-3">
                <Mail className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                  Direct Email Channel
                </span>
              </div>
              <div className="text-sm font-semibold text-white font-mono break-all">{email}</div>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                Available for contract, full-time, and mobile consulting.
              </p>

              <button
                onClick={copyEmail}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-200 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Email Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-cyan-400" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Socials & Profiles */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 shadow-xl space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Developer Networks & Socials
              </div>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-sky-400" />
                  <span>LinkedIn Profile</span>
                </div>
                <span className="text-cyan-400 font-mono text-[11px]">/in/abdullah-khan</span>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-slate-400" />
                  <span>GitHub Repositories</span>
                </div>
                <span className="text-cyan-400 font-mono text-[11px]">@abdullahkhan-unity</span>
              </a>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-medium text-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                  <span>Discord Dev Channel</span>
                </div>
                <span className="text-purple-300 font-mono text-[11px]">abdullah_unity#7777</span>
              </div>
            </div>

            {/* QR Code Placeholder Panel */}
            <div className="p-5 rounded-2xl bg-[#0b0f19] border border-slate-800 shadow-xl flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <QrCode className="w-10 h-10" />
              </div>
              <div>
                <div className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
                  Mobile vCard / QR Connect
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Scan to save Abdullah Khan's developer contact card directly to mobile.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Futuristic Terminal Message Pod Form */}
          <div className="lg:col-span-7 bg-[#0b0f19] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                  MESSAGE POD // TRANSMISSION TERMINAL
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                ONLINE & READY
              </span>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Transmission Delivered!</h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formState.name}</strong>. Your message packet has reached Abdullah Khan's station. Expect a reply within 24 hours.
                </p>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setSubmitted(false);
                    setFormState({ name: '', email: '', message: '' });
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 cursor-pointer"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name or Studio"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl text-xs sm:text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl text-xs sm:text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your game project, engine requirements, or role details..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl text-xs sm:text-sm text-white focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Glowing [SEND] Button with Hover Animation */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] hover:scale-[1.01] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>[SEND]</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer: INFO © ABDULLAH KHAN | All rights reserved. */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-mono">
            <span>INFO © ABDULLAH KHAN | All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-slate-600 font-mono">
              Unity Game Developer & Software Engineer
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
              title="Return to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] font-mono">TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
