
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  RotateCcw, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Swords,
  Crown,
  Map as MapIcon,
  Compass,
  Mountain,
  Flame,
  ShieldCheck,
  Timer,
  ArrowRight
} from 'lucide-react';
import { TIME_QUESTS, TimeQuest } from './constants';

type GameState = 'start' | 'playing' | 'results';
type Player = 'Gor' | 'Gayane';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState({ Gor: 0, Gayane: 0 });
  const [currentPlayer, setCurrentPlayer] = useState<Player>('Gor');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [shuffledQuests, setShuffledQuests] = useState<TimeQuest[]>(() => [...TIME_QUESTS].sort(() => 0.5 - Math.random()));

  const startGame = () => {
    setShuffledQuests([...TIME_QUESTS].sort(() => 0.5 - Math.random()));
    setGameState('playing');
    setCurrentIndex(0);
    setScores({ Gor: 0, Gayane: 0 });
    setCurrentPlayer('Gor');
    setFeedback(null);
  };

  const handleAnswer = (answer: string) => {
    if (feedback) return;

    const isCorrect = answer === shuffledQuests[currentIndex].correct;
    
    if (isCorrect) {
      setScores(prev => ({ ...prev, [currentPlayer]: prev[currentPlayer] + 10 }));
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < 19) {
        setCurrentIndex(prev => prev + 1);
        setCurrentPlayer(prev => prev === 'Gor' ? 'Gayane' : 'Gor');
      } else {
        setGameState('results');
      }
    }, 1500);
  };

  const winner = scores.Gor > scores.Gayane ? 'Gor' : scores.Gayane > scores.Gor ? 'Gayane' : 'Draw';

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* HUD - Scoreboard */}
      <header className="bg-slate-900/90 backdrop-blur-xl border-b border-white/5 px-4 py-4 z-50 sticky top-0 shadow-2xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          <div className={`flex items-center gap-2 sm:gap-4 transition-all duration-500 ${currentPlayer === 'Gor' ? 'opacity-100 scale-105 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'opacity-40 grayscale'}`}>
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg text-white border border-blue-300/30">
              <User className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div>
              <p className="text-[8px] sm:text-[10px] font-black uppercase text-blue-400 tracking-[0.2em]">Մարտիկ 1</p>
              <p className="text-base sm:text-2xl font-black text-white leading-none">ԳՈՌ</p>
              <div className="text-sm sm:text-xl font-black text-blue-400 mt-0.5 sm:mt-1">{scores.Gor} <span className="text-[8px] uppercase opacity-50 font-bold">ՄԻԱՎՈՐ</span></div>
            </div>
          </div>

          <div className="flex flex-col items-center shrink-0">
            <div className="relative group">
              <Compass className="text-indigo-400 animate-pulse w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="flex items-center gap-1 mt-1 sm:mt-2">
              <Timer className="text-slate-500 w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs font-black uppercase text-indigo-400 tracking-widest">
                {currentIndex + 1} / 20
              </span>
            </div>
          </div>

          <div className={`flex items-center gap-2 sm:gap-4 transition-all duration-500 ${currentPlayer === 'Gayane' ? 'opacity-100 scale-105 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'opacity-40 grayscale'}`}>
            <div className="text-right">
              <p className="text-[8px] sm:text-[10px] font-black uppercase text-rose-400 tracking-[0.2em]">Մարտիկ 2</p>
              <p className="text-base sm:text-2xl font-black text-white leading-none">ԳԱՅԱՆԵ</p>
              <div className="text-sm sm:text-xl font-black text-rose-400 mt-0.5 sm:mt-1">{scores.Gayane} <span className="text-[8px] uppercase opacity-50 font-bold">ՄԻԱՎՈՐ</span></div>
            </div>
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-rose-600 to-rose-400 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg text-white border border-rose-300/30">
              <User className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center relative min-h-[500px]">
        {/* Background Quest Elements */}
        <div className="absolute top-1/4 -left-10 opacity-5 pointer-events-none">
          <Mountain size={400} />
        </div>
        <div className="absolute bottom-1/4 -right-10 opacity-5 pointer-events-none">
          <Mountain size={300} />
        </div>

        <AnimatePresence mode="wait">
          {gameState === 'start' && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center space-y-12"
            >
              <div className="space-y-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="inline-block bg-indigo-500/10 p-6 rounded-full border border-indigo-500/20 mb-4"
                >
                  <MapIcon size={64} className="text-indigo-400" />
                </motion.div>
                <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white">
                  ԺԱՄԱՆԱԿԻ <span className="text-indigo-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">ՔՎԵՍՏ</span>
                </h1>
                <p className="text-slate-400 font-bold uppercase text-sm tracking-[0.4em] max-w-lg mx-auto">
                  Մրցակցային արկած իսպաներենի աշխարհում
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <QuestInfoCard icon={<Flame className="text-orange-400" />} title="Էքշըն" desc="Արագ արձագանքիր" />
                <QuestInfoCard icon={<Swords className="text-indigo-400" />} title="Մարտ" desc="Գոռ vs Գայանե" />
                <QuestInfoCard icon={<ShieldCheck className="text-emerald-400" />} title="Գիտելիք" desc="Տիրապետիր ժամերին" />
              </div>

              <button 
                onClick={startGame}
                className="group relative px-20 py-8 overflow-hidden rounded-[2.5rem] bg-indigo-600 font-black text-3xl uppercase tracking-widest text-white shadow-[0_20px_50px_rgba(99,102,241,0.3)] hover:bg-indigo-500 hover:-translate-y-2 transition-all active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                ՍԿՍԵԼ ՔՎԵՍՏԸ
                <ArrowRight size={32} className="inline-block ml-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              {/* Question UI */}
              <div className="text-center space-y-8">
                <div className="flex items-center justify-center gap-4">
                  <div className={`h-1 w-20 rounded-full transition-colors ${currentPlayer === 'Gor' ? 'bg-blue-500' : 'bg-slate-700'}`} />
                  <motion.div 
                    className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-[0.3em] border-2 shadow-xl ${currentPlayer === 'Gor' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {currentPlayer === 'Gor' ? 'Գոռի հերթն է' : 'Գայանեի հերթն է'}
                  </motion.div>
                  <div className={`h-1 w-20 rounded-full transition-colors ${currentPlayer === 'Gayane' ? 'bg-rose-500' : 'bg-slate-700'}`} />
                </div>

                <div className="relative inline-block">
                  <div className="absolute -inset-10 bg-indigo-500/5 blur-[60px] rounded-full animate-pulse" />
                  <div className="relative bg-slate-800/50 backdrop-blur-xl p-12 rounded-[4rem] border border-slate-700 shadow-2xl ring-1 ring-white/5">
                    <h2 className="text-7xl md:text-9xl font-black italic text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      {shuffledQuests[currentIndex]?.time}
                    </h2>
                    <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.5em] mt-4">¿QUÉ HORA ES?</p>
                  </div>
                </div>
              </div>

              {/* Answers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {shuffledQuests[currentIndex]?.options.map((opt, i) => (
                  <button
                    key={i}
                    disabled={!!feedback}
                    onClick={() => handleAnswer(opt)}
                    className={`
                      relative group py-8 px-10 rounded-[2.5rem] font-black text-xl italic uppercase transition-all shadow-2xl border-2 overflow-hidden
                      ${feedback && opt === shuffledQuests[currentIndex].correct 
                        ? 'bg-emerald-500 border-emerald-400 text-white scale-105 rotate-1 z-10' 
                        : feedback && opt !== shuffledQuests[currentIndex].correct
                          ? 'bg-slate-800/20 border-slate-700 text-slate-600 grayscale opacity-40'
                          : 'bg-slate-800/80 border-slate-700 text-white hover:border-indigo-500 hover:bg-slate-800 hover:-translate-y-1'
                      }
                    `}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {opt}
                  </button>
                ))}
              </div>

              {/* Feedback Effects */}
              <AnimatePresence>
                {feedback && (
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0, rotate: 15 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 px-10"
                  >
                     <div className="relative">
                        <div className={`absolute -inset-20 blur-[100px] rounded-full ${feedback === 'correct' ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`} />
                        {feedback === 'correct' ? (
                          <div className="flex flex-col items-center">
                            <CheckCircle2 size={160} className="text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.5)]" />
                            <motion.span 
                               initial={{ y: 20, opacity: 0 }}
                               animate={{ y: 0, opacity: 1 }}
                               className="text-4xl font-black italic text-emerald-400 mt-6"
                            >
                                +10 ՄԻԱՎՈՐ
                            </motion.span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <AlertCircle size={160} className="text-rose-500 drop-shadow-[0_0_30px_rgba(244,63,94,0.5)]" />
                            <motion.span 
                               initial={{ y: 20, opacity: 0 }}
                               animate={{ y: 0, opacity: 1 }}
                               className="text-4xl font-black italic text-rose-500 mt-6 uppercase"
                            >
                                ՍԽԱԼ Է
                            </motion.span>
                          </div>
                        )}
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {gameState === 'results' && (
            <motion.div 
              key="results"
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="text-center space-y-12"
            >
              <div className="relative inline-block">
                <div className={`w-56 h-56 rounded-[5rem] rotate-12 flex items-center justify-center mx-auto shadow-2xl border-4 border-white/20 transition-all duration-1000 ${winner === 'Gor' ? 'bg-blue-600 shadow-blue-500/40' : winner === 'Gayane' ? 'bg-rose-600 shadow-rose-500/40' : 'bg-slate-700 shadow-slate-500/40'}`}>
                  {winner === 'Draw' ? (
                    <Compass size={120} className="text-white -rotate-12" />
                  ) : (
                    <Crown size={120} className="text-white -rotate-12 animate-bounce" />
                  )}
                </div>
                <Zap size={48} className="absolute -top-4 -right-4 text-yellow-400" />
              </div>
              
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-black italic uppercase text-white tracking-tighter leading-[0.9]">
                  {winner === 'Draw' ? (
                    <>ՀԱՎԱՍԱՐ<br/>ՄԱՐՏ</>
                  ) : (
                    <>{winner === 'Gor' ? 'ԳՈՌԸ' : 'ԳԱՅԱՆԵՆ'}<br/>ՀԱՂԹԵՑ</>
                  )}
                </h2>
                
                <div className="flex justify-center gap-10 sm:gap-16 pt-4 sm:pt-8">
                  <ResultPlayerCard name="ԳՈՌ" score={scores.Gor} color="text-blue-400" active={winner === 'Gor'} />
                  <ResultPlayerCard name="ԳԱՅԱՆԵ" score={scores.Gayane} color="text-rose-400" active={winner === 'Gayane'} />
                </div>
              </div>

              <button 
                onClick={() => setGameState('start')}
                className="mt-12 px-16 py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl uppercase tracking-widest hover:bg-slate-700 shadow-2xl transition-all flex items-center justify-center gap-4 mx-auto border-b-8 border-slate-900 active:border-b-0 active:translate-y-1"
              >
                <RotateCcw size={28} /> ՎԵՐԱՍԿՍԵԼ ՔՎԵՍՏԸ
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="px-8 py-10 text-center">
        <div className="max-w-xs mx-auto h-1 bg-slate-800 rounded-full mb-4" />
        <p className="text-slate-500 font-black italic uppercase tracking-[0.3em] text-[10px]">
          Time Quest Battle Engine • 2026 Edition
        </p>
      </footer>
    </div>
  );
}

function QuestInfoCard({ icon, title, desc }: any) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-md p-6 rounded-3xl border border-slate-700/50 flex flex-col items-center text-center group hover:bg-slate-800/60 transition-colors">
      <div className="mb-4 transform group-hover:scale-110 transition-transform">
        {React.cloneElement(icon as React.ReactElement<{ size: number }>, { size: 32 })}
      </div>
      <h3 className="font-black italic uppercase text-slate-200 tracking-wider mb-1">{title}</h3>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{desc}</p>
    </div>
  );
}

function ResultPlayerCard({ name, score, color, active }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center space-y-2 ${!active && active !== undefined ? 'opacity-50 grayscale scale-90' : ''}`}
    >
      <p className={`font-black uppercase text-xs tracking-widest ${color}`}>{name}</p>
      <p className="text-7xl font-black text-white italic tracking-tighter">{score}</p>
      {active && <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest animate-pulse">ՀԱՂԹԱՆԱԿ</p>}
    </motion.div>
  );
}
