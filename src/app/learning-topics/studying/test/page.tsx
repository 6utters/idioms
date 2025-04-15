/* eslint-disable @typescript-eslint/no-explicit-any */

import styles from "./page.module.css";
import LearnTest from "@/ui/LearnTest/LearnTest";
import studyingIdioms from "./studying-learn.json";

const getRandomQuestions = (data: any) => {
  // Flatten questions with category information
  const allQuestions: any[] = [];
  for (const category in data.Studying) {
    data.Studying[category].forEach((question: any) => {
      allQuestions.push({ ...question, category });
    });
  }

  // Shuffle and select 10
  const shuffled = allQuestions
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  // Regroup by category
  const grouped: any = {};
  shuffled.forEach(question => {
    if (!grouped[question.category]) {
      grouped[question.category] = [];
    }
    grouped[question.category].push(question);
  });

  return { Studying: grouped };
};

export default function StudyingTest() {
  const randomQuestions = getRandomQuestions(studyingIdioms);

  console.log('randomQuestions:', randomQuestions)

  return (
    <div className={styles.container}>
      <h1>Studying Test</h1>
      <LearnTest questionsData={randomQuestions} />
    </div>
  );
}

