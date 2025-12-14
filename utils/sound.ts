// Simple synth for UI sounds using Web Audio API

const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
let audioCtx: AudioContext | null = null;

const getContext = () => {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
};

// Helper to play a single tone
const playTone = (
  freq: number,
  type: OscillatorType,
  duration: number,
  startTime: number = 0,
  vol: number = 0.1
) => {
  const ctx = getContext();
  // Ensure context is running (browsers suspend it until user interaction)
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.value = freq;

  osc.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime + startTime;

  // Envelope to avoid clicking
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(vol, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.start(now);
  osc.stop(now + duration);
};

export const playStartSound = () => {
  // Rising chirp
  playTone(600, 'sine', 0.1, 0, 0.1);
  playTone(800, 'sine', 0.1, 0.05, 0.1);
};

export const playStopSound = () => {
  // Falling thud
  playTone(600, 'triangle', 0.1, 0, 0.05);
  playTone(400, 'triangle', 0.1, 0.05, 0.05);
};

export const playWorkCompleteSound = () => {
  // Retro "Level Up" Arpeggio (C Major: C5, E5, G5, C6)
  playTone(523.25, 'square', 0.1, 0, 0.05);   // C5
  playTone(659.25, 'square', 0.1, 0.1, 0.05); // E5
  playTone(783.99, 'square', 0.1, 0.2, 0.05); // G5
  playTone(1046.50, 'square', 0.4, 0.3, 0.05); // C6
};

export const playBreakCompleteSound = () => {
  // Gentle "Time's Up" Chime (A4 -> E4)
  playTone(440.00, 'sine', 0.3, 0, 0.1);    // A4
  playTone(329.63, 'sine', 0.6, 0.2, 0.1);  // E4
};