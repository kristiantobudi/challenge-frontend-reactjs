import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dataQuiz } from "../data/dataQuiz";

export const ResultSetting = () => {
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const loadedAnswers: { [key: number]: string } = {};
        let correctCount = 0;

        dataQuiz.forEach((quizItem) => {
        const storedAnswer = localStorage.getItem(`quiz-${quizItem.id}-answer`);
        if (storedAnswer) {
            const parsedAnswer = JSON.parse(storedAnswer);
            loadedAnswers[quizItem.id] = parsedAnswer;

            if (parsedAnswer === quizItem.results[0].correct_answer) {
            correctCount++;
            }
        }
        });

        setUserAnswers(loadedAnswers);
        setScore(correctCount);
    }, []);

    const handleReQuiz = () => {
        dataQuiz.forEach((quizItem) => {
        localStorage.removeItem(`quiz-${quizItem.id}-answer`);
        });

        sessionStorage.removeItem("countdownEndTime");
        navigate("/quiz/1");
    };

    return {
        handleReQuiz,
        userAnswers,
        score,
    }
}