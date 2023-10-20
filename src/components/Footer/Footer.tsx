import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Query } from '../../types/Query';
import { QueryEnum } from '../../types/QueryEnum';

interface Props {
  todos: Todo[],
  setQuery: (value: Query) => void;
  deleteAllTodos: (id: number) => void;
}

export const Footer: React.FC<Props> = ({
  todos,
  setQuery = () => { },
  deleteAllTodos = () => { },
}) => {
  const [selected, setSelected] = useState<Query>(QueryEnum.All);
  let itemsLeft = '';

  const notCompletedTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  if (todos.length) {
    switch (notCompletedTodos.length) {
      case 1:
        itemsLeft = '1 item left';
        break;

      default:
        itemsLeft = `${notCompletedTodos.length} items left`;
    }
  } else {
    itemsLeft = '';
  }

  const handleClick = (value: string) => {
    setQuery(value as Query);
    setSelected(value as Query);
  };

  return (
    <>
      {
        itemsLeft && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {itemsLeft}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: selected === QueryEnum.All,
                })}
                onClick={() => handleClick(QueryEnum.All)}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: selected === QueryEnum.Active,
                })}
                onClick={() => handleClick(QueryEnum.Active)}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: selected === QueryEnum.Completed,
                })}
                onClick={() => handleClick(QueryEnum.Completed)}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {
              !!completedTodos.length && (
                <button
                  type="button"
                  className="todoapp__clear-completed"
                  onClick={() => deleteAllTodos}
                  data-cy="ClearCompletedButton"
                >
                  Clear completed
                </button>
              )
            }
          </footer>
        )
      }
    </>
  );
};
