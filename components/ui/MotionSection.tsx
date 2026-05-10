"use client";

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionSectionProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
}

/**
 * A client-side wrapper for animated sections to keep parent components as Server Components.
 */
export function MotionSection({ children, ...props }: MotionSectionProps) {
  return (
    <motion.div {...props}>
      {children}
    </motion.div>
  );
}
