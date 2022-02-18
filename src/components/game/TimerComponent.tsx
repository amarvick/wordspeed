import React, { useEffect } from 'react'
// @ts-ignore
import DataComponent from "./DataComponent.tsx";

type TimerComponentProps = {
  setGameInProgress: (status: boolean) => void,
}

const TimerComponent = ({
  setGameInProgress,
}: TimerComponentProps): JSX.Element => {
  const [secs, setTime] = React.useState(60);
  const tick = () => setTime([secs - 1]);

  useEffect(() => {
    if (secs > 0) {
      // const timerId = setInterval(() => tick(), 1000);
      // return () => clearInterval(timerId);
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