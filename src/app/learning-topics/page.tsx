import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import BodySrc from "./body.svg";
import CharacterSrc from "./character.svg";
import TravellingSrc from "./travelling.svg";
import StudyingSrc from "./studying.svg";

export default function LearningTopics() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Topics</h1>
        <Link href={"/learning-topics/body"} className={styles.card}>
          <Image className={styles.icon} src={BodySrc} alt="Body" />
          <div className={styles.content}>
            <h3 className={styles.cardTitle}>Body</h3>
            <p className={styles.cardSubTitle}>10 flashcards</p>
          </div>
        </Link>
        <Link href={"/learning-topics/character"} className={styles.card}>
          <Image className={styles.icon} src={CharacterSrc} alt="Personality" />
          <div className={styles.content}>
            <h3 className={styles.cardTitle}>Character</h3>
            <p className={styles.cardSubTitle}>6 flashcards</p>
          </div>
        </Link>
        <Link href={"/learning-topics/travelling"} className={styles.card}>
          <Image className={styles.icon} src={TravellingSrc} alt="Travelling" />
          <div className={styles.content}>
            <h3 className={styles.cardTitle}>Travelling</h3>
            <p className={styles.cardSubTitle}>6 flashcards</p>
          </div>
        </Link>
        <Link href={"/learning-topics/studying"} className={styles.card}>
          <Image className={styles.icon} src={StudyingSrc} alt="Studying" />
          <div className={styles.content}>
            <h3 className={styles.cardTitle}>Studying</h3>
            <p className={styles.cardSubTitle}>6 flashcards</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

