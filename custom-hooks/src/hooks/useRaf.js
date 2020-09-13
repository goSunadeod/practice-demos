import { useState, useLayoutEffect } from 'react';

const useRaf = (ms = 1e12, delay = 0) => {
  const [elapsed, setElapsed] = useState(0);

  useLayoutEffect(() => {
    let raf;
    let timerStop;
    let start;

    const loop = () => {
      raf = requestAnimationFrame(onFrame);
    };
    const onFrame = () => {
      const time = Math.min(1, (Date.now() - start) / ms);
      setElapsed(time);
      loop();
    };
    const onStart = () => {
      timerStop = setTimeout(() => {
        cancelAnimationFrame(raf);
        setElapsed(1);
      }, ms);
      start = Date.now();
      loop();
    };
    const timerDelay = setTimeout(onStart, delay);

    return () => {
      clearTimeout(timerStop);
      clearTimeout(timerDelay);
      cancelAnimationFrame(raf);
    };
  }, [ms, delay]);

  return elapsed;
};

export default useRaf;