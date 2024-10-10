import DefaultLayouts from "../components/Layout/DefaultLayout";
import { Settings } from "../components/Quiz/settings/setting";
import { dataQuiz } from "../data/dataQuiz";
import { ResultSetting } from "./ResultSetting";

export default function ResultPage() {
  const { isVisible } = Settings();
  const { userAnswers, score, handleReQuiz } = ResultSetting();

  return (
    <DefaultLayouts>
      <div className="flex min-h-screen w-full bg-gray-50 flex-col items-center justify-center p-4">
        <div className="rounded-lg shadow-md overflow-hidden max-w-6xl w-full bg-white">
          <div className="flex items-center justify-center">
            <h1 className="text-4xl font-bold text-lime-400 p-3">Result</h1>
          </div>

          <div className="flex flex-col justify-start px-4">
            <div
              className={`flex flex-col transition-opacity duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {dataQuiz.map((quizItem, quizIndex) => {
                const quiz = quizItem.results[0];
                const allAnswers = [
                  quiz.correct_answer,
                  ...quiz.incorrect_answers,
                ];
                const userAnswer = userAnswers[quizItem.id];

                return (
                  <div key={quizIndex} className="mb-8">
                    <div className="flex items-start px-3 py-2">
                      <h1 className="ml-2 text-3xl font-semibold text-gray-600">
                        Question {quizIndex + 1}: {quiz.question}
                      </h1>
                    </div>
                    <div className="mb-3 space-y-2">
                      {allAnswers.map((answer: string, index: number) => (
                        <div
                          key={index}
                          className={`flex items-center px-5 py-3 ml-5 rounded-lg ${
                            answer === quiz.correct_answer
                              ? "bg-green-200"
                              : userAnswer === answer &&
                                userAnswer !== quiz.correct_answer
                              ? "bg-red-200"
                              : "bg-gray-100"
                          }`}
                        >
                          <span className="mr-2">
                            {answer === quiz.correct_answer
                              ? "✓"
                              : userAnswer === answer &&
                                userAnswer !== quiz.correct_answer
                              ? "✗"
                              : ""}
                          </span>
                          <label className="text-gray-800">{answer}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Your Score: {score} / {dataQuiz.length}
                </h2>
                <div className="flex flex-col p-4">
                  <button
                    onClick={handleReQuiz}
                    className="mt-4 px-6 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-700 transition-colors"
                  >
                    Re-quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayouts>
  );
}
