import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export default function FadeUp({
  children,
  delay = 0,
  className = '',
  once = true,
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-20% 0px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}
