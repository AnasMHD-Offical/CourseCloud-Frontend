"use client";

import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { QuizCard } from "./QuizContent";
import { Timer } from "./QuizTimer";
import { Results } from "./QuizResult";
import { Progress } from "@/Components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../Components/ui/dialog";
import confetti from "canvas-confetti";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { axios_instance } from "@/Config/axios_instance";

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Hyper Text Makeup Language",
      "Hyper Test Markup Language",
      "Hypo Text Markup Language",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correctAnswer: 1,
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    options: ["<lb>", "<break>", "<br>", "<newline>"],
    correctAnswer: 2,
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: ["class", "styles", "font", "style"],
    correctAnswer: 3,
  },
  {
    question: "What is the correct HTML for creating a checkbox?",
    options: [
      "<input type='check'>",
      "<check>",
      "<checkbox>",
      "<input type='checkbox'>",
    ],
    correctAnswer: 3,
  },
  {
    question:
      "Which HTML element is used to specify a header for a document or section?",
    options: ["<head>", "<top>", "<header>", "<heading>"],
    correctAnswer: 2,
  },
  {
    question: "What is the correct HTML for making a drop-down list?",
    options: ["<list>", "<select>", "<input type='dropdown'>", "<dropdown>"],
    correctAnswer: 1,
  },
  {
    question:
      "In HTML, which attribute is used to specify that an input field must be filled out?",
    options: ["validate", "required", "placeholder", "important"],
    correctAnswer: 1,
  },
  {
    question: "What is the correct HTML for inserting an image?",
    options: [
      "<img href='image.gif' alt='MyImage'>",
      "<image src='image.gif' alt='MyImage'>",
      "<img src='image.gif' alt='MyImage'>",
      "<img alt='MyImage'>image.gif</img>",
    ],
    correctAnswer: 2,
  },
  {
    question: "Which HTML element defines the title of a document?",
    options: ["<meta>", "<head>", "<title>", "<header>"],
    correctAnswer: 2,
  },
];

export default function Quiz({ questions, difficulty,title , handleQuizCompletion}) {
  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );
  const { current_lesson_id, current_course_id } = useSelector(
    (state) => state?.current_course_data
  );
  console.log(current_course_id, current_lesson_id);
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    new Array(questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [direction, setDirection] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);


  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
  });

  const handleAnswer = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);

    if (index === questions[currentQuestion].correctAnswer) {
      setStreak(streak + 1);
      if (streak + 1 >= 3) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } else {
      setStreak(0);
    }

    // Automatically move to the next question after a short delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        handleNext();
      } else {
        handleSubmit();
      }
    }, 500);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setDirection(1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setDirection(-1);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    try {
      const score = answers.reduce((total, answer, index) => {
        return total + (answer === questions[index].correctAnswer ? 1 : 0);
      }, 0);
      const response = await axios_instance.post("/api/store_results", {
        student_id: student_id,
        course_id: current_course_id,
        lesson_id: current_lesson_id,
        total_score: questions.length,
        student_scored: score,
        time_taken: formatTime(timeTaken),
        difficulty: difficulty,
      });
      const { success, message } = response?.data;
      if (success) {
        setShowResults(true);
        toast.success(message);
        // handleQuizCompletion(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (timeUp) {
      setShowResults(true);
    }
  }, [timeUp]);

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setTimeUp(false);
    setDirection(0);
    setStreak(0);
    setTimeTaken(0);
    setQuizStarted(false);
    setIsOpen(false);
     handleQuizCompletion(false)
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setIsOpen(true);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) resetQuiz();
          setIsOpen(open);
        }}
      >
        <DialogTrigger asChild>
          <Button
            className="w-full bg-gradient-to-r from-purple-900 to-purple-600 hover:text-neutral-50 text-white "
            variant="outline"
          >
            Start
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          {showResults ? (
            <Results
              answers={answers}
              questions={questions}
              timeTaken={timeTaken}
              onRestart={resetQuiz}
            />
          ) : (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">
               {`${title} Quiz` || "Title"}
              </h1>
              {!quizStarted ? (
                <div className="text-center space-y-4">
                  <p className="text-lg text-indigo-500">
                    {`Test your knowledge in the "${title}" course with 10 questions!`}
                  </p>
                  <p className="text-sm text-indigo-400">
                    You have 12 minutes and 45 seconds to complete the quiz.
                  </p>
                  <Button onClick={() => setQuizStarted(true)} className="mt-4">
                    Begin Quiz
                  </Button>
                </div>
              ) : (
                <>
                  <Timer
                    initialTime={765}
                    onTimeUp={() => setTimeUp(true)}
                    onTimeTaken={(time) => setTimeTaken(765 - time)}
                  />
                  <div className="flex justify-between items-center my-4">
                    <div className="text-indigo-600 font-semibold">
                      Question {currentQuestion + 1} of {questions.length}
                    </div>
                    <div className="text-indigo-600 font-semibold">
                      Streak: {streak} 🔥
                    </div>
                  </div>
                  <Progress
                    value={((currentQuestion + 1) / questions.length) * 100}
                    className="mb-6"
                  />
                  <div {...handlers}>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                        transition={{ duration: 0.3 }}
                      >
                        <QuizCard
                          question={questions[currentQuestion].question}
                          options={questions[currentQuestion].options}
                          selectedAnswer={answers[currentQuestion]}
                          onSelectAnswer={handleAnswer}
                          questionNumber={currentQuestion + 1}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      variant="outline"
                      className="w-28 flex items-center justify-center"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    {currentQuestion < questions.length - 1 ? (
                      <Button
                        onClick={handleNext}
                        className="w-28 flex items-center justify-center"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit} className="w-28">
                        Submit
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
