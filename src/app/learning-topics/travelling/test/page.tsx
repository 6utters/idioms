import styles from "./page.module.css";
import LearnTest from "@/ui/LearnTest/LearnTest";
import travellingIdioms from "./travelling-learn.json";

const getRandomQuestions = (data: any) => {
  // Flatten questions with category information
  const allQuestions: any[] = [];
  for (const category in data.Travelling) {
    data.Travelling[category].forEach((question: any) => {
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

  return { Travelling: grouped };
};

export default function TravellingTest() {
  const randomQuestions = getRandomQuestions(travellingIdioms);

  return (
    <div className={styles.container}>
      <h1>Travelling Test</h1>
      <LearnTest questionsData={randomQuestions} />
    </div>
  );
}

