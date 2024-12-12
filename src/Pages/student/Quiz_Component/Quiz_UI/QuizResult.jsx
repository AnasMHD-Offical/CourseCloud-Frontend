import { motion } from "framer-motion";
import { Progress } from "@/Components/ui/progress";
import { Clock } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useEffect } from "react";
import { axios_instance } from "@/Config/axios_instance";

export function Results({ answers, questions, timeTaken, onRestart }) {
  const score = answers.reduce((total, answer, index) => {
    return total + (answer === questions[index].correctAnswer ? 1 : 0);
  }, 0);

  const percentage = (score / questions.length) * 100;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-purple-600">
        Quiz Results
      </h1>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-5xl font-bold text-center mb-4 text-purple-700"
      >
        {score} / {questions.length}
      </motion.div>
      <Progress value={percentage} className="h-4 mb-4" />
      <p className="text-xl text-center text-purple-600 mb-4">
        {percentage >= 80
          ? "Excellent! You're in a right path!"
          : percentage >= 60
          ? "Great job! Keep practicing!"
          : "Good effort! Review the topics and try again!"}
      </p>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">{score}</p>
          <p className="text-sm text-purple-500">Correct</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">
            {questions.length - score}
          </p>
          <p className="text-sm text-purple-500">Incorrect</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600 flex items-center justify-center">
            <Clock className="w-6 h-6 mr-2" />
            {formatTime(timeTaken)}
          </p>
          <p className="text-sm text-purple-500">Time Taken</p>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        {percentage >= 80 ? (
          <Button onClick={onRestart} className="px-8 py-2 text-lg">
            You are eligible for the cetificate
          </Button>
        ) : (
          <Button onClick={onRestart} className="px-8 py-2 text-lg">
            Restart Quiz
          </Button>
        )}
      </div>
    </div>
  );
}
