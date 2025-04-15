'use client';

import {JSX, useEffect, useState} from "react";
import questionsData from "../../data/questions.json";
import styles from "./page.module.css";
import Image from "next/image";
import NextSvg from "../../icons/next.svg";
import CrossSvg from "../../icons/cross.svg";
import CheckSvg from "../../icons/check.svg";
import BaloonsSvg from "../../icons/baloons.svg";
import Link from "next/link";

// Define the Question interface
export interface Question {
  question: string;
  answer?: string;
  expected_answer?: string;
  type?: "boolean"; // if present, indicates a True/False question
  choices?: string[]; // for multiple choice questions
}

// Define the structure of our JSON data
interface QuestionsData {
  "test yourself": {
    [key: string]: Question[];
  };
  "Complete with one word": Question[];
  "Paraphrase using the word in brackets": Question[];
}

// Generic array shuffling function
function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

export default function Test() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [inputAnswer, setInputAnswer] = useState<string>("");
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  useEffect(() => {
    let combined: Question[] = [];
    const data = questionsData as QuestionsData;

    if (data["test yourself"]) {
      for (const key in data["test yourself"]) {
        combined = combined.concat(data["test yourself"][key]);
      }
    }
    combined = combined.concat(data["Complete with one word"]);
    combined = combined.concat(data["Paraphrase using the word in brackets"]);
    setQuestions(shuffleArray(combined));
  }, []);

  // Reset the input answer when the current question changes
  useEffect(() => {
    setInputAnswer("");
  }, [current]);

  // Called when a user submits an answer
  const handleAnswer = (answer: string) => {
    const q = questions[current];
    const correctAnswer = (q.answer || q.expected_answer || "").toLowerCase().trim();
    if (answer.toLowerCase().trim() === correctAnswer) {
      setScore((prev) => prev + 1);
    }
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // Determines the question type to display in the UI
  const getQuestionType = (q: Question): string => {
    if (q.type) {
      return "True or False";
    } else if (q.choices) {
      return "Multiple Choice";
    } else {
      return "Complete with one word";
    }
  };

  // Renders the current question based on its type
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
            <button className={styles.true} onClick={() => handleAnswer("true")}>
              <Image src={CheckSvg} alt="check" width={54} height={54} />
            </button>
            <button className={styles.false} onClick={() => handleAnswer("false")}>
              <Image src={CrossSvg} alt="cross" width={54} height={54} />
            </button>
          </div>
        )}
        {q.choices && (
          <div className={styles.chooseButtons}>
            {q.choices.map((choice, index) => (
              <button key={index} onClick={() => handleAnswer(choice)}>
                {choice}
              </button>
            ))}
          </div>
        )}
        {/* Free text input if neither boolean nor multiple choice */}
        {!q.type && !q.choices && (
          <div className={styles.inputChoose}>
            <input
              type="text"
              value={inputAnswer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputAnswer(e.target.value)
              }
            />
            <button
              className={
                current < questions.length - 1
                  ? styles.nextButton
                  : styles.submitButton
              }
              onClick={() => handleAnswer(inputAnswer)}
            >
              {current < questions.length - 1 ? (
                <Image src={NextSvg} alt="Next" width={40} height={40} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        )}
      </div>
    );
  };

  if (quizFinished) {
    return (
      <div className={`${styles.container} ${styles.quizFinished}`}>
        <h2>Well done!</h2>
        <Image src={BaloonsSvg} alt="balloons" width={240} height={240} />
        <h3>Your score:</h3>
        <div className={styles.score}>{score}</div>
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
      {questions.length > 0 ? renderQuestion() : <p>Loading questions...</p>}
    </div>
  );
}
