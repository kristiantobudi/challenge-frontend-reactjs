import Section from "../Section/Section";
import { CountdownTimeSetting } from "./countdownTimeSetting";

export default function CountdownTime() {
  const { countDownTime, minutesCircle, secondCircle } = CountdownTimeSetting();

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
