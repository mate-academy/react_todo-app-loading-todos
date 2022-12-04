import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setFilter: (filter: string) => void
  filter: string
  removeTodo: (todoId: number) => void
};

export const Footer: React.FC<Props> = ({
  todos,
  setFilter,
  removeTodo,
  filter,
}) => {
  const completedTodos = todos.filter(todo => todo.completed);

  const removeCompletedTodo = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        removeTodo(todo.id);
      }
    });
  };

  const optionSelected = (event: any) => {
    setFilter(event.currentTarget.innerHTML.toLocaleLowerCase());
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {todos.length - completedTodos.length }
        {' '}
        items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link',
            { 'filter__link selected': filter === 'all' })}
          onClick={optionSelected}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            'filter__link selected': filter === 'active',
          })}
          onClick={optionSelected}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            'filter__link selected': filter === 'completed',
          })}
          onClick={optionSelected}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={removeCompletedTodo}
      >
        Clear completed
      </button>
    </footer>
  );
};
