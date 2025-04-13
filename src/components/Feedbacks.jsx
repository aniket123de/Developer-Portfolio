import React, { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const questions = [
  {
    question: "Who's My Favourite Footballer ?",
    options: ["C. Ronaldo", "L. Messi", "K. Mbappe", "P. Maldini"],
    correctAnswer: "C. Ronaldo",  // Add the correct answer for this question
  },
  {
    question: "Which one of these is my Favourite Movie ?",
    options: ["3 Idiots", "YJHD", "Reservoir Dogs", "Maqbool"],
    correctAnswer: "3 Idiots",
  },
  {
    question: "Who is my Fav Fictional Character ?",
    options: ["Sherlock Holmes", "Harry Potter", "Thor", "Feluda"],
    correctAnswer: "Harry Potter",
  },
];

const QuizCard = ({ index, question, options, correctAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
  };

  return (
    <motion.div
      variants={fadeIn("", "spring", index * 0.5, 0.75)}
      className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full"
    >
      <p className="text-white font-black text-[24px]">{question}</p>

      <div className="mt-4">
        {options.map((option, i) => {
          let buttonColor = "bg-gray-700"; // default color for unselected options
          if (isAnswered) {
            if (option === correctAnswer) {
              buttonColor = "bg-green-500"; // correct answer
            } else if (option === selectedAnswer) {
              buttonColor = "bg-red-500"; // wrong answer
            }
          }

          return (
            <button
              key={i}
              onClick={() => !isAnswered && handleAnswerClick(option)}
              className={`w-full py-3 px-6 text-white text-[18px] font-medium rounded-full mt-2 cursor-pointer hover:scale-105 shadow-lg ${buttonColor}`}
              
            >
              {`${i + 1}. ${option}`}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

const Feedbacks = () => {
  return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Test your knowledge</p>
          <h2 className={styles.sectionHeadText}>How well you know me !</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {questions.map((question, index) => (
          <QuizCard key={index} index={index} {...question} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
