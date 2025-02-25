import styles from "./page.module.css";
import {Idiom} from "@/app/types";
import idioms from "@/data/idioms.json";
import {IdiomCard} from "@/ui/IdiomCard/IdiomCard";

export default function Character() {
  const bodyIdioms: Idiom[] = idioms.idioms.character;

  return (
    <div className={styles.container}>
      <h1>Character</h1>
      <div className={styles.list}>
        {bodyIdioms.map((idiom: Idiom) => (
          <IdiomCard idiom={idiom} key={idiom.id} />
        ))}
      </div>
    </div>
  );
}

