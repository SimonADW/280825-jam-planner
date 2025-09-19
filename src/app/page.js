import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to Simons Next.js <span>headache!</span></h1> 
      <div className={styles.hero}>
        <Image className={styles.heroImage} src={"/image.webp"} width={500} height={500} alt='El-guitar in sunset icon' />

      </div>
    </main>
  );
}

