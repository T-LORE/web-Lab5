'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Для роутинга
import login from '../../data/auth.js'; // Подключаем вынесенную функцию

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter(); // Инициализация роутера

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
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Войти
        </button>
      </form>
      {message && <p style={{ marginTop: '20px', color: 'red' }}>{message}</p>}
    </div>
  );
}
