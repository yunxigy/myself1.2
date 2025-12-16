import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Layers, Trophy, List, ChevronLeft } from 'lucide-react';

interface GachaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Rarity = 'UR' | 'SSR' | 'SR' | 'R';

interface Card {
  id: string;
  name: string;
  rarity: Rarity;
  description: string;
  image: string;
}

// Mock Card Pool with Star Alliance lore and Unsplash images
const CARD_POOL: Card[] = [
  // UR (1%)
  { 
    id: 'ur1', 
    name: '星盟·最终决战兵器', 
    rarity: 'UR', 
    description: '神星阁最高机密，轨道歼星炮',
    image: 'https://images.unsplash.com/photo-1535581652167-3d6693c03a67?q=80&w=2069&auto=format&fit=crop'
  },
  { 
    id: 'ur2', 
    name: '零号·起源智脑', 
    rarity: 'UR', 
    description: '赋星阁的核心意识，全知全能',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop'
  },
  // SSR (4%)
  { 
    id: 'ssr1', 
    name: '深海巨兽·利维坦', 
    rarity: 'SSR', 
    description: '幽星阁深潜母舰，吞噬海浪',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: 'ssr2', 
    name: '平流层·光棱塔', 
    rarity: 'SSR', 
    description: '逐星阁防御矩阵，天基打击',
    image: 'https://images.unsplash.com/photo-1548502669-0f2c416709ee?q=80&w=1946&auto=format&fit=crop'
  },
  { 
    id: 'ssr3', 
    name: '基因飞升者', 
    rarity: 'SSR', 
    description: '灵星阁完美进化体，超越凡胎',
    image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=2010&auto=format&fit=crop'
  },
  { 
    id: 'ssr4', 
    name: '虚拟歌姬·幻', 
    rarity: 'SSR', 
    description: '陨星阁首席偶像，全网亿粉',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=2071&auto=format&fit=crop'
  },
  // SR (15%)
  { 
    id: 'sr1', 
    name: '量产型机甲 MK-II', 
    rarity: 'SR', 
    description: '幻星阁主战装备',
    image: 'https://images.unsplash.com/photo-1612438214708-f428a707dd4e?q=80&w=1974&auto=format&fit=crop'
  },
  { 
    id: 'sr2', 
    name: '重型盾构机', 
    rarity: 'SR', 
    description: '神星阁工程奇迹',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: 'sr3', 
    name: '聚变反应堆', 
    rarity: 'SR', 
    description: '梦星阁能源之心',
    image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: 'sr4', 
    name: '精英突击队', 
    rarity: 'SR', 
    description: '语星阁特培战力',
    image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=2070&auto=format&fit=crop'
  },
  // R (80%) - Generic items
  // TODO: Replace this URL with your uploaded image link!
  // I have set it to a futuristic blue energy visual for now.
  { 
    id: 'r1', 
    name: '能量电池', 
    rarity: 'R', 
    description: '高能压缩储能单元', 
    image: 'https://images.unsplash.com/photo-1616423664033-68e14b22c8cb?q=80&w=2070&auto=format&fit=crop' 
  },
  { id: 'r2', name: '维修扳手', rarity: 'R', description: '基础工具', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=2070&auto=format&fit=crop' },
  { id: 'r3', name: '数据芯片', rarity: 'R', description: '存储介质', image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?q=80&w=2070&auto=format&fit=crop' },
  { id: 'r4', name: '压缩干粮', rarity: 'R', description: '生存物资', image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=1974&auto=format&fit=crop' },
  { id: 'r5', name: '合金碎片', rarity: 'R', description: '回收材料', image: 'https://images.unsplash.com/photo-1518709414768-a88981a45e5d?q=80&w=1962&auto=format&fit=crop' },
];

export const GachaModal: React.FC<GachaModalProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<Card[]>([]);
  const [currentPull, setCurrentPull] = useState<Card[]>([]);
  const [isPulling, setIsPulling] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showPool, setShowPool] = useState(false);

  // Rarity Config
  const getRarityColor = (rarity: Rarity) => {
    switch (rarity) {
      case 'UR': return 'border-yellow-400 shadow-[0_0_25px_rgba(251,191,36,0.8)] ring-2 ring-yellow-500/50';
      case 'SSR': return 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]';
      case 'SR': return 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]';
      default: return 'border-slate-600 hover:border-slate-500';
    }
  };

  const getRarityTextColor = (rarity: Rarity) => {
    switch (rarity) {
      case 'UR': return 'text-yellow-400';
      case 'SSR': return 'text-red-400';
      case 'SR': return 'text-purple-400';
      default: return 'text-slate-400';
    }
  };

  const getRarityBadge = (rarity: Rarity) => {
    switch (rarity) {
      case 'UR': return 'bg-gradient-to-r from-yellow-600 to-yellow-400 text-yellow-950 shadow-yellow-500/50';
      case 'SSR': return 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-red-500/50';
      case 'SR': return 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-purple-500/50';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  const pullCards = (count: number) => {
    if (isPulling) return;
    setIsPulling(true);
    setShowResult(false);
    setShowPool(false);

    setTimeout(() => {
      const newCards: Card[] = [];
      for (let i = 0; i < count; i++) {
        const rand = Math.random() * 100;
        let rarity: Rarity = 'R';
        if (rand < 1.0) rarity = 'UR';
        else if (rand < 5.0) rarity = 'SSR';
        else if (rand < 20.0) rarity = 'SR';
        
        const pool = CARD_POOL.filter(c => c.rarity === rarity);
        const card = pool[Math.floor(Math.random() * pool.length)];
        newCards.push({ ...card, id: `${card.id}-${Date.now()}-${i}` });
      }

      setCurrentPull(newCards);
      setHistory(prev => [...newCards, ...prev]);
      setShowResult(true);
      setIsPulling(false);
    }, 2000); // Slightly longer for anticipation
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/95 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-6xl h-[90vh] flex flex-col bg-slate-900 border border-indigo-500/30 rounded-2xl shadow-[0_0_50px_rgba(79,70,229,0.2)] overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900 z-20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Layers className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100 font-art tracking-wider">星际补给中心</h2>
                <p className="text-xs text-indigo-300">Star Alliance Supply Drop</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-slate-300">已抽取: {history.length}</span>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
            </div>
          </div>

          {/* Main Stage */}
          <div className="flex-1 overflow-hidden relative flex flex-col items-center justify-center bg-slate-950 perspective-1000">
            
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.2)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0" />

            {/* Standby State */}
            {!isPulling && !showResult && !showPool && (
                <div className="relative z-10 text-center space-y-8 max-w-4xl px-4 w-full">
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="space-y-4"
                    >
                        <h3 className="text-5xl md:text-7xl font-art text-transparent bg-clip-text bg-gradient-to-br from-indigo-200 via-purple-200 to-white drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                            战略物资调配
                        </h3>
                        <div className="flex flex-col items-center gap-3">
                           <div className="flex justify-center gap-6 text-sm font-mono tracking-widest text-slate-400">
                              <span className="text-yellow-400">UR: 1%</span>
                              <span className="text-red-400">SSR: 4%</span>
                              <span className="text-purple-400">SR: 15%</span>
                           </div>
                           <button 
                             onClick={() => setShowPool(true)}
                             className="text-xs flex items-center gap-1 text-slate-500 hover:text-indigo-400 transition-colors px-3 py-1 rounded-full border border-transparent hover:border-indigo-500/30 hover:bg-indigo-500/10"
                           >
                             <List className="w-3 h-3" />
                             查看完整奖池清单
                           </button>
                        </div>
                    </motion.div>
                    
                    {/* Featured Cards Preview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 opacity-60 pointer-events-none select-none">
                       {CARD_POOL.slice(0, 4).map(card => (
                          <div key={card.id} className="relative aspect-[3/4] rounded-lg overflow-hidden border border-slate-700">
                             <img src={card.image} className="w-full h-full object-cover grayscale" />
                             <div className="absolute inset-0 bg-slate-900/50" />
                          </div>
                       ))}
                    </div>
                </div>
            )}

            {/* Pool List State */}
            {showPool && (
                <div className="relative z-10 w-full h-full bg-slate-950/80 backdrop-blur-md p-6 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                       <div className="flex items-center gap-2 mb-6">
                          <button 
                            onClick={() => setShowPool(false)}
                            className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                          >
                             <ChevronLeft className="w-6 h-6 text-slate-400" />
                          </button>
                          <h3 className="text-xl font-bold text-white">奖池一览</h3>
                       </div>

                       {['UR', 'SSR', 'SR', 'R'].map((rarity) => {
                          const cards = CARD_POOL.filter(c => c.rarity === rarity);
                          if (cards.length === 0) return null;
                          return (
                             <div key={rarity} className="mb-8">
                                <h4 className={`text-lg font-bold mb-4 border-b border-slate-800 pb-2 ${getRarityTextColor(rarity as Rarity)}`}>
                                   {rarity} 
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                   {cards.map(card => (
                                      <div key={card.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-900 border border-slate-800">
                                         <div className="w-16 h-16 rounded overflow-hidden shrink-0 border border-slate-700">
                                            <img src={card.image} className="w-full h-full object-cover" />
                                         </div>
                                         <div>
                                            <div className="font-bold text-slate-200">{card.name}</div>
                                            <div className="text-xs text-slate-500 mt-1">{card.description}</div>
                                         </div>
                                      </div>
                                   ))}
                                </div>
                             </div>
                          );
                       })}
                    </div>
                </div>
            )}

            {/* Pulling Animation - Enhanced */}
            {isPulling && (
                <div className="relative z-10 flex flex-col items-center justify-center">
                    <div className="relative">
                        {/* Outer Glow Ring */}
                        <motion.div 
                            animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-48 h-48 rounded-full bg-gradient-to-tr from-indigo-500/40 via-purple-500/40 to-pink-500/40 blur-2xl opacity-50 absolute inset-[-2rem]"
                        />
                        {/* Spinning Dashed Border */}
                        <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 w-32 h-32 border-2 border-dashed border-indigo-300/50 rounded-full"
                        />
                        {/* Inner Core */}
                        <motion.div
                             animate={{ scale: [1, 1.5, 0.5, 10], opacity: [1, 1, 1, 0] }}
                             transition={{ duration: 2, times: [0, 0.5, 0.8, 1], repeat: Infinity }}
                             className="w-32 h-32 bg-white rounded-full mix-blend-overlay"
                        />
                        <Sparkles className="absolute inset-0 m-auto w-10 h-10 text-white animate-pulse" />
                    </div>
                    <motion.h3 
                        animate={{ opacity: [0.3, 1, 0.3], letterSpacing: ["0.2em", "0.5em", "0.2em"] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="mt-12 text-2xl font-mono text-indigo-300 uppercase"
                    >
                        Incoming...
                    </motion.h3>
                </div>
            )}

            {/* Results Grid - REVERTED TO BOUNCY POP-UP ANIMATION */}
            {showResult && !isPulling && (
                <div className="relative z-10 w-full h-full overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-indigo-500/20">
                    <button 
                      onClick={() => { setShowResult(false); }}
                      className="absolute top-4 left-4 z-20 flex items-center gap-1 text-slate-400 hover:text-white px-3 py-1 rounded bg-slate-900/50 backdrop-blur"
                    >
                      <ChevronLeft className="w-4 h-4" /> 返回
                    </button>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-6 max-w-7xl mx-auto pb-20 mt-8">
                        {currentPull.map((card, index) => (
                            <motion.div
                                key={card.id}
                                // Reverted to "Pop up" animation: Scale 0.8->1.05->1.0, Slide Up
                                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ 
                                  delay: index * 0.1, // Faster stagger
                                  type: 'spring', 
                                  stiffness: 300,
                                  damping: 20
                                }}
                                className={`group relative aspect-[3/4] rounded-xl overflow-hidden border-2 bg-slate-900 ${getRarityColor(card.rarity)} transition-all duration-300 hover:scale-[1.05] hover:-translate-y-2 hover:z-20 cursor-pointer shadow-xl hover:shadow-2xl`}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img 
                                      src={card.image} 
                                      alt={card.name}
                                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient Overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
                                    {/* Rarity Flash Overlay */}
                                    <motion.div 
                                      initial={{ opacity: 0.8 }}
                                      animate={{ opacity: 0 }}
                                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                      className="absolute inset-0 bg-white pointer-events-none"
                                    />
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity bg-gradient-to-b ${card.rarity === 'UR' ? 'from-yellow-500' : 'from-transparent'}`} />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 p-3 flex flex-col justify-between z-10">
                                    <div className="flex justify-between items-start">
                                        <span className={`px-2 py-0.5 text-xs font-bold rounded shadow-lg ${getRarityBadge(card.rarity)}`}>
                                            {card.rarity}
                                        </span>
                                        {card.rarity === 'UR' && <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />}
                                    </div>

                                    <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <h4 className={`text-sm sm:text-base font-bold leading-tight mb-1 drop-shadow-md ${card.rarity === 'UR' ? 'text-yellow-100' : 'text-slate-100'}`}>
                                            {card.name}
                                        </h4>
                                        <p className="text-[10px] sm:text-xs text-slate-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Shine Effect for UR/SSR */}
                                {(card.rarity === 'UR' || card.rarity === 'SSR') && (
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent translate-x-[-150%] animate-[shine_2s_infinite] pointer-events-none" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 flex justify-center gap-4 sm:gap-8 z-30">
             <button
               disabled={isPulling || showPool}
               onClick={() => pullCards(1)}
               className="px-6 sm:px-8 py-3 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-500 text-slate-200 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center min-w-[100px] sm:min-w-[140px]"
             >
                <span className="text-sm">单抽</span>
                <span className="text-[10px] text-slate-500 mt-1 uppercase">160 Credits</span>
             </button>

             <button
               disabled={isPulling || showPool}
               onClick={() => pullCards(10)}
               className="relative px-6 sm:px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center min-w-[120px] sm:min-w-[160px] shadow-lg shadow-indigo-500/30 overflow-hidden group"
             >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm">十连抽</span>
                </div>
                <span className="relative text-[10px] text-indigo-200 mt-1 uppercase">1600 Credits</span>
             </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};