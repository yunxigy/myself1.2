import { StarPavilion, Project, Plan, PlanStatus, VitsSong } from './types';

export const STAR_ALLIANCE_DATA: StarPavilion[] = [
  {
    id: 'huan',
    name: '幻星阁',
    companyName: '幻星科技',
    tag: '科幻脑洞',
    description: '抵达不可抵达之天域，射落不可触及之幻想。我们致力于将动漫、游戏与小说中那些“纯属虚构”的装备、武器、载具与黑科技逐一变为地球上可量产、可订购的真实产品。',
    icon: 'Sparkles'
  },
  {
    id: 'shen',
    name: '神星阁',
    companyName: '神星重工',
    tag: '重工',
    description: '锻铸不可折毁之钢铁，驭使不可阻挡之重工。我们专注于地球最极端的重工业装备与超级工程，从万米深海到高原冻土，从千吨级压力机到百公里级隧道，全领域打造不可替代的工业硬核实力。',
    icon: 'Hammer'
  },
  {
    id: 'yun',
    name: '陨星阁',
    companyName: '陨星互娱',
    tag: '文娱',
    description: '点燃不可熄灭之文化烈焰，掌控不可夺取之文娱王座。我们专注于全球影视、音乐、游戏、动漫与虚拟偶像产业，构建覆盖全语种、全平台的文化娱乐帝国，让优质内容无死角触达每一块屏幕。',
    icon: 'Music'
  },
  {
    id: 'fu',
    name: '赋星阁',
    companyName: '赋星智研',
    tag: '科研',
    description: '洞穿不可知之宇宙真理，铸就不可撼动之科研圣殿。我们致力于在地球上创造全世界最强、最集中、最自由的科研圣地，汇聚全球顶尖科学家，打破所有学科壁垒，让诺贝尔奖变成我们的年度 KPI。',
    icon: 'FlaskConical'
  },
  {
    id: 'guan',
    name: '观星阁',
    companyName: '观星控股',
    tag: '风投公司',
    description: '发现不可看见之未来独角兽，投下不可拒绝之资本陨落。我们专注于早期科技创业项目的风险投资，用最精准的眼光和最果断的资金，在地球范围内提前锁定下一代产业巨头。',
    icon: 'TrendingUp'
  },
  {
    id: 'yu',
    name: '语星阁',
    companyName: '语星教育',
    tag: '学生/人才/大学',
    description: '孕育不可战胜之天才军团，储备不可枯竭之人类火种。我们专注于全球顶尖学生的发掘与长期培养，从高中到博士后，打造源源不断的人才储备库，为未来三十年提供最强大脑。',
    icon: 'GraduationCap'
  },
  {
    id: 'zhu',
    name: '逐星阁',
    companyName: '逐星空天',
    tag: '空天探索',
    description: '踏入不可进入之平流层深渊，征服不可触及之天穹极速。我们专注于高超音速飞行、平流层平台、次轨道旅游与全球一小时到达运输系统，让地球真正变成一个“村”。',
    icon: 'Rocket'
  },
  {
    id: 'meng',
    name: '梦星阁',
    companyName: '梦星能源',
    tag: '能源',
    description: '掌控不可耗尽之能量洪流，点亮不可想象之永恒黎明。我们专注于可控核聚变、新一代储能与超高效能源转化技术，目标是让地球上任何地方的电力都像空气一样廉价。',
    icon: 'Zap'
  },
  {
    id: 'ling',
    name: '灵星阁',
    companyName: '灵星生物',
    tag: '基因工程',
    description: '改写不可更改之生命密码，重塑不可违逆之进化法则。我们专注于基因编辑、抗衰老医学、脑机接口与人体增强技术，让人类在地球上拥有更长、更强、更聪明的生命。',
    icon: 'Dna'
  },
  {
    id: 'you',
    name: '幽星阁',
    companyName: '幽星船舶',
    tag: '船舶制作',
    description: '劈开不可航行之虚空巨浪，打造不可沉没之海洋霸主。我们专注于超大型深海舰船、极地破冰船、无限航程核动力商船与浮空母舰，为人类在地球海洋与极地建立永不沉没的移动堡垒。',
    icon: 'Ship'
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'p1',
    title: 'STM32项目库',
    description: '嵌入式开发与硬件控制探索',
    icon: 'Cpu'
  },
  {
    id: 'p2',
    title: 'VITS语音合成',
    description: 'AI 语音模型训练与推理',
    icon: 'Mic'
  },
  {
    id: 'p3',
    title: '自媒体创作者',
    description: '内容创作与分享',
    icon: 'Video'
  },
  {
    id: 'p4',
    title: 'Galgame',
    description: '互动视觉小说开发',
    icon: 'Gamepad2'
  }
];

export const PLANS_DATA: Omit<Plan, 'action'>[] = [
  { id: '1', text: '学画画', status: PlanStatus.SHELVED },
  { id: '2', text: '学C#', status: PlanStatus.SHELVED },
  { id: '3', text: '学水果20 (FL Studio)', status: PlanStatus.SHELVED },
  { id: '4', text: '学 VITS (Get)', status: PlanStatus.DONE }, // Special handling in component
  { id: '5', text: '学学英语', status: PlanStatus.SHELVED },
  { id: '6', text: '学做游戏', status: PlanStatus.SHELVED },
  { id: '7', text: '学虚幻引擎', status: PlanStatus.SHELVED },
  { id: '8', text: '学Unity引擎', status: PlanStatus.SHELVED },
  { id: '9', text: '学AE', status: PlanStatus.DOING },
];

export const VITS_SONGS: VitsSong[] = [
  { 
    id: 's1', 
    title: 'Montagem Nada Tropica',
    url: 'https://www.bilibili.com/video/BV1KonJzBE6K/?spm_id_from=333.1387.homepage.video_card.click'
  },
  { 
    id: 's2', 
    title: '青衣',
    url: 'https://www.bilibili.com/video/BV1oeW4z7EnD/?spm_id_from=333.1387.homepage.video_card.click'
  },
  { 
    id: 's3', 
    title: '嗵嗵',
    url: 'https://www.bilibili.com/video/BV1kHxDzhEyU/?spm_id_from=333.1387.homepage.video_card.click'
  },
  { 
    id: 's4', 
    title: '一点点',
    url: 'https://www.bilibili.com/video/BV1RMszz2EbE/?spm_id_from=333.1387.homepage.video_card.click'
  },
];