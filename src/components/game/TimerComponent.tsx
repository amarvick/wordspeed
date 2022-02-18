import React, { useEffect } from 'react'

type TimerComponentProps = {
  setGameInProgress: (status: boolean) => void,
}

const TimerComponent = ({
  setGameInProgress,
}: TimerComponentProps): JSX.Element => {
  const [secs, setTime] = React.useState(10);
  const tick = () => setTime([secs - 1]);

  useEffect(() => {
    if (secs > 0) {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    } else {
      setGameInProgress(false)
    }
  });

  return (
    <div>
      <p>{secs.toString()}</p>
    </div>
  );
}

export default TimerComponent;