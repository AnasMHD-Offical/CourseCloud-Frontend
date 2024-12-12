import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Star, ChevronRight, Home } from "lucide-react";
import { toast } from "sonner";
import { axios_instance } from "@/Config/axios_instance";
import ContainerSkelton from "@/Components/fallback/ContainerSkeleton";
import Quiz from "./Quiz_UI/QuizMain";

const quizzes = [
  {
    id: 1,
    title: "10 Easy HTML Questions",
    time: "12:45",
    score: 10,
    description: "This is only for increasing your knowledge limits.",
    difficulty: "easy",
  },
  {
    id: 2,
    title: "10 Intermediate CSS Questions",
    time: "12:45",
    score: 10,
    description: "Challenge yourself with more advanced concepts.",
    difficulty: "medium",
  },
  {
    id: 3,
    title: "10 Hard JS Questions",
    time: "12:45",
    score: 10,
    description: "Test your expertise with complex problems.",
    difficulty: "hard",
  },
  // Add more quizzes as needed
];

const difficulty = ["easy", "medium", "hard"];

export default function QuizConponentOverview({ topic, title, For }) {
  const [easyQuiz, setEasyQuiz] = useState([]);
  // const [intermediateQuiz, setIntermediateQuiz] = useState([]);
  // const [hardQuiz, setHardQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const get_quizes = async () => {
    try {
      const response = await axios_instance.get("api/create_quizess", {
        params: {
          topic: topic,
        },
      });

      const { success, quizzes } = response?.data;
      if (success) {
        const quiz = JSON.parse(quizzes);
        // console.log(quiz);
        setEasyQuiz(quiz.easy);
        // setIntermediateQuiz(quiz.medium);
        // setHardQuiz(quiz.hard);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  const handleQuizCompletion = (val) => {
    setQuizCompleted(val === false ? true : false);
  };

  useEffect(() => {
    setIsLoading(true);
    get_quizes();
  }, [quizCompleted]);

  return (
    <motion.div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <Card
          className="border flex flex-col md:flex-row md:justify-between md:items-start rounded-lg shadow-sm shadow-purple-100 bg-gradient-to-r to-blue-50 from-purple-50"
        >
          <CardContent className="p-4">
            <h3 className="text-xl lg:text-2xl font-bold bg-clip-text bg-gradient-to-r from-primary to-purple-800 text-transparent">
              {`${title} Completion quiz`}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{"12.45 min"}</span>
              <Star className="h-4 w-4" />
              <span>Total score: {10}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {"This is only for increasing your knowledge limits."}
            </p>
          </CardContent>
          <CardFooter className="p-4">
            {isLoading ? (
              "Ai is createing quiz for you wait for it....."
            ) : (
              <Quiz
                questions={easyQuiz}
                difficulty={"easy"}
                title={title}
                handleQuizCompletion={handleQuizCompletion}
              />
            )}
          </CardFooter>
        </Card>
      </div>
    </motion.div>
  );
}
