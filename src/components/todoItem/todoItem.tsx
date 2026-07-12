/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo; // Очікуємо тільки об'єкт справи для відображення
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    // Додаємо клас 'completed', якщо справа виконана (текст закреслиться завдяки CSS)
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          readOnly // Чекбокс працює в режимі "лише для читання" у 1-й частині
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {/* Кнопка видалення (х) з'являється при наведенні мишки */}
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>
      {/* overlay will cover the todo while it is being deleted or updated */}
      <div data-cy="TodoLoader" className="modal overlay hidden">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
