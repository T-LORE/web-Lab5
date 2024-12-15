const getFistCards = async () => {
    try {
        const response = await fetch("http://127.0.0.1:3000/api/lessons", {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Не удалось загрузить карточки");
        }

        
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getFirstCard = async (id) => {
    try {
        const response = await fetch("http://127.0.0.1:3000/api/lessons", {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Не удалось загрузить карточки");
        }

        
        const cards = await response.json();
        return cards.find(card => card.id === id);

    } catch (error) {
        console.error(error);
        return [];
    }
}

const getSecondCards = async (id) => {
    try {
        // Запрашиваем все карточки с сервера
        const response = await fetch('http://127.0.0.1:3000/api/tasks', {
            method: "GET",
            credentials: "include", // Чтобы передавать куки с запросом
        });

        if (!response.ok) {
            throw new Error("Не удалось загрузить карточки");
        }

        // Получаем все карточки
        const cards = await response.json();

        // Фильтруем карточки по lessonId на стороне клиента
        return cards.filter(card => card.lessonId === id);
    } catch (error) {
        console.error("Ошибка при загрузке карточек:", error);
        return [];  // Возвращаем пустой массив в случае ошибки
    }
};

export { getFistCards, getFirstCard, getSecondCards };

