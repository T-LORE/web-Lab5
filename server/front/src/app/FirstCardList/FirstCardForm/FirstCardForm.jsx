import Button from "../../components/Button/Button";
import { useState } from "react";

export default function FirstCardForm({ cardData = { id: null, header: '', description: '' }, onAddClick, backToCardList, onEditClick }) {
    const safeCardData = cardData || { id: null, header: '', description: '' };
    
    const [header, setHeader] = useState(safeCardData.name);
    const [description, setDescription] = useState(safeCardData.description);

    const handleAddClick = () => {
        if (header.trim() && description.trim()) {
            onAddClick(safeCardData.id, header, description );
            backToCardList();
        } else {
            alert('Заполните все поля!');
        }
    };

    const handleEditClick = () => {
        if (header.trim() && description.trim()) {
            onEditClick(safeCardData.id, header, description );
            backToCardList();
        } else {
            alert('Заполните все поля!');
        }
    }

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
            {safeCardData.id == null ? <Button onClick={handleAddClick}>Добавить</Button> : <Button onClick={handleEditClick}>Сохранить</Button>}
            <Button onClick={backToCardList}>Назад</Button>
        </div>
    )
  }