"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '../data/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const authenticateUser = async () => {
      const isAuthorized = await checkAuth();

      if (isAuthorized) {
        router.push('/FirstCardList'); // Перенаправляем на /lessons, если пользователь авторизован
      } else {
        router.push('/login'); // Перенаправляем на /login, если пользователь не авторизован
      }
    };

    authenticateUser();
  }, [router]);

  return null; // Компонент ничего не рендерит, так как только перенаправляет
}
