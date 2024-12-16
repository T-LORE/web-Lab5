'use client';

import Button from "../../components/Button/Button";
import { useState } from "react";
import './SecondCard.css';
import { updateSecondCard } from "@/api/cardApi";

export default function SecondCard({ id, name, description, status, lessonID, onRemoveClick, onEditClick, onDoneClick, onUndoneClick }) {
  var statusView = null;
  var isDone = status;
  if (status) {
    statusView = <h4 className="status-done">Выполнено</h4>;
  } else {
    statusView = <h4 className="status-pending">Не выполнено</h4>;
  }

  function handleDoneClick() {
    updateSecondCard(id, name, description, true, lessonID);
    onDoneClick(id);
    
  }

  function handleUndoneClick() {
    updateSecondCard(id, name, description, false, lessonID);
    onUndoneClick(id);
  }

  return (
    <div className="SecondCard">
        <h2 className="SecondCard-header">{name}</h2>
        <p className="SecondCard-description">{description}</p>
        
        <div className="buttons">
          {statusView}

        </div>
          {!isDone ? <button onClick={() => handleDoneClick(id)} className="done-button">Выполнить</button> : null}
          {isDone ? <button onClick={() => handleUndoneClick(id)} className="undone-button">Отменить</button> : null} 
        <Button onClick={() => onRemoveClick(id)} className="remove-button">Удалить</Button>
        <Button onClick={() => onEditClick(id)} className="edit-button">Редактировать</Button>

    </div>
  );
}
