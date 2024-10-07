import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dataQuiz } from "../../data/dataQuiz";

export default function PageQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]); // Specify the type for TypeScript

  useEffect(() => {
    const quizIndex = dataQuiz.findIndex((quiz) => quiz.id === Number(id));
    if (quizIndex === -1) {
      setCurrentQuizIndex(null);
    } else {
      setCurrentQuizIndex(quizIndex);
      const savedAnswers = localStorage.getItem(`quiz-${id}-answers`);
      if (savedAnswers) {
        setSelectedAnswers(JSON.parse(savedAnswers));
      }
    }
  }, [id]);

  if (currentQuizIndex === null) {
    return <p>Quiz not found</p>;
  }

  const quiz = dataQuiz[currentQuizIndex];
  const quizDetails = quiz.results[0];
  const allAnswers = [
    quizDetails.correct_answer,
    ...quizDetails.incorrect_answers,
  ];

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const answer = event.target.value;
    const updatedAnswers = selectedAnswers.includes(answer)
      ? selectedAnswers.filter((a) => a !== answer)
      : [...selectedAnswers, answer];

    setSelectedAnswers(updatedAnswers);

    localStorage.setItem(`quiz-${id}-answers`, JSON.stringify(updatedAnswers));
  };

  const handleNext = () => {
    if (currentQuizIndex < dataQuiz.length - 1) {
      setIsVisible(false);
      setTimeout(() => {
        navigate(`/quiz/${dataQuiz[currentQuizIndex + 1].id}`);
        setIsVisible(true);
      }, 500);
    }
  };

  const handlePrevious = () => {
    if (currentQuizIndex > 0) {
      setIsVisible(false);
      setTimeout(() => {
        navigate(`/quiz/${dataQuiz[currentQuizIndex - 1].id}`);
        setIsVisible(true);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col justify-start px-4">
      <div
        className={`flex flex-col transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex px-3 py-2 items-start">
          <h1 className="text-3xl font-semibold text-gray-400 ml-2">
            {quizDetails.question}
          </h1>
        </div>
        <div className="mb-3">
          {allAnswers.map((answer, index) => (
            <div key={index} className="flex items-center px-5 py-3 ml-5">
              <input
                type="checkbox"
                value={answer}
                onChange={handleAnswerChange}
                checked={selectedAnswers.includes(answer)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500 focus:ring-2"
              />
              <label className="ms-2 text-sm font-medium text-gray-800 dark:text-gray-300">
                {answer}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end px-5 py-3 gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentQuizIndex === 0}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentQuizIndex === dataQuiz.length - 1}
          className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
