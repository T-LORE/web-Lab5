import Button from "../../components/Button/Button";
import { useState } from "react";
import './SecondCardListForm.css';

export default function SecondCardListForm({ cardData = { id: null, header: '', description: '', status: false }, onAddClick, backToCardList }) {
    console.log(cardData);
    const safeCardData = cardData || { id: null, header: '', description: '', status: false };
    
    const [header, setHeader] = useState(safeCardData.name);
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
            <h2>Добавить карточку</h2>
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
            {safeCardData.id == null ? <Button onClick={handleAddClick}>Добавить</Button> : <Button onClick={handleAddClick}>Сохранить</Button>}
            <Button onClick={backToCardList}>Назад</Button>
        </div>
    );
    
  }