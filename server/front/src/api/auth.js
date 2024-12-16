// import dotenv from 'dotenv';
// dotenv.config();
// const domain = process.env.BACKEND_DOMAIN +":3000"
const domain = "51.250.16.38:3000"

// auth.js - функция для логина пользователя
const login = async (email, password) => {
    try {
        const response = await fetch(`http://${domain}/api/users/login`, {
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
        const response = await fetch(`http://${domain}/api/lessons`, {
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

const logout = async () => {
    try {
        const response = await fetch(`http://${domain}/api/users/logout`, {
        method: 'POST',
        credentials: 'include', // Отправляем куки
        });

        if (!response.ok) {
            console.error('Logout failed');
            return false; // Возвращаем false, если логаут не удался
        }

        console.log('Logout successful');
        return true; // Возвращаем true, если логаут успешен
    } catch (error) {
        console.error('Error during logout:', error);
        return false; // Возвращаем false, если произошла ошибка
    }
}

const register = async(email, password) => {
    try {
        const response = await fetch(`http://${domain}/api/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // Отправляем email и password, если сервер ожидает эти поля
            credentials: 'include', // Отправляем куки
        });

        if (!response.ok) {
            throw response;
        }

        if (response.status === 409) {
            throw response;
        }
        
        return true;
    } catch (error) {
        throw error;
    }
}


export { checkAuth, logout, register, login };
