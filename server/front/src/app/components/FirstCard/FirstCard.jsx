'use client';

import Button from "../Button/Button";
import './FirstCard.css';  
export default function FirstCard({id, header, description, onRemoveClick, onOpenClick, onEditClick}) {
    return (
        <div className="FirstCard">
            <h2>{header}</h2>
            <p>{description}</p>
            <Button onClick={() => onOpenClick(id)}>Внутренний список</Button>
            <Button onClick={() => onRemoveClick(id)}>Удалить</Button>
            <Button onClick={() => onEditClick(id)}>Редактировать</Button>
        </div>
    )
};