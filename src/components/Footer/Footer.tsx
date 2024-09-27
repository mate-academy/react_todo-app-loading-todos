import React from 'react';
import { Filter } from '../Filter';
import { useTodos } from '../TodosProvider';

export const Footer: React.FC = () => {
  const { todos } = useTodos();

  const quantityTodos: number = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {quantityTodos} items left
      </span>

      <Filter />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
