import React from 'react';
import { PROJECTS_DATA } from '../constants';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectListProps {
  onOpenVits: () => void;
  onOpenMediaStats: () => void;
  onOpenGacha?: () => void; // New optional prop
}

export const ProjectList: React.FC<ProjectListProps> = ({ onOpenVits, onOpenMediaStats, onOpenGacha }) => {
  const handleProjectClick = (id: string) => {
    if (id === 'p2') { // VITS ID
      onOpenVits();
    } else if (id === 'p3') { // Media Creator ID
      onOpenMediaStats();
    } else if (id === 'p6') { // 2D Card Project ID
      if (onOpenGacha) onOpenGacha();
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-amber-200 border-b border-amber-900/50 pb-2 mb-4 tracking-wider flex items-center gap-2">
        <Icons.Code2 className="w-6 h-6 text-amber-400" />
        个人项目
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {PROJECTS_DATA.map((project, index) => {
          const IconComponent = (Icons as any)[project.icon] || Icons.Folder;
          // Updated interactive list to include 'p6'
          const isInteractive = project.id === 'p2' || project.id === 'p3' || project.id === 'p6';
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleProjectClick(project.id)}
              className={`group relative p-5 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl transition-all duration-300 ${
                isInteractive 
                  ? 'cursor-pointer hover:border-amber-500/80 hover:bg-slate-800/80 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
                  : 'hover:border-amber-500/30'
              }`}
            >
               <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                 <IconComponent className="w-16 h-16 text-amber-500" />
               </div>
               
               <div className="relative z-10 flex items-start gap-4">
                 <div className={`p-3 bg-slate-950 rounded-lg border border-slate-800 transition-colors ${
                   isInteractive ? 'group-hover:border-amber-500/50 group-hover:bg-amber-900/10' : ''
                 }`}>
                   <IconComponent className="w-8 h-8 text-amber-400" />
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-amber-50 group-hover:text-amber-300 transition-colors flex items-center gap-2">
                     {project.title}
                     {isInteractive && <Icons.ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                   </h3>
                   <p className="text-sm text-slate-400 mt-1">
                     {project.description}
                   </p>
                 </div>
               </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};