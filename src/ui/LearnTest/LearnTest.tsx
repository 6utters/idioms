'use client';

import { JSX, useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import CrossSvg from "../../icons/cross.svg";
import CheckSvg from "../../icons/check.svg";
import BaloonsSvg from "../../icons/baloons.svg";
import Link from "next/link";

export interface Question {
  id: number;
  question: string;
  answer?: string;
  expected_answer?: string;
  type?: "boolean";
  choices?: string[];
}

interface QuizData {
  [category: string]: {
    [subCategory: string]: Question[];
  };
}

interface TestProps {
  questionsData: QuizData;
}

function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

export default function LearnTest({ questionsData }: TestProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [inputAnswer, setInputAnswer] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<{
    isCorrect: boolean;
    userAnswer: string;
    correctAnswer: string;
  } | null>(null);

  useEffect(() => {
    const combined: Question[] = [];
    for (const category in questionsData) {
      for (const subCategory in questionsData[category]) {
        combined.push(...questionsData[category][subCategory]);
      }
    }
    setQuestions(shuffleArray(combined));
  }, [questionsData]);

  useEffect(() => {
    setInputAnswer("");
  }, [current]);

  const handleAnswer = (answer: string) => {
    const q = questions[current];
    const correctAnswer = (q.answer || q.expected_answer || "").toLowerCase().trim();
    const userAnswer = answer.toLowerCase().trim();
    const isCorrect = userAnswer === correctAnswer;

    setCurrentAnswer({
      isCorrect,
      userAnswer: answer.trim(),
      correctAnswer: q.answer || q.expected_answer || ""
    });

    if (isCorrect) setScore(prev => prev + 1);
  };

  const handleNextQuestion = () => {
    setCurrentAnswer(null);
    if (current < questions.length - 1) {
      setCurrent(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const getQuestionType = (q: Question): string => {
    if (q.type) return "True or False";
    if (q.choices) return "Multiple Choice";
    return "Complete with one word";
  };

  const renderQuestion = (): JSX.Element => {
    const q = questions[current];
    return (
      <div>
        <div className={styles.questionInfo}>{getQuestionType(q)}</div>
        <div
          className={styles.question}
          dangerouslySetInnerHTML={{ __html: q.question }}
        />

        {q.type === "boolean" && (
          <div className={styles.booleanButtons}>
            <button
              className={`${styles.true} ${currentAnswer ? styles.disabled : ""}`}
              onClick={() => handleAnswer("true")}
              disabled={!!currentAnswer}
            >
              <Image src={CheckSvg} alt="check" width={54} height={54} />
            </button>
            <button
              className={`${styles.false} ${currentAnswer ? styles.disabled : ""}`}
              onClick={() => handleAnswer("false")}
              disabled={!!currentAnswer}
            >
              <Image src={CrossSvg} alt="cross" width={54} height={54} />
            </button>
          </div>
        )}

        {q.choices && (
          <div className={styles.chooseButtons}>
            {q.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(choice)}
                disabled={!!currentAnswer}
                className={currentAnswer?.userAnswer === choice ?
                  (currentAnswer?.isCorrect ? styles.correctChoice : styles.incorrectChoice) : ""}
              >
                {choice}
                {currentAnswer?.userAnswer === choice && (
                  <span className={styles.feedbackIcon}>
                    {currentAnswer?.isCorrect ? "✓" : "✗"}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {!q.type && !q.choices && (
          <div className={styles.inputChoose}>
            <input
              type="text"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              disabled={!!currentAnswer}
            />
            <button
              className={styles.submitButton}
              onClick={() => handleAnswer(inputAnswer)}
              disabled={!!currentAnswer}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderFeedback = () => (
    <div className={styles.feedbackContainer}>
      <div className={`${styles.feedbackStatus} ${
        currentAnswer?.isCorrect ? styles.correct : styles.incorrect
      }`}>
        {currentAnswer?.isCorrect ? "Correct!" : "Incorrect!"}
      </div>

      {!currentAnswer?.isCorrect && (
        <div className={styles.correctAnswer}>
          Correct answer: {currentAnswer?.correctAnswer}
        </div>
      )}

      <button
        className={styles.nextButton}
        onClick={handleNextQuestion}
      >
        {current < questions.length - 1 ? "Next Question" : "Finish"}
      </button>
    </div>
  );

  if (quizFinished) {
    return (
      <div className={`${styles.container} ${styles.quizFinished}`}>
        <h2>Well done!</h2>
        <Image src={BaloonsSvg} alt="balloons" width={240} height={240} />
        <h3>Your score:</h3>
        <div className={styles.score}>
          {score} / {questions.length}
        </div>
        <div className={styles.buttons}>
          <button onClick={() => window.location.reload()}>Try Again</button>
          <Link href="/learning-topics">
            <button>Learn</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>
        Question {current + 1} / {questions.length}
      </h2>
      {questions.length > 0 ? (
        currentAnswer ? (
          renderFeedback()
        ) : (
          renderQuestion()
        )
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}