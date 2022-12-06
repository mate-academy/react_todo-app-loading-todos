import React, { useState } from 'react';
import classNames from 'classnames';
import { getActiveTodos, getCompletedTodos, getTodos } from '../../api/todos';
import { Todo, TodoStatus } from '../../types/Todo';

type Props = {
  handleChangeTodos: (value: Promise<Todo[]>) => void,
  userId: number,
};

export const TodosFilter: React.FC<Props> = ({ handleChangeTodos, userId }) => {
  const [selectedItem, setSelectedItem] = useState(`${TodoStatus.All}`);
  const onSortTodos
    = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      switch (event.currentTarget.innerText) {
        case TodoStatus.Active:
          return (
            handleChangeTodos(getActiveTodos(userId)),
            setSelectedItem(`${TodoStatus.Active}`)
          );
        case TodoStatus.Completed:
          return (
            handleChangeTodos(getCompletedTodos(userId)),
            setSelectedItem(`${TodoStatus.Completed}`)
          );
        default:
          return (
            handleChangeTodos(getTodos(userId)),
            setSelectedItem(`${TodoStatus.All}`)
          );
      }
    };

  return (
    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={classNames(
          'filter__link',
          { selected: selectedItem === `${TodoStatus.All}` },
        )}
        onClick={(event) => onSortTodos(event)}
      >
        {TodoStatus.All}
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={classNames(
          'filter__link',
          { selected: selectedItem === `${TodoStatus.Active}` },
        )}
        onClick={(event) => onSortTodos(event)}
      >
        {TodoStatus.Active}
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={classNames(
          'filter__link',
          { selected: selectedItem === `${TodoStatus.Completed}` },
        )}
        onClick={(event) => onSortTodos(event)}
      >
        {TodoStatus.Completed}
      </a>
    </nav>
  );
};
