import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

export function Timer({ initialTime, onTimeUp, onTimeTaken }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeUp();
          onTimeTaken(0);
          return 0;
        }
        onTimeTaken(prevTime - 1);
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp, onTimeTaken]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const percentage = (time / initialTime) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center text-indigo-600">
          <Clock className="w-5 h-5 mr-2" />
          <span className="font-semibold">Time Remaining</span>
        </div>
        <div className="text-2xl font-bold text-indigo-700">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>
      </div>
      <Progress value={percentage} className="h-2" />
    </motion.div>
  );
}
