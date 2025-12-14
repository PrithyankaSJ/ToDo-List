import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-bold transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none border-2 border-black rounded-lg flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-yellow-300 hover:bg-yellow-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    secondary: "bg-cyan-300 hover:bg-cyan-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    danger: "bg-pink-500 hover:bg-pink-600 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    ghost: "bg-white hover:bg-gray-100 text-black border-2 border-transparent hover:border-black shadow-none",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;