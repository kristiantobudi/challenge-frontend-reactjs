export default function Section() {
  const totalPages = 10;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const isQuizAnswered = (quizId: number) => {
    const savedAnswer = localStorage.getItem(`quiz-${quizId}-answer`);
    return savedAnswer && savedAnswer !== "";
  };

  return (
    <div className="flex items-center justify-start">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md">
        <h3 className="flex w-full px-4 py-2 text-2xl font-bold text-lime-400">
          Quiz Navigation
        </h3>
        <div className="flex items-center justify-between w-full grid-cols-1 gap-2 px-4 py-1">
          {getPageNumbers().map((page) => (
            <div
              key={page}
              className={`rounded-lg shadow-md ${
                isQuizAnswered(page) ? "bg-lime-500" : "bg-red-500"
              }`}
            >
              <a
                href={`/quiz/${page}`}
                className="px-3 py-1 text-sm font-bold text-center text-white rounded-lg sm:text-sm lg:text-lg hover:bg-opacity-80 focus:ring-4 focus:outline-none focus:ring-white sm:w-full"
              >
                {page}
              </a>
            </div>
          ))}
        </div>
        <div className="justify-between w-full px-4 py-2 mb-2 text-sm text-gray-400">
          <p className="text-sm mb-2">Color guide :</p>
          <div className="flex flex-col justify-between w-full">
            <div className="flex items-center mb-1">
              <div className="w-4 h-4 mr-2 rounded-sm bg-green-500"></div>
              <p className="text-sm text-gray-700">Green: Quiz Answered</p>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 rounded-sm bg-red-500"></div>
              <p className="text-sm text-gray-700">Red: Quiz Not Answered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
