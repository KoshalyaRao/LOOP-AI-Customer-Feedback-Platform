import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/layout/Providers';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: 'LOOP — AI Customer Feedback Intelligence Platform',
  description: 'Close the loop on customer feedback with AI sentiment analysis, trend spike detection, grounded Q&A, and Voice of Customer reports.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <ToastProvider>{children}</ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
