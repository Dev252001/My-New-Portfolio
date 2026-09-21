import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

interface Props {
  theme: 'light' | 'dark';
  onToggle: (x: number, y: number) => void;
}

export default function ThemeToggle({ theme, onToggle }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    onToggle(cx, cy);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="w-9 h-9 flex items-center justify-center rounded-full text-ink
        hover:bg-surface transition-colors duration-150 focus-visible:outline-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
