import React, { useEffect, useRef } from 'react';

const Header: React.FC = () => {
  // Создаем ссылку для элемента ввода
  const inputRef = useRef<HTMLInputElement>(null);

  // Используем useEffect для выполнения действий после монтирования компонента
  useEffect(() => {
    // Проверяем, что ссылка не равна null
    if (inputRef.current) {
      // Устанавливаем фокус на элемент ввода
      inputRef.current.focus();
    }
  }, []); // Пустой массив зависимостей означает, что этот эффект выполнится только один раз после монтирования компонента

  return (
    <header className="todoapp__header">
      {/* Кнопка, которая должна иметь класс `active`, только если все задачи выполнены */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Форма для добавления новой задачи */}
      <form>
        <input
          ref={inputRef} // Прикрепляем ссылку к элементу ввода
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

export default Header;
