import styles from "./page.module.css";
import {Idiom} from "@/app/types";
import idioms from "@/data/idioms.json";
import {IdiomCard} from "@/ui/IdiomCard/IdiomCard";
import Link from "next/link";

export default function Character() {
  const characterIdioms: Idiom[] = idioms.idioms.character;

  return (
    <div className={styles.container}>
      <h1>Character</h1>
      <Link className={styles.link} href={"character/test"}>Test Yourself</Link>
      <div className={styles.list}>
        {characterIdioms.map((idiom: Idiom) => (
          <IdiomCard idiom={idiom} key={idiom.id} />
        ))}
      </div>
    </div>
  );
}

