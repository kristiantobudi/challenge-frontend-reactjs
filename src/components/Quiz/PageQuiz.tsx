import { useNavigate } from "react-router-dom";
import { dataQuiz } from "../../data/dataQuiz";
import { Settings } from "./settings/setting";

export default function PageQuiz() {
  const {
    isVisible,
    quizDetails,
    allAnswers,
    selectedAnswers,
    handleAnswerChange,
    currentQuizIndex,
  } = Settings();
  const navigate = useNavigate();
  const handleSubmit = () => {
    sessionStorage.removeItem("countdownMinutes");
    sessionStorage.removeItem("countdownSeconds");
    if (currentQuizIndex !== null && selectedAnswers) {
      const currentQuiz = dataQuiz[currentQuizIndex];
      const answerKey = `quiz-${currentQuiz.id}-answer`;
      localStorage.setItem(answerKey, JSON.stringify(selectedAnswers));
    }

    navigate("/quiz/results");
  };

  return (
    <div className="flex flex-col justify-start px-4">
      <div
        className={`flex flex-col transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {quizDetails ? (
          <>
            <div className="flex items-start px-3 py-2">
              <h1 className="ml-2 text-3xl font-semibold text-gray-400">
                {quizDetails.question}
              </h1>
            </div>
            <div className="mb-3">
              {allAnswers.map((answer, index) => (
                <div key={index} className="flex items-center px-5 py-3 ml-5">
                  <input
                    type="radio"
                    value={answer}
                    onChange={handleAnswerChange}
                    checked={selectedAnswers === answer}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500 focus:ring-2"
                  />
                  <label className="text-sm font-medium text-gray-800 ms-2 dark:text-gray-300">
                    {answer}
                  </label>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-4 text-center">
            <p className="text-gray-500">Quiz not found or loading...</p>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4 px-5 py-3">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-white rounded-lg bg-lime-500 hover:bg-lime-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
