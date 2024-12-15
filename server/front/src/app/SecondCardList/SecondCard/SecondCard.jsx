'use client';

import Button from "../../components/Button/Button";
import { useState } from "react";
import './SecondCard.css';

export default function SecondCard({ id, name, description, status, onRemoveClick, onEditClick, onDoneClick, onUndoneClick }) {
  var statusView = null;
  var isDone = status;
  if (status) {
    statusView = <h3 className="status-done">выполнено</h3>;
  } else {
    statusView = <h4 className="status-pending">не выполнено</h4>;
  }

  return (
    <div className="SecondCard">
        <h2 className="SecondCard-header">{name}</h2>
        <p className="SecondCard-description">{description}</p>
        {statusView}
        <Button onClick={() => onRemoveClick(id)} className="remove-button">Удалить</Button>
        <Button onClick={() => onEditClick(id)} className="edit-button">Редактировать</Button>
        {!isDone ? <button onClick={() => onDoneClick(id)} className="done-button">Выполнить</button> : null}
        {isDone ?
            <button onClick={() => onUndoneClick(id)} className="undone-button">Отменить выполнение</button>
            : null}
    </div>
  );
}
