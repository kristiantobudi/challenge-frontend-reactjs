import { useParams } from "react-router-dom";
import { dataQuiz } from "../data/dataQuiz";
import { useState } from "react";

export const useHelper = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { id } = useParams();
    const quiz = dataQuiz.find((quiz) => quiz.id === Number(id));

    if (!quiz) {
        return { quizDetails: null, handleNext: () => {}, handlePrevious: () => {}, currentIndex, setCurrentIndex };
    }

    const quizDetails = quiz.results[currentIndex];

    const handleNext = () => {

    if (currentIndex < quiz.results.length - 1) {
        setCurrentIndex(currentIndex + 1);
    }
    };

    const handlePrevious = () => {
    if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
    }
    };

    return { quizDetails, handleNext, handlePrevious, currentIndex, setCurrentIndex };
}
