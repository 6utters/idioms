import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import GraduateSrc from "./graduate.svg";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Easy Idioms</h1>
          <Image
            width={50}
            height={50}
            className={styles.graduate}
            src={GraduateSrc}
            alt="graduate"
          />
        </div>
        <h2 className={styles.subTitle}>Boost your language skills</h2>
        <Link href={"/test"}>Test Yourself</Link>
        <Link href={"/learning-topics"}>Learning</Link>
      </div>
    </div>
  );
}

