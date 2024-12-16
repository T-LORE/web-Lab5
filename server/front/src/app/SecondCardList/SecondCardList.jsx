import Button from "../components/Button/Button";
import ButtonLogout from "../components/ButtonLogout/ButtonLogout";
import SecondCard from "../SecondCardList/SecondCard/SecondCard";
import SecondCardListForm from "../SecondCardList/SecondCardListForm/SecondCardListForm";
import SecondCardListFilters from "./SecondCardListFilters/SecondCardListFilters";
import { useState, useEffect } from "react";
import { createSecondCard, updateSecondCard, deleteSecondCard } from "../../api/cardApi";
import { useRouter } from 'next/navigation';
import "./SecondCardList.css";

function applyFilters(cards, status, search) {
  let filteredCards = [...cards];

  // Фильтрация по статусу
  if (status === "done") {
    filteredCards = filteredCards.filter((card) => card.completed);
  } else if (status === "notDone") {
    filteredCards = filteredCards.filter((card) => !card.completed);
  }

  // Фильтрация по строке поиска
  if (search.trim() !== "") {
    filteredCards = filteredCards.filter(
      (card) =>
        card.name.toLowerCase().includes(search.toLowerCase()) ||
        card.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  return filteredCards;
}

export default function SecondCardList({lessonId, name, description, secondCards, close, onAddSecondCard, onRemoveSecondCard }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [cardList, setCardList] = useState(secondCards);
  const [filteredCardList, setFilteredCardList] = useState(secondCards); // Состояние для фильтрованных карточек
  const [editCardData, setEditCardData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [lesson, setLessonId] = useState(lessonId);


  // Состояние для фильтров
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();


  function editSecondCard(id, name, description, status) {
    console.log(`EditSecondCard: ${id}, ${name}, ${description}, ${status}`);
    // onAddSecondCard(id, newSecondCards);
    updateSecondCard(id, name, description, status, lesson);
    window.location.reload()
  }
  
  function openCardEditor(id) {
    setIsEdit(true);
    setEditCardData(cardList.find((card) => card.id === id));
    setIsFormOpen(true);
  }

  function addSecondCard(id, name = "Новый список", description = "Описание", status = false) {

    console.log(`ADdSecondCard: ${lesson}, ${name}, ${description}, ${status}`);
    createSecondCard(lesson, name, description, status);
    window.location.reload()
    // onAddSecondCard(id, newSecondCards);
  }

  function removeSecondCard(removedId) {
    // const newSecondCards = cardList.filter((card) => card.id !== removedId);
    // setCardList(newSecondCards);
    // onRemoveSecondCard(id, newSecondCards);
    deleteSecondCard(removedId);
    window.location.reload()
  }

  function doneCard(id) {
    const newSecondCards = cardList.map((card) => {
      if (card.id === id) {
        card.completed = true;
      }
      return card;
    });
    setCardList(newSecondCards);
    // onAddSecondCard(id, newSecondCards);
    // window.location.reload()
  }

  function undoneCard(id) {
    const newSecondCards = cardList.map((card) => {
      if (card.id === id) {
        card.completed = false;
      }
      return card;
    });
    setCardList(newSecondCards);
    // onAddSecondCard(id, newSecondCards);
    // window.location.reload()
  }

  useEffect(() => {
    setFilteredCardList(applyFilters(cardList, filterStatus, searchTerm));
  }, [filterStatus, searchTerm, cardList]);

  return (
    <div className="main">
      <ButtonLogout onClick={() => router.push('/')} />
      <div className="FirstCardList">
        {isFormOpen ? (
          <SecondCardListForm
            cardData={editCardData}
            onAddClick={isEdit ? editSecondCard : addSecondCard}
            backToCardList={() => setIsFormOpen(false)}
          />
        ) : (
          <>
            <SecondCardListFilters
              cards={cardList}
              onFilterChange={(status, term) => {
                setFilterStatus(status);
                setSearchTerm(term);
              }}
            />
            <h1>Список {name}</h1>
            <div className="SecondCardList__cards">
              {filteredCardList.map((card) => (
                <SecondCard
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  description={card.description}
                  status={card.completed}
                  lessonID={lesson}
                  onRemoveClick={removeSecondCard}
                  onDoneClick={doneCard}
                  onUndoneClick={undoneCard}
                  onEditClick={openCardEditor}
                />
              ))}
            </div>
            <div className="SecondCardList__buttons">
              <Button onClick={() => {setIsFormOpen(true); setIsEdit(false); setEditCardData(null); }}>Добавить карточку</Button>
              <Button onClick={close}>Назад</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
