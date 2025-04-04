import React from 'react';
import { FooterTypes } from './footer.types';
import { text } from '../../constants/text';
import classNames from 'classnames';
import { deleteTodo } from '../../api/todos';

export const FooterComponent: React.FC<FooterTypes> = ({
  todos,
  setTodos,
  count,
  selectedStatus,
  setSelectedStatus,
  handleLoading,
}) => {
  const handleClearCompletedTodos = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    completedTodos.forEach(todo => handleLoading(todo.id));

    const promises = completedTodos.map(todo => {
      handleLoading(todo.id);

      return deleteTodo(todo.id);
    });

    Promise.all(promises)
      .then(() => {
        setTodos(prevState => prevState.filter(todo => !todo.completed));
      })
      .catch(e => console.log(e));
    completedTodos.forEach(todo => handleLoading(todo.id));
  };

  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {/* Hide the footer if there are no todos */}

      <span className="todo-count" data-cy="TodosCounter">
        {count} {text.itemsLeft}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          onClick={() => setSelectedStatus('all')}
          className={classNames('filter__link', {
            selected: selectedStatus === 'all',
          })}
          data-cy="FilterLinkAll"
        >
          {text.all}
        </a>

        <a
          href="#/active"
          onClick={() => setSelectedStatus('active')}
          className={classNames('filter__link', {
            selected: selectedStatus === 'active',
          })}
          data-cy="FilterLinkActive"
        >
          {text.active}
        </a>

        <a
          href="#/completed"
          onClick={() => setSelectedStatus('completed')}
          className={classNames('filter__link', {
            selected: selectedStatus === 'completed',
          })}
          data-cy="FilterLinkCompleted"
        >
          {text.completed}
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        onClick={handleClearCompletedTodos}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
      >
        {text.clearCompleted}
      </button>
    </footer>
  );
};
