import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, ExternalLink, Activity, RefreshCw, AlertCircle } from 'lucide-react';

interface MediaStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Simulating data structure from API
interface StatData {
  label: string;
  value: string;
  change: string;
  color: string;
}

export const MediaStatsModal: React.FC<MediaStatsModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Not Synced');
  
  // Initial Mock Data - In a real scenario with a backend proxy, these would be populated from the API
  const [stats, setStats] = useState<StatData[]>([
    { label: '全网总播放 (Views)', value: '---', change: '-', color: 'text-slate-500' },
    { label: '粉丝总数 (Fans)', value: '---', change: '-', color: 'text-slate-500' },
    { label: '互动指数 (Engagement)', value: '---', change: '-', color: 'text-slate-500' },
  ]);

  // Simulate Fetching Data
  // NOTE: Direct calls to api.bilibili.com or douyin.com from the browser will fail due to CORS.
  // This function simulates the latency of a real network request.
  const fetchRealTimeData = () => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setStats([
        { label: '全网总播放 (Views)', value: '1,285,432', change: '+12.5%', color: 'text-blue-400' },
        { label: '粉丝总数 (Fans)', value: '32,109', change: '+5.2%', color: 'text-pink-400' },
        { label: '互动指数 (Engagement)', value: '98.2', change: '+2.1%', color: 'text-purple-400' },
      ]);
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString());
      setIsLoading(false);
    }, 1500);
  };

  // Auto-fetch on open
  useEffect(() => {
    if (isOpen) {
      fetchRealTimeData();
    }
  }, [isOpen]);

  const platforms = [
    {
      name: '抖音',
      url: 'https://www.douyin.com/user/self?from_tab_name=main&showTab=post',
      color: 'from-slate-900 to-black border-slate-700 hover:border-white/50',
      iconColor: 'text-white',
      note: '逐梦光影的主页',
      apiHint: 'API: open.douyin.com'
    },
    {
      name: '哔哩哔哩 Bilibili',
      url: 'https://space.bilibili.com/3493116143209321?spm_id_from=333.1007.0.0',
      color: 'from-pink-950/30 to-slate-900 border-pink-500/30 hover:border-pink-400',
      iconColor: 'text-pink-400',
      note: 'UID: 3493116143209321',
      apiHint: 'API: api.bilibili.com/x/relation/stat'
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-500" />
                数据监测面板
              </h2>
              <div className="flex items-center gap-2 mt-1">
                 <span className="text-xs text-slate-400 uppercase tracking-wider">Live Data Stream</span>
                 {isLoading && <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={fetchRealTimeData} 
                disabled={isLoading}
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-slate-300 disabled:opacity-50 transition-colors flex items-center gap-2 text-xs font-mono"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'SYNCING...' : 'SYNC'}
              </button>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-8">
            
            {/* Disclaimer for User */}
            <div className="bg-blue-900/10 border border-blue-500/20 p-3 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-200/70">
                <p>正在尝试通过公开接口获取数据... (模拟连接)</p>
                <p className="opacity-60 mt-1">注：由于浏览器安全策略(CORS)，真实环境需要后端服务器代理才能访问 api.bilibili.com 和 open.douyin.com。</p>
              </div>
            </div>

            {/* Mock Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 text-center relative overflow-hidden group">
                  {isLoading && <div className="absolute inset-0 bg-slate-700/50 animate-pulse z-10" />}
                  <div className="text-slate-400 text-xs mb-1">{stat.label}</div>
                  <div className={`text-2xl font-bold ${stat.color} font-mono tracking-tight`}>{stat.value}</div>
                  <div className="text-xs text-green-500 mt-1 flex items-center justify-center gap-1">
                    <TrendingUp className="w-3 h-3" /> {stat.change}
                  </div>
                </div>
              ))}
            </div>

            {/* Platform Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-2 flex items-center justify-between">
                <span>Platform Access</span>
                <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-1 rounded">Last Sync: {lastUpdated}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {platforms.map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col p-5 rounded-xl border bg-gradient-to-br transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg ${p.color}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`font-bold text-lg ${p.iconColor}`}>{p.name}</span>
                      <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs text-slate-300">{p.note}</span>
                    <span className="text-[10px] text-slate-500 mt-2 font-mono">{p.apiHint}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs text-slate-600">
             <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500' : 'bg-green-500'}`} />
                {isLoading ? 'Connecting to API Gateway...' : 'System Operational'}
             </div>
             <span className="font-mono opacity-50">v1.2.4-stable</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};