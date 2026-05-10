"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  alignment?: "left" | "center";
  className?: string;
}

export const SectionHeading = ({ 
  title, 
  subtitle, 
  description,
  alignment = "center",
  className 
}: SectionHeadingProps) => {
  return (
    <div className={cn(
      "section-heading-wrapper",
      alignment === "center" ? "text-center" : "text-left",
      className
    )}>
      {subtitle && (
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-heading-subtitle"
        >
          {subtitle}
        </motion.span>
      )}
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="display-title"
      >
        {title}
      </motion.h2>
      
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className={cn(
          "h-0.5 bg-accent/40 w-24 mt-8",
          alignment === "center" ? "mx-auto" : "ml-0"
        )}
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={cn(
            "section-heading-description",
            alignment === "center" ? "mx-auto" : "ml-0"
          )}
        >
          {description}
        </motion.p>
      )}
      
      <div className={cn(
        "mt-8 opacity-10",
        alignment === "center" ? "mx-auto" : "ml-0"
      )}>
        <span className="text-3xl">❀</span>
      </div>
    </div>
  );
};
