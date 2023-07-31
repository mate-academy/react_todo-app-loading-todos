/* eslint-disable max-len */
import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../types/Todo';
import { Field } from '../types/Field';
import { USER_ID } from '../utils/UserId';
import { client } from '../utils/fetchClient';

type Props = {
  preparedTodos: Todo[],
  todos: Todo[],
  setSelectedField: (field: Field) => void,
  selectedField: Field,
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export const Footer:React.FC<Props> = ({
  preparedTodos,
  todos,
  setSelectedField,
  selectedField,
  setTodos,
}) => {
  const itemsLeft = todos.filter(t => !t.completed).length;

  const linkClickHandler = (event:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    return (field: Field) => {
      event?.preventDefault();
      setSelectedField(field);
    };
  };

  const buttonClickHandler = () => {
    setTodos(someTodos => {
      const newTodos = [...someTodos].filter(todo => !todo.completed);

      [...someTodos]
        .filter(todo => todo.completed)
        .map(todo => client.delete(`/todos/${todo.id}?userId=${USER_ID}`));

      return newTodos;
    });
  };

  return (
    <>
      {preparedTodos && (
        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${itemsLeft} items left`}
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: selectedField === 'all',
              })}
              onClick={event => linkClickHandler(event)('all')}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: selectedField === 'active',
              })}
              onClick={event => linkClickHandler(event)('active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: selectedField === 'completed',
              })}
              onClick={event => linkClickHandler(event)('completed')}
            >
              Completed
            </a>
          </nav>

          {/* don't show this button if there are no completed todos */}
          <button
            type="button"
            className={classNames('todoapp__clear-completed', {
              'is-invisible': todos.filter(t => t.completed).length === 0,
            })}
            onClick={buttonClickHandler}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
