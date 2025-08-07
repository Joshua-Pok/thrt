import Link from 'next/link';
import styles from './index.module.scss';

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        Hello World! Welcome to Vehicle List.
        <Link href="/vehicle/8610">PSA8610</Link>
      </div>
    </main>
  );
}
