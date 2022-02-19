import React, { useEffect } from 'react'
// @ts-ignore
import DataComponent from "./DataComponent.tsx";

type TimerComponentProps = {
  setGameInProgress: (status: boolean) => void,
}

// TODO - Slightly broken because when you hit enter, the interval stops for a bit. Try to fix.
const TimerComponent = ({
  setGameInProgress,
}: TimerComponentProps): JSX.Element => {
  const [secs, setTime] = React.useState(45);
  const tick = (): void => setTime(secs - 1);

  useEffect(() => {
    if (secs > 0) {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    } else {
      setGameInProgress(false)
    }
  });

  return (
    <DataComponent 
      header={"Time"}
      text={secs.toString()}
    />
  );
}

export default TimerComponent;
