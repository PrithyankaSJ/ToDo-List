import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  burst: number; 
}

// Gold, Silver, Bronze, Deep Red, Navy
const COLORS = ['#d4af37', '#c0c0c0', '#cd7f32', '#78350f', '#1e3a8a'];

const Confetti: React.FC<ConfettiProps> = ({ burst }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (burst === 0) return; 

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      rotation: number;
      rotationSpeed: number;
      shape: 'square' | 'rect';

      constructor() {
        this.x = canvas!.width / 2;
        this.y = canvas!.height / 2;
        const angle = Math.random() * Math.PI * 2;
        const velocity = 8 + Math.random() * 10;
        this.vx = Math.cos(angle) * velocity;
        this.vy = Math.sin(angle) * velocity - 3;
        
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.size = 4 + Math.random() * 6;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 5;
        this.shape = Math.random() > 0.5 ? 'square' : 'rect';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.3; // Gravity
        this.vx *= 0.94; // Air resistance
        this.vy *= 0.94;
        this.rotation += this.rotationSpeed;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;

        if (this.shape === 'square') {
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        } else {
          ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId: number;

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      particles = particles.filter((p) => p.y < canvas.height + 100);

      if (particles.length > 0) {
        animationId = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animate();

    const handleResize = () => {
        if(canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [burst]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

export default Confetti;