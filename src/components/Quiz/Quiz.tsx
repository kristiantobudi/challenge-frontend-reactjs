import CountdownTime from "../CountdownTime/CountdownTIme";
import PageQuiz from "./PageQuiz";

export default function Quiz() {
  return (
    <>
      <div className="flex">
        <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4">
          <CountdownTime />
          <div className="rounded-lg shadow-md overflow-hidden max-w-6xl w-full bg-white">
            <div className="flex items-center justify-center">
              <h1 className="text-4xl font-bold text-lime-400 p-3">Quiz</h1>
            </div>
            <PageQuiz />
          </div>
        </div>
      </div>
    </>
  );
}
