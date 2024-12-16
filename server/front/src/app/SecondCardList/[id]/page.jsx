// src/app/SecondCardList/[id]/page.js

"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SecondCardList from '../SecondCardList.jsx'; // Путь к компоненту SecondCardList
import { getFirstCard } from '../../../api/cardApi.js'; // Путь к функции getFirstCard

export default function SecondListPage({ params }) {
  // Unwrap the params using React.use()
  const { id } = React.use(params);
  const [listData, setListData] = useState(null);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Загрузка карточек с сервера
  useEffect(() => {
    async function fetchCards() {
      try {
        const data = await getFirstCard(id);
        console.log(data)
        setListData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        if (error.status === 401) {
          setErrorMessage("Ошибка авторизации");
          setIsLoading(false);
          router.push('/');  // Перенаправление на главную страницу
        } else {
          setErrorMessage("Ошибка");
          setIsLoading(false);
        }
      }
    }

    fetchCards();
  }, [id]);
  
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
// length

  if (!isLoading && listData && listData.secondCards.length > 0) {
    
    listData.secondCards.sort((a, b) => a.name.localeCompare(b.name));
  }
  

  return (
    <div>
      <SecondCardList
        lessonId={id}
        name={listData.name}
        description={listData.description}
        secondCards={listData.secondCards}
        close={() => router.push('/')}  // Закрытие и переход на главную
        onAddSecondCard={() => {}}
        onRemoveSecondCard={() => {}}
      />
    </div>
  );
}
