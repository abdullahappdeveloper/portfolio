import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { soundFx } from './utils/audio';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Scroll spy to update active navigation item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'skills', 'about', 'contact'];
      const scrollY = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation Bar */}
      <Navbar activeSection={activeSection} onNavigate={navigateToSection} />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Full-Screen 3D Interactive Hero Section */}
        <HeroSection
          onExploreProjects={() => navigateToSection('projects')}
          onContactMe={() => navigateToSection('contact')}
        />

        {/* Featured Game Worlds Showcase */}
        <ProjectsSection />

        {/* Holographic Technical Skills Matrix */}
        <SkillsSection />

        {/* About Me & Studio Diorama */}
        <AboutSection />

        {/* Direct Contact & Transmission Pod */}
        <ContactSection />
      </main>
    </div>
  );
}
