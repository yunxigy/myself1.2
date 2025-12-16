import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, ExternalLink, Activity, RefreshCw, AlertCircle, Wifi, WifiOff } from 'lucide-react';

interface MediaStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StatData {
  label: string;
  value: string;
  change: string; // Keep as placeholder for real API as history isn't available in simple endpoints
  color: string;
  source: 'Real-time' | 'Simulated';
}

export const MediaStatsModal: React.FC<MediaStatsModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('从未同步');
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  // Bilibili Configuration
  const B_UID = '3493116143209321';
  
  // Initial Data State
  const [stats, setStats] = useState<StatData[]>([
    { label: 'B站播放 (Views)', value: '---', change: '-', color: 'text-blue-400', source: 'Real-time' },
    { label: 'B站粉丝 (Fans)', value: '---', change: '-', color: 'text-pink-400', source: 'Real-time' },
    { label: 'B站获赞 (Likes)', value: '---', change: '-', color: 'text-amber-400', source: 'Real-time' },
  ]);

  // Format numbers (e.g. 12345 -> 1.2w)
  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + 'w';
    }
    return num.toLocaleString();
  };

  const fetchRealTimeData = async () => {
    setIsLoading(true);
    setFetchError(null);
    
    try {
      // Using AllOrigins as a CORS proxy to access Bilibili APIs
      // Note: In a production environment, you should build your own backend proxy.
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      
      // API 1: Relation Stat (Fans/Followers)
      // https://api.bilibili.com/x/relation/stat?vmid=UID
      const relationUrl = encodeURIComponent(`https://api.bilibili.com/x/relation/stat?vmid=${B_UID}`);
      
      // API 2: Upstat (Views/Likes)
      // https://api.bilibili.com/x/space/upstat?mid=UID
      const upstatUrl = encodeURIComponent(`https://api.bilibili.com/x/space/upstat?mid=${B_UID}`);

      // Execute fetches in parallel
      const [relationRes, upstatRes] = await Promise.all([
        fetch(proxyUrl + relationUrl).then(r => r.json()),
        fetch(proxyUrl + upstatUrl).then(r => r.json())
      ]);

      // Parse Bilibili JSON response (wrapped in AllOrigins 'contents')
      const relationData = JSON.parse(relationRes.contents);
      const upstatData = JSON.parse(upstatRes.contents);

      if (relationData.code !== 0 || upstatData.code !== 0) {
        throw new Error('Bilibili API Error');
      }

      const fans = relationData.data.follower;
      const views = upstatData.data.archive.view;
      const likes = upstatData.data.likes;

      setStats([
        { 
          label: 'B站播放 (Views)', 
          value: formatNumber(views), 
          change: 'Live', 
          color: 'text-blue-400',
          source: 'Real-time'
        },
        { 
          label: 'B站粉丝 (Fans)', 
          value: formatNumber(fans), 
          change: 'Live', 
          color: 'text-pink-400',
          source: 'Real-time'
        },
        { 
          label: 'B站获赞 (Likes)', 
          value: formatNumber(likes), 
          change: 'Live', 
          color: 'text-amber-400',
          source: 'Real-time'
        },
      ]);

      const now = new Date();
      setLastUpdated(now.toLocaleTimeString());

    } catch (error) {
      console.error("Failed to fetch stats:", error);
      setFetchError("连接超时或API限制，请稍后重试");
      // Fallback to simulated data if fetch fails
      setStats([
        { label: 'B站播放', value: 'API Error', change: 'err', color: 'text-slate-500', source: 'Simulated' },
        { label: 'B站粉丝', value: 'API Error', change: 'err', color: 'text-slate-500', source: 'Simulated' },
        { label: 'B站获赞', value: 'API Error', change: 'err', color: 'text-slate-500', source: 'Simulated' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fetch on open
  useEffect(() => {
    if (isOpen) {
      fetchRealTimeData();
    }
  }, [isOpen]);

  const platforms = [
    {
      name: '哔哩哔哩 Bilibili',
      url: `https://space.bilibili.com/${B_UID}`,
      color: 'from-pink-950/30 to-slate-900 border-pink-500/30 hover:border-pink-400',
      iconColor: 'text-pink-400',
      note: `UID: ${B_UID}`,
      status: '已连接真实接口'
    },
    {
      name: '抖音 Douyin',
      url: 'https://www.douyin.com/user/self',
      color: 'from-slate-900 to-black border-slate-700 hover:border-white/50',
      iconColor: 'text-white',
      note: '逐梦光影的主页',
      status: '接口需后端鉴权 (暂未连接)'
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
                {isLoading ? 'SYNCING...' : 'REFRESH'}
              </button>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-8">
            
            {/* Status Bar */}
            <div className={`border p-3 rounded-lg flex items-center gap-3 transition-colors ${fetchError ? 'bg-red-900/10 border-red-500/20' : 'bg-blue-900/10 border-blue-500/20'}`}>
              {fetchError ? (
                <WifiOff className="w-5 h-5 text-red-400 shrink-0" />
              ) : (
                <Wifi className="w-5 h-5 text-blue-400 shrink-0" />
              )}
              <div className="text-xs flex-1">
                {fetchError ? (
                   <span className="text-red-300">{fetchError}</span>
                ) : (
                   <span className="text-blue-200/70">
                     已通过 <strong>api.allorigins.win</strong> 代理连接 Bilibili 官方接口。
                     <br/>
                     <span className="opacity-60">抖音接口因加密限制，暂无法纯前端获取。</span>
                   </span>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 text-center relative overflow-hidden group">
                  {isLoading && <div className="absolute inset-0 bg-slate-700/50 animate-pulse z-10" />}
                  <div className="text-slate-400 text-xs mb-1 flex justify-center items-center gap-1">
                    {stat.label}
                  </div>
                  <div className={`text-2xl font-bold ${stat.color} font-mono tracking-tight`}>{stat.value}</div>
                  <div className="text-[10px] text-slate-500 mt-2 flex items-center justify-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${stat.source === 'Real-time' ? 'bg-green-500' : 'bg-slate-500'}`} />
                    {stat.source === 'Real-time' ? '实时数据' : '模拟数据'}
                  </div>
                </div>
              ))}
            </div>

            {/* Platform Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-2 flex items-center justify-between">
                <span>Platform Access</span>
                <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-1 rounded">Update: {lastUpdated}</span>
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
                    <span className="text-[10px] text-slate-500 mt-2 font-mono flex items-center gap-1">
                      {p.status.includes('真实') ? <Wifi className="w-3 h-3 text-green-500"/> : <AlertCircle className="w-3 h-3 text-yellow-500"/>}
                      {p.status}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs text-slate-600">
             <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500' : 'bg-green-500'}`} />
                {isLoading ? 'Syncing with Proxy...' : 'Monitoring Active'}
             </div>
             <span className="font-mono opacity-50">CORS Proxy Enabled</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};