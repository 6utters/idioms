import styles from "./page.module.css";
import {Idiom} from "@/app/types";
import idioms from "@/data/idioms.json";
import {IdiomCard} from "@/ui/IdiomCard/IdiomCard";
import Link from "next/link";

export default function Studying() {
  const studyingIdioms: Idiom[] = idioms.idioms.studying;

  return (
    <div className={styles.container}>
      <h1>Studying</h1>
      <Link className={styles.link} href={"studying/test"}>Test Yourself</Link>
      <div className={styles.list}>
        {studyingIdioms.map((idiom: Idiom) => (
          <IdiomCard idiom={idiom} key={idiom.id} />
        ))}
      </div>
    </div>
  );
}

