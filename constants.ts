import { TimerConfig, TimerMode } from './types';

export const TIMER_SETTINGS: TimerConfig = {
  [TimerMode.WORK]: 25 * 60,
  [TimerMode.SHORT_BREAK]: 5 * 60,
  [TimerMode.LONG_BREAK]: 15 * 60,
};

export const COLORS = {
  primary: 'bg-yellow-300',
  secondary: 'bg-pink-400',
  accent: 'bg-cyan-300',
  highlight: 'bg-lime-300',
  purple: 'bg-purple-400',
};