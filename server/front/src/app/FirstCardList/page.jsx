'use client';

import Button from "../components/Button/Button";
import FirstCard from "../components/FirstCard/FirstCard";
import FirstCardForm from "./FirstCardForm/FirstCardForm";
import { useState, useEffect } from "react";
import "./FirstCardList.css";
import { useRouter } from 'next/navigation'; 
import { createFirstCard, deleteFirstCard, updateFirstCard, getFistCards } from "../../api/cardApi";
import ButtonLogout from "../components/ButtonLogout/ButtonLogout";

export default function FirstCardList({onCardAdd, onRemoveCard }) {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [list, setList] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardToEdit, setCardToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка карточек с сервера
  useEffect(() => {
    async function fetchCards() {
      try {
        const data = await getFistCards();
        setCards(data);
        setFilteredCards(applyNameFilter(data, searchTerm));
        setLoading(false);
      } catch (error) {
        if (error.status === 401) {
          setError("Ошибка авторизации");
          setLoading(false);
          router.push('/');  // Перенаправление на главную страницу
        } else {
          setError("Ошибка");
          setLoading(false);
        }
      }
    }

    fetchCards();
  }, [searchTerm]);

  const router = useRouter();
  // Открытие внутреннего списка
  function openSecondCardList(id) {
    // Перенаправление на страницу с переданным id
    router.push(`/SecondCardList/${id}`);
  }

  // Фильтрация карточек по имени
  function applyNameFilter(cardList, term) {
    if (!term.trim()) return cardList;
    return cardList.filter((card) =>
      card.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  // Обновление фильтра при изменении поискового запроса
  function handleSearchChange(e) {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredCards(applyNameFilter(cards, term));
  }

  // Добавление новой карточки
  function addFirstCard(id, name = "Новый список", description = "Описание") {
    // const newCard = {
    //   id: Math.max(...cards.map((card) => card.id)) + 1,
    //   name: name,
    //   description: description,
    //   secondCards: [],
    // };

    // const newCardList = [...cards, newCard];
    // setCards(newCardList);
    // setFilteredCards(applyNameFilter(newCardList, searchTerm));

    // onCardAdd(newCardList);
    const returnData = createFirstCard(name, description);
    if (returnData) { 
      router.push('/FirstCardList');
    } else {
      alert('Ошибка при добавлении карточки');
    }
    
  }

  // Удаление карточки
  function removeFirstCard(id) {
    // const newCardList = cards.filter((card) => card.id !== id);
    // setCards(newCardList);
    // setFilteredCards(applyNameFilter(newCardList, searchTerm));
    // onRemoveCard(newCardList);
    const returnData = deleteFirstCard(id);
    if (returnData) {
      router.push('/FirstCardList');
    } else {
      alert('Ошибка при удалении карточки');
    }
  }

  // Открытие формы для создания новой карточки
  function openNewCardForm() {
    setCardToEdit(null);
    setList(false);
  }

  // Закрытие формы и возвращение к списку
  function closeNewCardForm() {
    setList(true);
  }

  // Редактирование карточки
  function editCard(id, name, description) {
    // const newCardList = cards.map((card) => {
    //   if (card.id === id) {
    //     card.name = name;
    //     card.description = description;
    //   }
    //   return card;
    // });
    // setCards(newCardList);
    const returnData = updateFirstCard(id, name, description);
    if (returnData) {
      setList(false);
      router.push('/FirstCardList');
    } else {
      alert('Ошибка при обновлении карточки');
    }
  }

  // Открытие формы редактирования
  function openEditForm(id) {

    setCardToEdit(cards.find((card) => card.id === id));
    setList(false);
  }

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (list) {
    return (
      <div className="main">
        <ButtonLogout/>
        <div className="FirstCardList">
          <h1>Список предметов</h1>
          <input
            type="text"
            placeholder="Поиск по названию"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <div className="cardHolder">
            {filteredCards.map((card) => (
              <FirstCard
                key={card.id}
                id={card.id}
                header={card.name}
                description={card.description}
                onOpenClick={openSecondCardList}
                onRemoveClick={removeFirstCard}
                onEditClick={openEditForm}
              />
            ))}
          </div>
          <Button onClick={openNewCardForm}>Добавить список</Button>
        </div>
      </div>
    );
  } else {
    return (
      <FirstCardForm
        cardData={cardToEdit}
        onAddClick={addFirstCard}
        backToCardList={closeNewCardForm}
        onEditClick={editCard}
      />
    );
  }
}
