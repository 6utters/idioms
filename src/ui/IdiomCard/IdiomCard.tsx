"use client";

import { useState } from 'react';
import styles from './IdiomCard.module.css';
import { Idiom } from '@/app/types';
import Image from "next/image";

interface IdiomCardProps {
  idiom: Idiom;
}

export const IdiomCard = ({ idiom }: IdiomCardProps) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(prev => !prev);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={`${styles.inner} ${flipped ? styles.flipped : ''}`}>
        <div className={styles.front}>
          <div className={styles.top}>
            <Image width={170} height={200} src={`/${idiom.img}`} alt={idiom.label} className={styles.image} />
            <div className={styles.label}>{idiom.label}</div>
          </div>
          <div className={styles.bottom}>
            <p className={styles.text}>{idiom.example}</p>
          </div>
        </div>
        <div className={styles.back}>
          <div className={styles.top}>
            <Image width={170} height={200}  src={`/${idiom.img}`} alt={idiom.label} className={styles.image} />
            <div className={styles.label}>{idiom.translation}</div>
          </div>
          <div className={styles.bottom}>
            <p className={styles.text}>{idiom.definition}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
