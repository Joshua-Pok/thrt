'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { SessionProvider } from "next-auth/react";
import './globals.scss';
import '@venti/theme/dist/styles/theme.css';
import { ConfigProvider, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import AuthGuard from './components/AuthGuard';
import { MainLayout } from '@venti/layout';
import { inter } from '@venti/theme/dist/next-fonts';
import getEnv from './utils/env';

import { PoolProvider } from './components/Provider/PoolProvider';
import { ConsoleProvider } from './components/Provider/ConsoleProvider';
import { VehicleProvider } from './components/Provider/VehicleProvider';
import { CLIENT_SIDE_NEXT_PUBLIC_HOSTNAME, CLIENT_SIDE_NEXT_PUBLIC_PREFIX } from './utils/constants';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
      className={inter.variable}
      data-prefix={getEnv('NEXT_PUBLIC_PREFIX')}
      data-public-host={getEnv('NEXT_PUBLIC_API_URL')}
    >
        <body suppressHydrationWarning={true} data-theme="dark-theme">
          <AntdRegistry>
            <SessionProvider basePath='/login/api/auth'>
              <AuthGuard>
                <MainLayout
                  apiUrl={CLIENT_SIDE_NEXT_PUBLIC_HOSTNAME}
                  prefix={CLIENT_SIDE_NEXT_PUBLIC_PREFIX}
                  showTheme={false}
                >
                  <PoolProvider>
                    <ConsoleProvider>
                      <VehicleProvider>
                        {children}
                      </VehicleProvider>
                    </ConsoleProvider>
                  </PoolProvider>
                </MainLayout>
                </AuthGuard>
            </SessionProvider>
          </AntdRegistry>
        </body>
    </html>
  );
}
