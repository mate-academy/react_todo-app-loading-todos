import { useContext } from 'react';
import classNames from 'classnames';
import { StateOption, TodoContext } from '../context/TodoContext';

export const TodoFooter = () => {
  const {
    filter, setFilter, visibleTodos, activeTodosAmount,
  } = useContext(TodoContext);

  const completedTodosAmount = visibleTodos.every(todo => !todo.completed);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodosAmount} items left`}
      </span>
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === 'all',
          })}
          onClick={() => setFilter(StateOption.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === 'active',
          })}
          onClick={() => setFilter(StateOption.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === 'completed',
          })}
          onClick={() => setFilter(StateOption.completed)}
        >
          Completed
        </a>
      </nav>
      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={!completedTodosAmount}
      >
        Clear completed
      </button>
    </footer>
  );
};
