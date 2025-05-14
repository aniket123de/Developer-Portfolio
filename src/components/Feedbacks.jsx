import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from 'react-confetti';
import { FiX } from 'react-icons/fi';

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

const ResultModal = ({ isOpen, onClose, totalScore, maxScore, relationshipStatus }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-[#1d1836] to-[#2d2b3d] rounded-2xl p-8 max-w-md w-full relative shadow-2xl border border-[#915EFF]/20 overflow-hidden"
        >
          {totalScore >= 3 && (
            <div className="absolute inset-0 pointer-events-none">
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={200}
                gravity={0.2}
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
          >
            <FiX size={24} />
          </button>

          {/* Content */}
          <div className="text-center relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[#915EFF] text-6xl mb-6"
            >
              🎯
            </motion.div>
            
            <h3 className="text-white text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Quiz Complete!
            </h3>
            
            <div className="bg-[#1d1836] rounded-xl p-6 mb-6">
              <p className="text-secondary text-lg mb-2">
                Your Score
              </p>
              <p className="text-white text-4xl font-bold">
                {totalScore}/{maxScore}
              </p>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-2xl font-bold ${relationshipStatus.color} mb-4`}
            >
              {relationshipStatus.status}
            </motion.div>

            {totalScore === maxScore && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 text-[#915EFF] text-xl font-semibold"
              >
                Perfect Score! You're a true friend! 
              </motion.div>
            )}

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Feedbacks = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScoreUpdate = (score) => {
    const newScore = totalScore + score;
    setTotalScore(newScore);
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

  const handleCloseResult = () => {
    setShowResult(false);
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

        {/* Result Modal */}
        <ResultModal
          isOpen={showResult}
          onClose={handleCloseResult}
          totalScore={totalScore}
          maxScore={questions.length}
          relationshipStatus={getRelationshipStatus()}
        />
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
