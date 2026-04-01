import React from 'react';
import { TodoContext } from '../../context/TodoContext';
import { FILTER_TYPE } from '../../consts/constants';

export const Footer: React.FC = () => {
  const {
    todos,
    filterBy,
    setFilterBy,
    unfinishedTodos,
    handleClearCompleted,
  } = React.useContext(TodoContext);

  const hasCompletedTodo = todos.some(todo => todo.completed);

  if (todos.length === 0) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${unfinishedTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FILTER_TYPE).map(filter => (
          <a
            key={filter}
            href={`#/${filter !== FILTER_TYPE.ALL ? filter : ''}`}
            onClick={() => setFilterBy(filter)}
            className={`filter__link ${filterBy === filter ? 'selected' : ''}`}
            data-cy={`FilterLink${filter}`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => handleClearCompleted(todos)}
        disabled={!hasCompletedTodo}
      >
        Clear completed
      </button>
    </footer>
  );
};
