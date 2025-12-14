import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Armchair } from 'lucide-react';
import { TimerMode } from '../types';
import { TIMER_SETTINGS } from '../constants';
import Button from './Button';

interface TimerProps {
  onTimerComplete: (mode: TimerMode) => void;
}

const Timer: React.FC<TimerProps> = ({ onTimerComplete }) => {
  const [mode, setMode] = useState<TimerMode>(TimerMode.WORK);
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_SETTINGS[TimerMode.WORK]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  // Format time MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(TIMER_SETTINGS[mode]);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [mode]);

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(TIMER_SETTINGS[newMode]);
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer finished
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsActive(false);
            onTimerComplete(mode);
            return 0;
          }
          return prev - 1;
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
  }, [isActive, mode, onTimerComplete]); // Removed timeLeft from dependency array to avoid re-creation

  // Calculate progress for the ring
  const totalTime = TIMER_SETTINGS[mode];
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const radius = 120;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white border-4 border-black p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center w-full max-w-md mx-auto relative overflow-hidden">
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-yellow-300 border-b-4 border-black flex items-center px-2 gap-2">
        <div className="w-2 h-2 rounded-full bg-black"></div>
        <div className="w-2 h-2 rounded-full bg-black"></div>
        <div className="w-2 h-2 rounded-full bg-black"></div>
      </div>

      <div className="mt-4 flex gap-2 mb-8 z-10">
        <button
          onClick={() => switchMode(TimerMode.WORK)}
          className={`px-3 py-1 rounded-lg border-2 border-black font-bold text-sm transition-all flex items-center gap-1
            ${mode === TimerMode.WORK ? 'bg-pink-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -translate-y-1' : 'bg-white hover:bg-gray-50'}`}
        >
          <Brain size={16} /> Work
        </button>
        <button
          onClick={() => switchMode(TimerMode.SHORT_BREAK)}
          className={`px-3 py-1 rounded-lg border-2 border-black font-bold text-sm transition-all flex items-center gap-1
            ${mode === TimerMode.SHORT_BREAK ? 'bg-cyan-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -translate-y-1' : 'bg-white hover:bg-gray-50'}`}
        >
          <Coffee size={16} /> Short
        </button>
        <button
          onClick={() => switchMode(TimerMode.LONG_BREAK)}
          className={`px-3 py-1 rounded-lg border-2 border-black font-bold text-sm transition-all flex items-center gap-1
            ${mode === TimerMode.LONG_BREAK ? 'bg-lime-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -translate-y-1' : 'bg-white hover:bg-gray-50'}`}
        >
          <Armchair size={16} /> Long
        </button>
      </div>

      <div className="relative mb-8 group">
        {/* SVG Progress Circle */}
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
        >
          <circle
            stroke="black"
            strokeWidth={stroke + 4} // Outer border
            fill="white"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#e5e7eb"
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={mode === TimerMode.WORK ? '#f472b6' : mode === TimerMode.SHORT_BREAK ? '#67e8f9' : '#bef264'}
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s linear' }}
            strokeLinecap="round"
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-6xl font-black tracking-tighter funky-font select-none">
            {formatTime(timeLeft)}
          </span>
          <span className="text-sm font-bold uppercase tracking-widest mt-2 opacity-50">
            {isActive ? 'Running' : 'Paused'}
          </span>
        </div>
      </div>

      <div className="flex gap-4 w-full justify-center">
        <Button onClick={toggleTimer} variant={isActive ? "danger" : "primary"} size="lg" className="w-32">
          {isActive ? <><Pause size={20} /> Stop</> : <><Play size={20} /> Start</>}
        </Button>
        <Button onClick={resetTimer} variant="secondary" size="lg">
          <RotateCcw size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Timer;