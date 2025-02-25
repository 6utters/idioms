import styles from "./page.module.css";
import idioms from '@/data/idioms.json';
import {Idiom} from "@/app/types";
import {IdiomCard} from "@/ui/IdiomCard/IdiomCard";

export default function Body() {
  const bodyIdioms: Idiom[] = idioms.idioms.body;

  return (
    <div className={styles.container}>
      <h1>Body</h1>
      <div className={styles.list}>
        {bodyIdioms.map((idiom: Idiom) => (
          <IdiomCard idiom={idiom} key={idiom.id} />
        ))}
      </div>
    </div>
  );
}

