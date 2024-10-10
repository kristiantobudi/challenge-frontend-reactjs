import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
interface CountdownTimeState {
    minutes: number;
    seconds: number;
  }

export const CountdownTimeSetting = () => {
    const [countDownTime, setCountDownTime] = useState<CountdownTimeState>({
        minutes: 2,
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
          const totalMinutes = 2;
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
            (timeDifference % (2 * 60 * 1000)) / (1000 * 60)
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
    
            const correctAnswers = JSON.parse(
              localStorage.getItem("correctAnswers") || "[]"
            );
            const selectedAnswers = JSON.parse(
              localStorage.getItem("selectedAnswers") || "[]"
            );
            const score = correctAnswers.filter((answer: string) =>
              selectedAnswers.includes(answer)
            ).length;
    
            navigate("/quiz/results", {
              state: { score, correctAnswers, selectedAnswers },
            });
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
        const endTime = new Date().getTime() + 2 * 60 * 1000;
        saveEndTimeToSession(endTime);
    
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
          startCountDown();
        }
    
        return () => {
          if (intervalId.current) {
            clearInterval(intervalId.current);
          }
        };
      }, [startCountDown, getTimeDifference]);
    
      return {
        countDownTime,
        minutesCircle,
        secondCircle
      }
}