import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, CheckSquare } from 'lucide-react';
import { TimerMode, TimerConfig } from '../types';
import Button from './Button';
import { playStartSound, playStopSound, playWorkCompleteSound, playBreakCompleteSound } from '../utils/sound';

interface TimerProps {
  onTimerComplete: (mode: TimerMode) => void;
  config: TimerConfig;
}

const Timer: React.FC<TimerProps> = ({ onTimerComplete, config }) => {
  const [mode, setMode] = useState<TimerMode>(TimerMode.WORK);
  const [timeLeft, setTimeLeft] = useState<number>(config[TimerMode.WORK]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setIsActive(false);
    setTimeLeft(config[mode]);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [config, mode]);

  const formatTime = (seconds: number) => {
    const absSeconds = Math.abs(seconds);
    const mins = Math.floor(absSeconds / 60);
    const secs = absSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    if (!isActive) {
      playStartSound();
    } else {
      playStopSound();
    }
    setIsActive(!isActive);
  };

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(config[mode]);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [mode, config]);

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(config[newMode]);
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          const newValue = prev - 1;
          if (newValue === 0) {
            if (mode === TimerMode.WORK) {
              playWorkCompleteSound();
            } else {
              playBreakCompleteSound();
            }
            onTimerComplete(mode);
          }
          return newValue;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, mode, onTimerComplete]); 

  const totalTime = config[mode];
  const isOvertime = timeLeft < 0;
  const progress = totalTime === 0 ? 100 : (isOvertime ? 100 : ((totalTime - timeLeft) / totalTime) * 100);
  
  const radius = 120;
  const stroke = 8; 
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white/60 dark:bg-brand-darkless/60 backdrop-blur-xl border border-white/50 dark:border-white/5 p-8 rounded-[40px] flex flex-col items-center w-full max-w-md mx-auto relative shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]">
      
      {/* Mode Selectors */}
      <div className="bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-full flex gap-1 mb-8">
        {[
            { id: TimerMode.WORK, label: 'Focus' },
            { id: TimerMode.SHORT_BREAK, label: 'Short Break' },
            { id: TimerMode.LONG_BREAK, label: 'Long Break' },
        ].map((m) => (
             <button
              key={m.id}
              onClick={() => switchMode(m.id as TimerMode)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  mode === m.id 
                  ? 'bg-white dark:bg-slate-600 text-brand-primary shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {m.label}
            </button>
        ))}
      </div>

      <div className="relative mb-12">
        {/* Glow behind timer */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-brand-primary/20 blur-3xl transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-30'}`}></div>

        {/* SVG Progress Circle */}
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90 relative z-10"
        >
          {/* Outer Ring */}
          <circle
            className="stroke-slate-200 dark:stroke-slate-700"
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
           {/* Progress Ring */}
          <circle
            stroke="url(#gradient)"
            className={`${isActive ? 'transition-all duration-1000' : 'transition-all duration-300'}`}
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center Time */}
        <div className="absolute inset-0 flex items-center justify-center flex-col z-20">
          <span className={`text-6xl font-display font-bold tracking-tight tabular-nums select-none ${isOvertime ? 'text-red-500' : 'text-slate-800 dark:text-white'}`}>
            {formatTime(timeLeft)}
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-slate-400 mt-2">
               {isOvertime ? 'Overtime' : (isActive ? 'Running' : 'Ready')}
          </span>
        </div>
      </div>

      <div className="flex gap-4 w-full justify-center">
        <Button onClick={toggleTimer} variant={isActive ? "secondary" : "primary"} size="lg" className="min-w-[140px]">
          {isActive ? (
             isOvertime ? <><CheckSquare size={18} /> Finish</> : <><Pause size={18} /> Pause</>
          ) : (
             <><Play size={18} /> Start</>
          )}
        </Button>
        <Button onClick={resetTimer} variant="ghost" size="lg" className="rounded-full aspect-square p-0 w-12 flex items-center justify-center">
          <RotateCcw size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Timer;