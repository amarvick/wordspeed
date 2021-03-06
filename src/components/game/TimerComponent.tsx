import React, { useEffect } from 'react'
// @ts-ignore
import StickyNote from "./StickyNote.tsx";
// @ts-ignore
import { GAME_TIME } from './utils/consts.ts';
// @ts-ignore
import { setHighScores } from './utils/helpers.ts';

type TimerComponentProps = {
  setGameInProgress: (status: boolean) => void,
  score: number,
}

// TODO - Slightly broken because when you hit enter, the interval stops for a bit. Try to fix.
// You may have to pull out this functionality to a parent element?
const TimerComponent = ({
  setGameInProgress,
  score
}: TimerComponentProps): JSX.Element => {
  const [secs, setTime] = React.useState(GAME_TIME);
  const tick = (): void => setTime(secs - 1);

  useEffect(() => {
    if (secs > 0) {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    } else {
      setGameInProgress(false)
      setHighScores(score);
    }
  });

  return (
    <StickyNote 
      header={"Time"}
      text={secs.toString()}
    />
  );
}

export default TimerComponent;
