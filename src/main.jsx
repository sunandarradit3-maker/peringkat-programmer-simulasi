import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, Award, Code2, Flame, Globe2, Search, ShieldCheck, Sparkles, TrendingUp, Users } from 'lucide-react';
import './styles.css';

const basePlayers = [
  { rank: 1, name: 'Aiden Volt', handle: '@aidenvolt', country: 'US', score: 98240, streak: 128, solved: 2148, lang: 'Rust', status: 'online', avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=Aiden&backgroundColor=1d4ed8,0f172a' },
  { rank: 2, name: 'Mika Chen', handle: '@mikacode', country: 'SG', score: 96480, streak: 111, solved: 2082, lang: 'Go', status: 'coding', avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=Mika&backgroundColor=7c3aed,111827' },
  { rank: 3, name: 'Rafael Knox', handle: '@rknox', country: 'BR', score: 94310, streak: 104, solved: 1988, lang: 'TypeScript', status: 'online', avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=Rafael&backgroundColor=be123c,111827' },
  { rank: 4, name: 'DiTz', handle: '@ditzdev', country: 'ID', score: 91870, streak: 97, solved: 1875, lang: 'JavaScript', status: 'live', avatar: '/logo.png', you: true },
  { rank: 5, name: 'Nora Byte', handle: '@norabyte', country: 'DE', score: 90420, streak: 89, solved: 1801, lang: 'Python', status: 'coding', avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=Nora&backgroundColor=0f766e,111827' },
  { rank: 6, name: 'Kenji Sora', handle: '@kenjisora', country: 'JP', score: 88790, streak: 84, solved: 1750, lang: 'C++', status: 'online', avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=Kenji&backgroundColor=c2410c,111827' },
  { rank: 7, name: 'Luna Dev', handle: '@lunadev', country: 'ES', score: 87230, streak: 76, solved: 1688, lang: 'Kotlin', status: 'offline', avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=Luna&backgroundColor=0369a1,111827' },
  { rank: 8, name: 'Theo Stack', handle: '@theostack', country: 'FR', score: 86180, streak: 72, solved: 1620, lang: 'Java', status: 'online', avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=Theo&backgroundColor=4f46e5,111827' }
];

function App() {
  const [players, setPlayers] = useState(basePlayers);
  const [query, setQuery] = useState('');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setPlayers(prev => prev.map(p => ({
        ...p,
        score: p.you ? Math.max(90000, p.score + Math.floor(Math.random() * 55)) : p.score + Math.floor(Math.random() * 42),
        solved: Math.random() > .74 ? p.solved + 1 : p.solved
      })));
      setLastUpdate(new Date());
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const filtered = useMemo(() => players.filter(p => `${p.name} ${p.handle} ${p.lang}`.toLowerCase().includes(query.toLowerCase())), [players, query]);
  const you = players.find(p => p.you);

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <div className="brand"><div className="brand-icon"><Code2 size={24}/></div><div><strong>CodeRank</strong><span>LIVE GLOBAL</span></div></div>
        <div className="live-pill"><span className="live-dot"/> Live update · {lastUpdate.toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit', second:'2-digit'})}</div>
      </header>

      <section className="hero">
        <div>
          <span className="eyebrow"><Sparkles size={15}/> Global Developer League</span>
          <h1>Peringkat programmer<br/><em>secara live.</em></h1>
          <p>Skor berubah berdasarkan challenge, kontribusi, konsistensi, dan aktivitas coding terbaru.</p>
        </div>
        <div className="hero-card">
          <div className="hero-avatar"><img src={you.avatar} onError={e => {e.currentTarget.src='https://api.dicebear.com/9.x/personas/svg?seed=DiTz'}}/></div>
          <div><span>YOUR CURRENT RANK</span><strong>#4</strong><small>Top 0.8% dunia</small></div>
          <TrendingUp className="trend"/>
        </div>
      </section>

      <section className="stats-grid">
        <Stat icon={<Users/>} label="Programmer aktif" value="48,291" foot="+1,204 minggu ini"/>
        <Stat icon={<Globe2/>} label="Negara terhubung" value="126" foot="Komunitas global"/>
        <Stat icon={<Activity/>} label="Challenge hari ini" value="12,804" foot="Sedang berlangsung"/>
        <Stat icon={<ShieldCheck/>} label="Data terverifikasi" value="99.8%" foot="Anti manipulasi"/>
      </section>

      <section className="leaderboard-card">
        <div className="section-head">
          <div><span className="section-kicker">GLOBAL STANDINGS</span><h2>Live Leaderboard</h2></div>
          <label className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari programmer..."/></label>
        </div>

        <div className="table-head"><span>Rank</span><span>Programmer</span><span>Bahasa</span><span>Streak</span><span>Solved</span><span>Live score</span></div>
        <div className="rows">
          {filtered.map(player => <PlayerRow key={player.rank} player={player}/>)}
        </div>
      </section>
    </main>
  );
}

function Stat({icon,label,value,foot}) { return <article className="stat-card"><div className="stat-icon">{icon}</div><div><span>{label}</span><strong>{value}</strong><small>{foot}</small></div></article> }

function PlayerRow({player}) {
  const medals = {1:'🥇',2:'🥈',3:'🥉'};
  return <article className={`player-row ${player.you ? 'is-you' : ''}`}>
    <div className="rank">{medals[player.rank] || `#${player.rank}`}</div>
    <div className="person"><div className="avatar-wrap"><img src={player.avatar} onError={e => {e.currentTarget.src=`https://api.dicebear.com/9.x/personas/svg?seed=${player.name}`}}/><i className={`status ${player.status}`}/></div><div><strong>{player.name}{player.you && <b className="you-badge">YOU</b>}</strong><span>{player.handle} · {player.country}</span></div></div>
    <div className="lang"><Code2 size={15}/>{player.lang}</div>
    <div className="metric"><Flame size={16}/>{player.streak} hari</div>
    <div className="metric"><Award size={16}/>{player.solved.toLocaleString('id-ID')}</div>
    <div className="score"><span>{player.score.toLocaleString('id-ID')}</span><small>+{player.you ? 42 : Math.floor(8+Math.random()*28)}</small></div>
  </article>
}

createRoot(document.getElementById('root')).render(<App />);
