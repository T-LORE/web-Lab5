'use client';

import './Button.css';  // Подключаем стили для кнопки

export default function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="Button">
      {children}
    </button>
  );
}