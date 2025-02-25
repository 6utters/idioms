import styles from "./page.module.css";
import {Idiom} from "@/app/types";
import idioms from "@/data/idioms.json";
import {IdiomCard} from "@/ui/IdiomCard/IdiomCard";

export default function Travelling() {
  const bodyIdioms: Idiom[] = idioms.idioms.travelling;

  return (
    <div className={styles.container}>
      <h1>Travelling</h1>
      <div className={styles.list}>
        {bodyIdioms.map((idiom: Idiom) => (
          <IdiomCard idiom={idiom} key={idiom.id} />
        ))}
      </div>
    </div>
  );
}

