import React, { useState } from "react";
import "./SecondCardFilters.css";

export default function SecondCardListFilters({ cards, onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    onFilterChange(status, searchTerm); // Передача фильтров
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onFilterChange(filterStatus, term); // Передача фильтров
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    onFilterChange("all", ""); // Сброс фильтров
  };

  return (
    <div className="SecondCardListFilters">
      <h3 className="SecondCardListFilters__header">Фильтры</h3>

      {/* Поле поиска */}
      <input
        className="SecondCardListFilters__search"
        type="text"
        placeholder="Поиск по названию или описанию"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Обертка для кнопок фильтров */}
      <div className="SecondCardListFilters__button-container">
        {/* Фильтры по статусу */}
        <button
          className="SecondCardListFilters__button"
          onClick={() => handleFilterChange("all")}
        >
          Все
        </button>
        <button
          className="SecondCardListFilters__button"
          onClick={() => handleFilterChange("done")}
        >
          Выполненные
        </button>
        <button
          className="SecondCardListFilters__button"
          onClick={() => handleFilterChange("notDone")}
        >
          Не выполненные
        </button>
      </div>

      {/* Кнопка сброса фильтров */}
      <button
        className="SecondCardListFilters__reset"
        onClick={handleResetFilters}
      >
        Сбросить фильтры
      </button>
    </div>
  );
}
