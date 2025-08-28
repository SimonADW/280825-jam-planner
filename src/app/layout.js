import './globals.css';
import { AuthProvider } from '@/features/auth/AuthContext';

export const metadata = {
  title: 'Jam Planner',
  description: 'Plan your band practice sessions and gigs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="nb">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
