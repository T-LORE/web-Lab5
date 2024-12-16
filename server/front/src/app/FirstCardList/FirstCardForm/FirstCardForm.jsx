"use client";

import Button from "../../components/Button/Button";
import { useState } from "react";
import './FirstCardForm.css';

export default function FirstCardForm({ cardData = { id: null, header: '', description: '' }, onAddClick, backToCardList, onEditClick }) {
    // Используем безопасное значение по умолчанию
    const safeCardData = {
        id: cardData?.id ?? null,
        header: cardData?.name ?? '',
        description: cardData?.description ?? '',
    };

    const [header, setHeader] = useState(safeCardData.header);
    const [description, setDescription] = useState(safeCardData.description);

    const handleAddClick = () => {
        if (header.trim() && description.trim()) {
            onAddClick(safeCardData.id, header, description);
        } else {
            alert('Заполните все поля!');
        }
    };

    const handleEditClick = () => {
        if (header.trim() && description.trim()) {
            onEditClick(safeCardData.id, header, description);
        } else {
            alert('Заполните все поля!');
        }
    };

    return (
        <div className="FirstCardForm">
            {safeCardData.id == null ? <h2>Добавить карточку</h2> : <h2>Редактировать карточку</h2>}
            <input
                type="text"
                placeholder="Header"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {safeCardData.id == null ? (
                <Button onClick={handleAddClick}>Добавить</Button>
            ) : (
                <Button onClick={handleEditClick}>Сохранить</Button>
            )}
            <Button onClick={backToCardList}>Назад</Button>
        </div>
    );
}
