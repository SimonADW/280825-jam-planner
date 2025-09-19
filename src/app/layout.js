import './globals.css';
import styles from './layout.module.css'
import { AuthProvider } from '@/features/auth/AuthContext';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';


export const metadata = {
  title: 'Jam Planner',
  description: 'Plan your band practice sessions and gigs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="nb">
      <body className={styles.body}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
