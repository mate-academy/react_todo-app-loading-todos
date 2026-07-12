/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../todoItem/todoItem'; // Імпортуємо компонент для окремої справи

interface TodoMainProps {
  visibleTodos: Todo[]; // Очікуємо тільки масив відфільтрованих справ
}

export const TodoMain: React.FC<TodoMainProps> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* Перебираємо масив і рендеримо TodoItem для кожної справи */}
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id} // Ключ обов'язково залишається на верхньому рівні всередині map
          todo={todo} // Передаємо весь об'єкт справи
        />
      ))}
    </section>
  );
};
