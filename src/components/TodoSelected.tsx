import React, { useState } from 'react';
import cn from 'classnames';
import { SelectedTodo } from '../types/SelectedTodo';

type Props = {
  onTodoSelected: (value: string) => void,
  isTodoSelected: string,
};

export const TodoSelecet: React.FC<Props> = ({
  onTodoSelected,
  isTodoSelected,
}) => {
  const [defaultActiveSelect, setDefaultActiveSelect] = useState(true);

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', {
          'filter__link selected': defaultActiveSelect,
        })}
        data-cy="FilterLinkAll"
        onClick={() => {
          onTodoSelected(SelectedTodo.all);
          setDefaultActiveSelect(true);
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          'filter__link selected': SelectedTodo.active === isTodoSelected,
        })}
        data-cy="FilterLinkActive"
        onClick={() => {
          onTodoSelected(SelectedTodo.active);
          setDefaultActiveSelect(false);
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          'filter__link selected': SelectedTodo.completed === isTodoSelected,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => {
          onTodoSelected(SelectedTodo.completed);
          setDefaultActiveSelect(false);
        }}
      >
        Completed
      </a>
    </nav>
  );
};
