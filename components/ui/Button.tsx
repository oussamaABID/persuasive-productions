"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/**
 * Premium Button component with motion effects and multiple variants.
 * 
 * @param {ButtonProps} props - The button properties.
 * @returns {JSX.Element} The rendered button.
 */
interface ButtonProps extends HTMLMotionProps<"button"> {
  /** The visual style of the button */
  variant?: "primary" | "outline" | "ghost";
  /** The size of the button */
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export const Button = ({ 
  variant = "primary", 
  size = "md",
  className, 
  children, 
  ...props 
}: ButtonProps) => {
  const variants = {
    primary: "bg-gold-gradient text-black font-bold uppercase tracking-widest-plus shadow-gold-heavy",
    outline: "border border-accent/30 text-accent hover:border-accent hover:bg-accent/5 font-medium uppercase tracking-widest",
    ghost: "text-muted-foreground hover:text-accent transition-colors",
  };

  const sizes = {
    sm: "px-6 py-2 text-xxs",
    md: "px-10 py-4 text-xs",
    lg: "px-14 py-6 text-sm",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, translateY: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "transition-all duration-300 relative overflow-hidden group",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span className={cn("relative z-10 flex items-center justify-center gap-2", variant === "primary" && "text-black")}>
        {children}
      </span>
      {variant === "primary" && (
        <motion.div 
          className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 -skew-x-12"
        />
      )}
    </motion.button>
  );
};
