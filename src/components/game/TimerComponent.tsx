import React, { useEffect, useRef } from 'react';
import StickyNote from './StickyNote.tsx';
import { GAME_TIME } from './utils/consts.ts';
import { setHighScores } from './utils/helpers.ts';

type TimerComponentProps = {
  setGameInProgress: (status: boolean) => void;
  score: number;
};

const TimerComponent = ({
  setGameInProgress,
  score,
}: TimerComponentProps): Element => {
  const [secs, setTime] = React.useState(GAME_TIME);
  const tick = (): void => setTime(secs - 1);

  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (secs > 0) {
      timerRef.current = window.setInterval(() => tick(), 1000);
      return () => window.clearInterval(timerRef.current);
    }
    setGameInProgress(false);
    setHighScores(score);
  }, [secs, score, setGameInProgress, tick]);

  return <StickyNote header={'Time'} text={secs.toString()} />;
};

export default TimerComponent;
