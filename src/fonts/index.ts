import { Source_Sans_3 } from 'next/font/google';
import localFont from 'next/font/local';

export const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-source-sans',
  display: 'swap',
});

export const jetbrainsMono = localFont({
  src: [
    {path: './jetbrains-mono-v24-latin-100.woff2', weight: '100', style: 'normal'},
    {path: './jetbrains-mono-v24-latin-100italic.woff2', weight: '100', style: 'italic'},
    {path: './jetbrains-mono-v24-latin-200.woff2', weight: '200', style: 'normal'},
    {path: './jetbrains-mono-v24-latin-200italic.woff2', weight: '200', style: 'italic'},
    {path: './jetbrains-mono-v24-latin-300.woff2', weight: '300', style: 'normal'},
    {path: './jetbrains-mono-v24-latin-300italic.woff2', weight: '300', style: 'italic'},
    {path: './jetbrains-mono-v24-latin-regular.woff2', weight: '400', style: 'normal'},
    {path: './jetbrains-mono-v24-latin-italic.woff2', weight: '400', style: 'italic'},
    {path: './jetbrains-mono-v24-latin-500.woff2', weight: '500', style: 'normal'},
    {path: './jetbrains-mono-v24-latin-500italic.woff2', weight: '500', style: 'italic'},
    {path: './jetbrains-mono-v24-latin-600.woff2', weight: '600', style: 'normal'},
    {path: './jetbrains-mono-v24-latin-600italic.woff2', weight: '600', style: 'italic'},
    {path: './jetbrains-mono-v24-latin-700.woff2', weight: '700', style: 'normal'},
    {path: './jetbrains-mono-v24-latin-700italic.woff2', weight: '700', style: 'italic'},
    {path: './jetbrains-mono-v24-latin-800.woff2', weight: '800', style: 'normal'},
    {path: './jetbrains-mono-v24-latin-800italic.woff2', weight: '800', style: 'italic'},
  ],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  fallback: ['JetBrains Mono', 'monospace'],
});
