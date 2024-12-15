// src/app/SecondCardList/[id]/page.js

"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SecondCardList from '../SecondCardList.jsx'; // Путь к компоненту SecondCardList
import { getFirstCard } from '../../../data/cardFetcher.js';  // Импорт функции для получения данных

export default function SecondListPage({ params }) {
  // Unwrap the params using React.use()
  const { id } = React.use(params);
  const [listData, setListData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchListData = async () => {
        try {
          const data = await getFirstCard(id);  // Получаем данные для второго списка
          setListData(data);  // Сохраняем данные в состояние
        } catch (error) {
          console.error("Ошибка загрузки данных:", error);
        }
      };

      fetchListData();  
    }
  }, [id]);  
  
  if (!listData) {
    return <div>Загрузка...</div>;
  }
  console.log(listData);
  return (
    <div>
      <SecondCardList
        id={listData.id}
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
