import styles from "./page.module.css";
import {Idiom} from "@/app/types";
import idioms from "@/data/idioms.json";
import {IdiomCard} from "@/ui/IdiomCard/IdiomCard";
import Link from "next/link";

export default function Travelling() {
  const travellingIdioms: Idiom[] = idioms.idioms.travelling;

  return (
    <div className={styles.container}>
      <h1>Travelling</h1>
      <Link className={styles.link} href={"travelling/test"}>Test Yourself</Link>
      <div className={styles.list}>
        {travellingIdioms.map((idiom: Idiom) => (
          <IdiomCard idiom={idiom} key={idiom.id} />
        ))}
      </div>
    </div>
  );
}

