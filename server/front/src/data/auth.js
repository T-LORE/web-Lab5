// auth.js - функция для логина пользователя
const login = async (email, password) => {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Отправляем email и password, если сервер ожидает эти поля
        credentials: 'include', // Отправляем куки
        });

        if (!response.ok) {
            console.error('Login failed');
            return false; // Возвращаем false, если логин не удался
        }

        // Если сервер отправляет токен в куки, то клиент автоматически его получит через credentials: 'include'.
        console.log('Login successful');
        return true; // Возвращаем true, если логин успешен
    } catch (error) {
        console.error('Error during login:', error);
        return false; // Возвращаем false, если произошла ошибка
    }
};

// проверка авторизации
const checkAuth = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/lessons', {
        method: 'GET',
        credentials: 'include', // Отправляем куки
        });

        if (!response.ok) {
            console.log('Not authorized');
            return false; // Возвращаем false, если пользователь не авторизован
        }

        console.log('Authorized');
        return true; // Возвращаем true, если пользователь авторизован
    } catch (error) {
        console.error('Error during checkAuth:', error);
        return false; // Возвращаем false, если произошла ошибка
    }
};

export default login;
export { checkAuth };
