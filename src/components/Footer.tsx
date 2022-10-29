/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  setVisibleTodos: (arg: Todo[]) => void;
  visibleTodos: Todo[];
};

export const Footer = ({ todos, setVisibleTodos, visibleTodos }: Props) => {
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    switch (filterType) {
      case 'all':
        setVisibleTodos(todos);
        break;

      case 'completed':
        setVisibleTodos([...todos].filter((todo) => todo.completed));
        break;

      case 'active':
        setVisibleTodos([...todos].filter((todo) => !todo.completed));
        break;

      default:
        throw new Error('WrongType');
    }
  }, [filterType]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${visibleTodos.length}`}
        {' '}
        items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          className={classNames('filter__link', {
            selected: filterType === 'all',
          })}
          onClick={() => setFilterType('all')}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            selected: filterType === 'active',
          })}
          onClick={() => setFilterType('active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterType === 'completed',
          })}
          onClick={() => setFilterType('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
