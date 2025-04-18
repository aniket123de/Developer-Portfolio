import React, { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const questions = [
  {
    question: "Who's My Favourite Footballer ?",
    options: ["C. Ronaldo", "L. Messi", "K. Mbappe", "P. Maldini"],
    correctAnswer: "C. Ronaldo",
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
  {
    question: "What's my Dream Travel Destination ?",
    options: ["Switzerland", "Japan", "New Zealand", "Iceland"],
    correctAnswer: "Switzerland",
  },
  {
    question: "Which Language do I Code the Most ?",
    options: ["JavaScript", "Python", "Java", "C++"],
    correctAnswer: "Python",
  },
];

const relationshipStatus = [
  { minScore: 0, status: "We need to meet! 🤝", color: "text-red-500" },
  { minScore: 1, status: "We're Acquaintances 👋", color: "text-yellow-500" },
  { minScore: 2, status: "We're Good Friends! 🤗", color: "text-green-500" },
  { minScore: 3, status: "Best Buddies Forever! 🫂", color: "text-[#915EFF]" },
  { minScore: 4, status: "Soul Friends! 💫", color: "text-[#915EFF]" },
  { minScore: 5, status: "Telepathic Connection! 🔮", color: "text-[#915EFF]" },
];

const QuizCard = ({ index, question, options, correctAnswer, onScoreUpdate }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerClick = (answer) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setIsAnswered(true);
      const correct = answer === correctAnswer;
      setIsCorrect(correct);
      onScoreUpdate(correct ? 1 : 0);
    }
  };

  return (
    <motion.div
      variants={fadeIn("", "spring", index * 0.5, 0.75)}
      className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full relative overflow-hidden"
    >
      {/* Question Number Badge */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#915EFF]/20 flex items-center justify-center">
        <span className="text-white font-bold">{index + 1}</span>
      </div>

      <p className="text-white font-black text-[24px] mb-6">{question}</p>

      <div className="mt-4 space-y-3">
        {options.map((option, i) => {
          let buttonStyle = "bg-[#2c2c2c] hover:bg-[#3d3d3d]"; // default
          if (isAnswered) {
            if (option === correctAnswer) {
              buttonStyle = "bg-green-500/20 border-2 border-green-500";
            } else if (option === selectedAnswer) {
              buttonStyle = option === correctAnswer 
                ? "bg-green-500/20 border-2 border-green-500"
                : "bg-red-500/20 border-2 border-red-500";
            }
          }

          return (
            <motion.button
              key={i}
              onClick={() => handleAnswerClick(option)}
              className={`w-full py-3 px-6 text-white text-[18px] font-medium rounded-xl 
                transition-all duration-300 transform hover:scale-102 
                ${buttonStyle} ${isAnswered ? 'cursor-default' : 'cursor-pointer hover:shadow-lg'}`}
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
            >
              {option}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback Message */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 text-center py-2 rounded-lg ${
            isCorrect ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {isCorrect ? "You know me well! 🎉" : "Oops! That's not right 😅"}
        </motion.div>
      )}
    </motion.div>
  );
};

const Feedbacks = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleScoreUpdate = (score) => {
    setTotalScore(prev => prev + score);
    setQuestionsAnswered(prev => prev + 1);
    if (questionsAnswered + 1 === questions.length) {
      setShowResult(true);
    }
  };

  const getRelationshipStatus = () => {
    return relationshipStatus.reduce((prev, current) => {
      return totalScore >= current.minScore ? current : prev;
    }, relationshipStatus[0]);
  };

  return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Test your knowledge</p>
          <h2 className={styles.sectionHeadText}>How well do you know me?</h2>
        </motion.div>
      </div>

      <div className={`-mt-20 pb-14 ${styles.paddingX}`}>
        {/* Score Display */}
        <motion.div
          variants={fadeIn("down", "spring", 0.2, 0.75)}
          className="text-center mb-10"
        >
          <div className="bg-tertiary rounded-full px-6 py-3 inline-block">
            <span className="text-white text-[18px]">
              Score: {totalScore}/{questions.length}
            </span>
          </div>
        </motion.div>

        {/* Quiz Cards */}
        <div className="flex flex-wrap gap-7 justify-center">
          {questions.map((question, index) => (
            <QuizCard 
              key={index} 
              index={index} 
              {...question} 
              onScoreUpdate={handleScoreUpdate}
            />
          ))}
        </div>

        {/* Final Result */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 text-center"
          >
            <div className="bg-tertiary rounded-2xl p-8 inline-block max-w-md">
              <h3 className="text-white text-[24px] font-bold mb-4">
                Quiz Complete! 🎯
              </h3>
              <p className="text-secondary text-[18px] mb-4">
                You scored {totalScore} out of {questions.length}
              </p>
              <p className={`text-[22px] font-bold ${getRelationshipStatus().color}`}>
                {getRelationshipStatus().status}
              </p>
              {totalScore === questions.length && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-4 text-[#915EFF]"
                >
                  🏆 Perfect Score! You're a true friend! 🏆
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
