import type { AppProps } from 'next/app';
import '@/index.css';
import '@/App.css';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
