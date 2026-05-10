"use client";

import { motion, useScroll, useTransform } from 'framer-motion';

interface MotionRevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export const MotionReveal = ({ 
  children, 
  delay = 0, 
  y = 30,
  className,
  animate = false
}: MotionRevealProps & { animate?: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      whileInView={!animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const HeroParallax = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-0">
      {children}
    </motion.div>
  );
};
