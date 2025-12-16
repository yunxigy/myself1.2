import React, { useState } from 'react';
import { StarAlliance } from './components/StarAlliance';
import { ProjectList } from './components/ProjectList';
import { PlanSection } from './components/PlanSection';
import { VitsModal } from './components/VitsModal';
import { MediaStatsModal } from './components/MediaStatsModal';
import { GalleryModal } from './components/GalleryModal';
import { AeModal } from './components/AeModal';
import { PoemOfFlowers } from './components/PoemOfFlowers';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [isVitsOpen, setIsVitsOpen] = useState(false);
  const [isMediaStatsOpen, setIsMediaStatsOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isAeOpen, setIsAeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 relative overflow-x-hidden selection:bg-blue-500/30">
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] right-[-5%] w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] bg-indigo-900/10 rounded-full blur-[80px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        
        {/* Header - Enhanced Art Font */}
        <header className="mb-20 text-center relative group">
          <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-30 group-hover:opacity-50 transition-opacity duration-1000">
             <div className="w-64 h-64 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-[90px]" />
          </div>
          
          {/* Main Title Wrapper with Transforms */}
          {/* Moving transforms to the parent ensures all layers (shadow/text/glow) align perfectly */}
          <div className="relative inline-block transform -skew-x-6 -rotate-2 hover:scale-105 hover:rotate-0 transition-all duration-500 cursor-default">
            
            {/* 1. Hard Shadow Layer (Black) - Offset for depth */}
            {/* Switched to font-art (Ma Shan Zheng) and increased offset to top-2/left-2 (mobile) and top-5/left-5 (desktop) */}
            <h1 className="font-art text-7xl sm:text-8xl md:text-[11rem] font-medium text-black absolute top-2 left-2 sm:top-5 sm:left-5 select-none z-0 opacity-80 whitespace-nowrap tracking-[0.2em]">
              逐梦光影
            </h1>

            {/* 2. Neon Glow Layer (Colored Blur) */}
            <h1 className="font-art text-7xl sm:text-8xl md:text-[11rem] font-medium text-cyan-500 absolute top-0 left-0 select-none z-0 blur-xl opacity-50 animate-pulse-slow whitespace-nowrap tracking-[0.2em]">
              逐梦光影
            </h1>
            
            {/* 3. Main Gradient Text Layer */}
            <h1 className="font-art text-7xl sm:text-8xl md:text-[11rem] font-medium text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-slate-400 relative z-10 drop-shadow-sm whitespace-nowrap tracking-[0.2em]">
              逐梦光影
            </h1>
            
          </div>
          
          <div className="mt-12 flex flex-col items-center">
             <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 mb-4" />
             <p className="text-slate-400 font-serif italic tracking-[0.3em] text-sm md:text-base uppercase text-shadow-sm">
                Chasing Dreams • Light & Shadow
             </p>
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Star Alliance (Wider) */}
          <div className="lg:col-span-8 space-y-8">
            <StarAlliance />
          </div>

          {/* Right Column: Projects (Narrower but sticky on desktop) */}
          <div className="lg:col-span-4">
             <div className="lg:sticky lg:top-8 space-y-8">
               <ProjectList 
                 onOpenVits={() => setIsVitsOpen(true)}
                 onOpenMediaStats={() => setIsMediaStatsOpen(true)}
               />
               
               <PoemOfFlowers />

               {/* Mobile/Tablet Decoration */}
               <div className="p-6 bg-slate-900/30 rounded-xl border border-dashed border-slate-800 hidden lg:block">
                 <p className="text-xs text-slate-500 text-center leading-loose">
                   "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself."
                   <br/>
                   — Carl Sagan
                 </p>
               </div>
             </div>
          </div>
        </div>

        {/* Bottom Section: Plans */}
        <PlanSection 
          onOpenVits={() => setIsVitsOpen(true)}
          onOpenGallery={() => setIsGalleryOpen(true)}
          onOpenAe={() => setIsAeOpen(true)}
        />

        {/* Footer */}
        <footer className="mt-20 py-8 text-center text-slate-600 text-sm border-t border-slate-900">
          <p className="mb-2">&copy; {new Date().getFullYear()} 逐梦光影 | All Rights Reserved.</p>
          <a 
            href="https://beian.miit.gov.cn/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-slate-400 transition-colors duration-300"
          >
            津ICP备2025041246号-1
          </a>
        </footer>
      </div>

      {/* Modals */}
      {isVitsOpen && <VitsModal isOpen={isVitsOpen} onClose={() => setIsVitsOpen(false)} />}
      {isMediaStatsOpen && <MediaStatsModal isOpen={isMediaStatsOpen} onClose={() => setIsMediaStatsOpen(false)} />}
      {isGalleryOpen && <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />}
      {isAeOpen && <AeModal isOpen={isAeOpen} onClose={() => setIsAeOpen(false)} />}
    </div>
  );
}