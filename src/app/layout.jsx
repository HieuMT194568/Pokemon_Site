import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AppLayout from './components/AppLayout';
import Providers from './providers';
import '../styles/index.css';

export const metadata = {
  title: 'Pokédex App',
  description: 'A comprehensive Pokédex application built with Next.js and Ant Design',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AntdRegistry>
            <AppLayout>{children}</AppLayout>
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
