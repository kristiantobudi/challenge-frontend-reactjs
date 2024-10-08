import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../Section/Section";

interface CountdownTimeState {
  minutes: number;
  seconds: number;
}

export default function CountdownTime() {
  const [countDownTime, setCountDownTime] = useState<CountdownTimeState>({
    minutes: 10,
    seconds: 0,
  });

  const minutesCircle = useRef<SVGCircleElement | null>(null);
  const secondCircle = useRef<SVGCircleElement | null>(null);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();

  const saveEndTimeToSession = (endTime: number) => {
    sessionStorage.setItem("countdownEndTime", String(endTime));
  };

  const getEndTimeFromSession = () => {
    const endTime = sessionStorage.getItem("countdownEndTime");
    return endTime ? Number(endTime) : null;
  };

  const changeCircleOffset = (seconds: number, minutes: number) => {
    if (minutesCircle.current && secondCircle.current) {
      const totalMinutes = 10;
      const totalSeconds = 60;

      const minutesCircumference = 2 * Math.PI * 40;
      const secondsCircumference = 2 * Math.PI * 40;

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

  const getTimeDifference = useCallback(
    (countDownDate: number) => {
      const currentTime = new Date().getTime();
      const timeDifference = countDownDate - currentTime;

      const minutes = Math.floor(
        (timeDifference % (60 * 60 * 1000)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

      if (timeDifference < 0) {
        changeCircleOffset(0, 0);
        setCountDownTime({
          minutes: 0,
          seconds: 0,
        });
        if (intervalId.current) {
          clearInterval(intervalId.current);
        }
        navigate("/quiz/completed");
      } else {
        changeCircleOffset(seconds, minutes);
        setCountDownTime({
          minutes: minutes,
          seconds: seconds,
        });
      }
    },
    [navigate]
  );

  const startCountDown = useCallback(() => {
    const endTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutes from now
    saveEndTimeToSession(endTime); // Save end time to session storage

    intervalId.current = setInterval(() => {
      getTimeDifference(endTime);
    }, 1000);
  }, [getTimeDifference]);

  useEffect(() => {
    const savedEndTime = getEndTimeFromSession();
    if (savedEndTime) {
      getTimeDifference(savedEndTime);
      intervalId.current = setInterval(() => {
        getTimeDifference(savedEndTime);
      }, 1000);
    } else {
      startCountDown(); // Start a new countdown if no saved time
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [startCountDown, getTimeDifference]);

  return (
    <div className="flex justify-between w-full max-w-6xl mb-5">
      <div className="flex items-center justify-start">
        <Section />
      </div>

      <div className="flex">
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
              ref={minutesCircle}
              cx="50"
              cy="50"
              style={{
                strokeDasharray: "251px",
              }}
              className="fill-transparent stroke-white stroke-[4px]"
            ></circle>
          </svg>
          <div className="absolute flex flex-col items-center w-12 h-10 text-base font-semibold text-lime-400 top-8 left-6">
            <span className="text-center">{countDownTime.minutes}</span>
            <span className="text-center">
              {countDownTime.minutes === 1 ? "Minute" : "Minutes"}
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
              ref={secondCircle}
              cx="50"
              cy="50"
              style={{
                strokeDasharray: "251px",
              }}
              className="fill-transparent stroke-white stroke-[4px]"
            ></circle>
          </svg>
          <div className="absolute flex flex-col items-center w-12 h-10 text-base font-semibold text-lime-400 top-8 left-6">
            <span className="text-center">{countDownTime.seconds}</span>
            <span className="text-center">
              {countDownTime.seconds === 1 ? "Second" : "Seconds"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
