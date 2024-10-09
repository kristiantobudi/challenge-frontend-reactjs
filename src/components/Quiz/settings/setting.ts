import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dataQuiz } from "../../../data/dataQuiz";

export const Settings = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const [currentQuizIndex, setCurrentQuizIndex] = useState<number | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const quizIndex = dataQuiz.findIndex((quiz) => quiz.id === Number(id));

        if (quizIndex === -1) {
            setCurrentQuizIndex(null);
        } else {
            setCurrentQuizIndex(quizIndex);
            const savedAnswers = localStorage.getItem(`quiz-${id}-answer`);

            if (savedAnswers) {
                const answersArray = JSON.parse(savedAnswers);
                setSelectedAnswers(answersArray);
            }
        }
    }, [id]);

    const quiz = currentQuizIndex !== null ? dataQuiz[currentQuizIndex] : null;
    const quizDetails = quiz ? quiz.results[0] : null;
    const allAnswers = quizDetails
        ? [quizDetails.correct_answer, ...quizDetails.incorrect_answers]
        : [];

        const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const answer = event.target.value;
            setSelectedAnswers(answer);
            localStorage.setItem(`quiz-${id}-answer`, JSON.stringify(answer));
        };

    const handleNext = () => {
        if (currentQuizIndex !== null && currentQuizIndex < dataQuiz.length - 1) {
            setIsVisible(false);
            setTimeout(() => {
                navigate(`/quiz/${dataQuiz[currentQuizIndex + 1].id}`);
                setIsVisible(true);
            }, 500);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("username"); // Corrected spelling
        localStorage.removeItem("password");

        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("quiz-")) {
                localStorage.removeItem(key);
            }
        });

        navigate("/");
    };

    const handlePageChange = (id: number) => {
        setCurrentPage(id);
        navigate(`/quiz/${id}`);
    };

    return {
        isVisible,
        currentQuizIndex,
        selectedAnswers,
        quizDetails,
        allAnswers,
        handleAnswerChange,
        handleNext,
        handleLogout,
        currentPage,
        handlePageChange
    };
};
