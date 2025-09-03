'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LoginButton from '@/features/auth/LoginButton';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const isJamPlannerPage = pathname === '/jam-planner';

  return (
    <header className={styles.header}>
      <Link href="/">
		<h1>Jam Planner</h1>
	  </Link>
      <div className={styles.button_and_link_container}>
        {!isJamPlannerPage && <Link href="/jam-planner">To planner</Link>}
        <LoginButton />
      </div>
    </header>
  );
}