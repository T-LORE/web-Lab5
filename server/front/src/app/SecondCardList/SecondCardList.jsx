import Button from "../components/Button/Button";
import SecondCard from "../SecondCardList/SecondCard/SecondCard";
import SecondCardListForm from "../SecondCardList/SecondCardListForm/SecondCardListForm";
import SecondCardListFilters from "./SecondCardListFilters/SecondCardListFilters";
import { useState, useEffect } from "react";
import "./SecondCardList.css";

function applyFilters(cards, status, search) {
  let filteredCards = [...cards];

  // Фильтрация по статусу
  if (status === "done") {
    filteredCards = filteredCards.filter((card) => card.status);
  } else if (status === "notDone") {
    filteredCards = filteredCards.filter((card) => !card.status);
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

export default function SecondCardList({ id, name, description, secondCards, close, onAddSecondCard, onRemoveSecondCard }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [cardList, setCardList] = useState(secondCards);
  const [filteredCardList, setFilteredCardList] = useState(secondCards); // Состояние для фильтрованных карточек
  const [editCardData, setEditCardData] = useState(null);

  // Состояние для фильтров
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  console.log(`SecondCardList: ${id}, ${name}, ${description}, ${secondCards}`);
  function getUniqueSecondCardId() {
    let id = Math.max(...cardList.map((card) => card.id)) + 1;
    if (id === -Infinity) {
      id = 1;
    }
    return id;
  }

  function editSecondCard(id, name, description, status) {
    const newSecondCards = cardList.map((card) => {
      if (card.id === id) {
        card.name = name;
        card.description = description;
        card.status = status;
      }
      return card;
    });
    setCardList(newSecondCards);
    onAddSecondCard(id, newSecondCards);
  }
  
  function openCardEditor(id) {
    setEditCardData(cardList.find((card) => card.id === id));
    setIsFormOpen(true);
  }

  function addSecondCard(id = null, name = "Новый список", description = "Описание", status = false) {
    const newSecondCard = {
      id: getUniqueSecondCardId(),
      name: name,
      description: description,
      status: status,
    };
    const newSecondCards = [...cardList, newSecondCard];
    setCardList(newSecondCards);
    onAddSecondCard(id, newSecondCards);
  }

  function removeSecondCard(removedId) {
    const newSecondCards = cardList.filter((card) => card.id !== removedId);
    setCardList(newSecondCards);
    onRemoveSecondCard(id, newSecondCards);
  }

  function doneCard(id) {
    const newSecondCards = cardList.map((card) => {
      if (card.id === id) {
        card.status = true;
      }
      return card;
    });
    setCardList(newSecondCards);
    onAddSecondCard(id, newSecondCards);
  }

  function undoneCard(id) {
    const newSecondCards = cardList.map((card) => {
      if (card.id === id) {
        card.status = false;
      }
      return card;
    });
    setCardList(newSecondCards);
    onAddSecondCard(id, newSecondCards);
  }

  useEffect(() => {
    setFilteredCardList(applyFilters(cardList, filterStatus, searchTerm));
  }, [filterStatus, searchTerm, cardList]);

  return (
    <div className="FirstCardList">
      {isFormOpen ? (
        <SecondCardListForm
          cardData={editCardData}
          onAddClick={id ? editSecondCard : addSecondCard}
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
                status={card.status}
                onRemoveClick={removeSecondCard}
                onDoneClick={doneCard}
                onUndoneClick={undoneCard}
                onEditClick={openCardEditor}
              />
            ))}
          </div>
          <div className="SecondCardList__buttons">
            <Button onClick={() => setIsFormOpen(true)}>Добавить карточку</Button>
            <Button onClick={close}>Назад</Button>
          </div>
        </>
      )}
    </div>
  );
}
