import React, { useEffect } from 'react'
// @ts-ignore
import StickyNote from "./StickyNote.tsx";
// @ts-ignore
import { GAME_TIME } from './utils/consts.ts';

type TimerComponentProps = {
  setGameInProgress: (status: boolean) => void,
}

// TODO - Slightly broken because when you hit enter, the interval stops for a bit. Try to fix.
const TimerComponent = ({
  setGameInProgress,
}: TimerComponentProps): JSX.Element => {
  const [secs, setTime] = React.useState(GAME_TIME);
  const tick = (): void => setTime(secs - 1);

  useEffect(() => {
    if (secs > 0) {
      // const timerId = setInterval(() => tick(), 1000);
      // return () => clearInterval(timerId);
    } else {
      setGameInProgress(false)
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
