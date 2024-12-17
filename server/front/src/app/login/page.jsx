'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Для роутинга
import {login, checkAuth} from '../../api/auth.js'; // Подключаем вынесенную функцию

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter(); // Инициализация роутера
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function auth() {
      try {
        const isAuth = await checkAuth(); // Проверяем авторизацию
        console.log("checkAuth");
        console.log(isAuth);
        if (isAuth) {
            router.push('/FirstCardList'); 
        }
        setLoading(false);
      } catch (error) {
          
      }
    }
    if (loading){
      auth();
    }
    
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    const success = await login(email, password); // Вызываем функцию логина

    if (success) {
      console.log('Логин успешен');
      router.push('/FirstCardList'); // Перенаправляем на главную страницу или другую страницу после успешного логина
    } else {
      setMessage('Неверный email или пароль.');
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Пароль:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              required
            />
          </label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
            Войти
          </button>
          <button type="button" onClick={() => router.push('/register')} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer', marginLeft: '10px' }}> Регистрация </button>       
        </div>
      </form>

      
      {message && <p style={{ marginTop: '20px', color: 'red' }}>{message}</p>}
    </div>
  );
}
