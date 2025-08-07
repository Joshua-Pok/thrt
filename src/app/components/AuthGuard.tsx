'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { isLocalDevelopment } from '../utils/env';


const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const [mounted, setMounted] = useState(false);

  const handler = async () => {
    const response = await fetch('/vcs_frontend/api/local-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
    });
    const data = await response.json();
    console.log('Auth response:', data);
    if (!response.ok) {
      console.error('Failed to authenticate:', data);
      return;
    }

    if (!data.access_token) {
      console.error('No access token received');
      return;
    }
    console.log('Storing devAuthToken in sessionStorage');
    // Store the token in sessionStorage
    sessionStorage.setItem('devAuthToken', data.access_token);
  };

  useEffect(() => {
    // Prevent hydration mismatch
    setMounted(true);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);

    if (isLocalDevelopment) {
      handler();
      return;
    }

    if (status === 'unauthenticated' && typeof window !== 'undefined') {
      redirect(
        `${url.origin}/login?redirect=${encodeURIComponent(window.location.href)}`,
      );
    }
  }, [status]);

  if (isLocalDevelopment) {
    return <>{children}</>;
  }

  if (!mounted || status === 'loading') return <Skeleton active />; // or a spinner

  if (status === 'authenticated') {
    return <>{children}</>;
  }

  return null;
};

export default AuthGuard;
// This component checks if the user is authenticated before rendering children.
// If not authenticated, it redirects to the login page.
// It also handles hydration issues by using a mounted state.
