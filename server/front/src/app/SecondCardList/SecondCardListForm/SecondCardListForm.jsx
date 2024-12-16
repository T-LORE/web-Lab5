import Button from "../../components/Button/Button";
import { useState } from "react";
import './SecondCardListForm.css';

export default function SecondCardListForm({ cardData = { id: null, name: '', description: '', completed: false }, onAddClick, backToCardList }) {
    // Ensure `cardData` is safe to access with fallback defaults
    const safeCardData = {
        id: cardData?.id ?? null,
        header: cardData?.name ?? '',
        description: cardData?.description ?? '',
        status: cardData?.completed ?? false,
    };

    // console.log(`SecondCardListForm: ${safeCardData.id}, ${safeCardData.header}, ${safeCardData.description}, ${safeCardData.status}`);
    
    const [header, setHeader] = useState(safeCardData.header); // Use header (was name)
    const [description, setDescription] = useState(safeCardData.description);
    const [status, setStatus] = useState(safeCardData.status);

    const handleAddClick = () => {
        if (header.trim() && description.trim()) {
            onAddClick(safeCardData.id, header, description, status);
            backToCardList();
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
            <div className="checkbox-container">
                <label>Статус</label>
                <input
                    type="checkbox"
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                />
            </div>
            <Button onClick={handleAddClick}>
                {safeCardData.id == null ? 'Добавить' : 'Сохранить'}
            </Button>
            <Button onClick={backToCardList}>Назад</Button>
        </div>
    );
}
