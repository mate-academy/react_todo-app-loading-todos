import React from 'react';

import TodoFilter from '../TodoFilter/TodoFilter';

import { useTodos } from '../../hooks/useTodos';

const Footer: React.FC = () => {
  const { todos, setTodos, filter, setFilter } = useTodos();

  const isClearButtonVisible = todos.some(todo => todo.completed);

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const amountItemsLeft = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {amountItemsLeft} items left
      </span>

      <TodoFilter filter={filter} setFilter={setFilter} />

      {isClearButtonVisible && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
