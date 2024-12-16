"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '../api/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const authenticateUser = async () => {
      const isAuthorized = await checkAuth();

      if (isAuthorized) {
        router.push('/FirstCardList'); 
      } else {
        router.push('/login'); 
      }
    };

    authenticateUser();
  }, [router]);

  return null; // Компонент ничего не рендерит, так как только перенаправляет
}
