import { Loader2 } from 'lucide-react';

function LoadingSpinner({ fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm z-50" aria-live="polite" aria-busy="true">
        <Loader2 className="w-8 h-8 text-black dark:text-white animate-spin" aria-hidden="true" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8" aria-live="polite" aria-busy="true">
      <Loader2 className="w-8 h-8 text-black dark:text-white animate-spin" aria-hidden="true" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;

