import { useCallback, useEffect, useRef, useState } from "react";

interface CountdownTimeState {
  minutes: number;
  seconds: number;
}

export default function CountdownTime() {
  const [countDownTime, setCountDownTime] = useState<CountdownTimeState>({
    minutes: 0,
    seconds: 0,
  });

  const minutesCircle = useRef<SVGCircleElement | null>(null);
  const secondCircle = useRef<SVGCircleElement | null>(null);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null); // For setInterval ID

  const changeCircleoffset = (seconds: number, minutes: number) => {
    if (minutesCircle.current && secondCircle.current) {
      const totalMinutes = 10;
      const totalSeconds = 60;

      const minutesCircumference = 2 * Math.PI * 70;
      const secondsCircumference = 2 * Math.PI * 70;

      minutesCircle.current.style.strokeDashoffset = `${
        minutes > 0
          ? minutesCircumference -
            (minutes * minutesCircumference) / totalMinutes
          : minutesCircumference
      }px`;

      secondCircle.current.style.strokeDashoffset = `${
        seconds > 0
          ? secondsCircumference -
            (seconds * secondsCircumference) / totalSeconds
          : secondsCircumference
      }px`;
    }
  };

  const getTimeDifference = useCallback((countDownDate: number) => {
    const currentTime = new Date().getTime();
    const timeDifference = countDownDate - currentTime;

    const minutes = Math.floor(
      (timeDifference % (60 * 60 * 1000)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

    if (timeDifference < 0) {
      changeCircleoffset(0, 0);
      setCountDownTime({
        minutes: 0,
        seconds: 0,
      });
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    } else {
      changeCircleoffset(seconds, minutes);
      setCountDownTime({
        minutes: minutes,
        seconds: seconds,
      });
    }
  }, []);

  const startCountDown = useCallback(() => {
    const customDate = new Date();
    const countDownDate = customDate.getTime() + 10 * 60 * 1000;

    intervalId.current = setInterval(() => {
      getTimeDifference(countDownDate);
    }, 1000);
  }, [getTimeDifference]);

  useEffect(() => {
    startCountDown();

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [startCountDown]);

  return (
    <div className=" flex justify-end mb-5 max-w-6xl w-full">
      <div className="relative">
        <svg className="-rotate-90 h-28 w-28">
          {" "}
          <circle
            r="40"
            cx="50"
            cy="50"
            className="fill-transparent stroke-lime-400 stroke-[4px]"
          ></circle>
          <circle
            r="40"
            ref={minutesCircle}
            cx="50"
            cy="50"
            style={{
              strokeDasharray: "251px",
            }}
            className="fill-transparent stroke-white stroke-[4px]"
          ></circle>
        </svg>
        <div className="text-lime-400 absolute top-8 left-6 text-base font-semibold flex flex-col items-center w-12 h-10">
          {" "}
          <span className="text-center">{countDownTime?.minutes}</span>
          <span className="text-center">
            {countDownTime?.minutes === 1 ? "Minute" : "Minutes"}
          </span>
        </div>
      </div>
      <div className="relative">
        <svg className="-rotate-90 h-28 w-28">
          <circle
            r="40"
            cx="50"
            cy="50"
            className="fill-transparent stroke-lime-400 stroke-[4px]"
          ></circle>
          <circle
            r="40"
            cx="50"
            cy="50"
            className="fill-transparent stroke-white stroke-[4px]"
            ref={secondCircle}
            style={{
              strokeDasharray: "251px",
            }}
          ></circle>
        </svg>
        <div className="text-lime-400 absolute top-8 left-6 text-base font-semibold flex flex-col items-center w-12 h-10">
          <span className="text-center">{countDownTime?.seconds}</span>
          <span className="text-center">
            {countDownTime?.seconds === 1 ? "Second" : "Seconds"}
          </span>
        </div>
      </div>
    </div>
  );
}
