const getFistCards = async () => {
    try {
        const response = await fetch("http://127.0.0.1:3000/api/lessons", {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw response
        }

        
        return await response.json();
    } catch (error) {
        throw error;
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
            throw response;
        }

        
        const cards = await response.json();
        return cards.find(card => card.id === id);

    } catch (error) {
        throw error;
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
            throw response;
        }

        // Получаем все карточки
        const cards = await response.json();

        // Фильтруем карточки по lessonId на стороне клиента
        return cards.filter(card => card.lessonId === id);
    } catch (error) {
        throw error;
    }
};

const createSecondCard = async (lessonId, name, description, completed) => {
    try {
        console.log(lessonId, name, description, completed);
        const response = await fetch('http://127.0.0.1:3000/api/tasks', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",

            body: JSON.stringify({
  "name": name,
  "description": description,
  "completed": completed,
  "lessonId": lessonId
}),
        });

        if (!response.ok) {
            throw new Error("Не удалось создать карточку");
        }

        return await response.json();
    }
    catch (error) {
        console.error("Ошибка при создании карточки:", error);
        return null;
    }
}

const updateSecondCard = async (cardid, name, description, completed, lessonId) => {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/tasks/${cardid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ name, description, completed, lessonId }),
        });

        if (!response.ok) {
            throw new Error("Не удалось обновить карточку");
        }

        return await response.json();
    }
    catch (error) {
        console.error("Ошибка при обновлении карточки:", error);
        return null;
    }
}

const deleteSecondCard = async (cardid) => {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/tasks/${cardid}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Не удалось удалить карточку");
        }

        return true;
    }
    catch (error) {
        console.error("Ошибка при удалении карточки:", error);
        return false;
    }
}

const createFirstCard = async (name, description) => {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/lessons', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ name, description }),
        });

        if (!response.ok) {
            throw new Error("Не удалось создать карточку");
        }

        return await response.json();
    } catch (error) {
        console.error("Ошибка при создании карточки:", error);
        return null;
    }
}

const updateFirstCard = async (id, name, description) => {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/lessons/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ name, description }),
        });

        if (!response.ok) {
            throw new Error("Не удалось обновить карточку");
        }

        return await response.json();
    } catch (error) {
        console.error("Ошибка при обновлении карточки:", error);
        return null;
    }
}

const deleteFirstCard = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/lessons/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Не удалось удалить карточку");
        }

        return true;
    }
    catch (error) {
        console.error("Ошибка при удалении карточки:", error);
        return false;
    }
}

export { getFistCards, getFirstCard, getSecondCards, createSecondCard, updateSecondCard, deleteSecondCard, createFirstCard, updateFirstCard, deleteFirstCard };

