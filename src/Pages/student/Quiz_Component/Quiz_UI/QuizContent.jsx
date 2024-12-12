import { motion } from 'framer-motion'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function QuizCard({ question, options, selectedAnswer, onSelectAnswer, questionNumber }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">
        <span className="text-2xl font-bold text-indigo-500 mr-2">{questionNumber}.</span>
        {question}
      </h2>
      <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => onSelectAnswer(parseInt(value))}>
        {options.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-indigo-50 transition-colors border border-indigo-100 mb-2">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer text-indigo-600">{option}</Label>
            </div>
          </motion.div>
        ))}
      </RadioGroup>
    </div>
  )
}

