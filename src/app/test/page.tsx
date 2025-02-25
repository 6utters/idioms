'use client';

import { useEffect, useState } from "react";
import questionsData from "../../data/questions.json";
import styles from "./page.module.css";
import Image from "next/image";
import NextSvg from "./next.svg";
import CrossSvg from "./cross.svg";
import CheckSvg from "./check.svg";
import BaloonsSvg from "./baloons.svg";
import Link from "next/link";

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default function Test() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [inputAnswer, setInputAnswer] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    let combined = [];
    if (questionsData["test yourself"]) {
      for (const key in questionsData["test yourself"]) {
        combined = combined.concat(questionsData["test yourself"][key]);
      }
    }
    combined = combined.concat(questionsData["Complete with one word"]);
    combined = combined.concat(
      questionsData["Paraphrase using the word in brackets"]
    );
    setQuestions(shuffleArray(combined));
  }, []);

  // Reset input answer when the current question changes
  useEffect(() => {
    setInputAnswer("");
  }, [current]);

  // Called when a user submits an answer
  const handleAnswer = (answer) => {
    const q = questions[current];
    const correctAnswer = (q.answer || q.expected_answer).toLowerCase().trim();
    if (answer.toLowerCase().trim() === correctAnswer) {
      setScore((prev) => prev + 1);
    }
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const getQuestionType = (q) => {
    if (q.type) {
      return "True or False";
    } else if (q.choices) {
      return "Multiple Choice";
    } else {
      return "Complete with one word";
    }
  };

  const renderQuestion = () => {
    const q = questions[current];
    return (
      <div>
        <div className={styles.questionInfo}>
          {getQuestionType(q)}
        </div>
        <div
          className={styles.question}
          dangerouslySetInnerHTML={{ __html: q.question }}
        />
        {q.type === "boolean" && (
          <div className={styles.booleanButtons}>
            <button className={styles.true} onClick={() => handleAnswer("true")}><Image src={CheckSvg} alt={'check'} width={54} height={54} /></button>
            <button className={styles.false} onClick={() => handleAnswer("false")}><Image src={CrossSvg} alt={'cross'} width={54} height={54} /></button>
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
        {!q.type && !q.choices && (
          <div className={styles.inputChoose}>
            <input
              type="text"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
            />
            <button className={current < questions.length - 1 ? styles.nextButton : styles.submitButton} onClick={() => handleAnswer(inputAnswer)}>
              {current < questions.length - 1 ? <Image src={NextSvg} alt={'Next'} width={40} height={40} /> : 'Submit'}
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
        <Image src={BaloonsSvg} alt={'balloons'} width={240} height={240} />
        <h3>Your score:</h3>
        <div className={styles.score}>{score}</div>
        <div className={styles.buttons}>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
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
