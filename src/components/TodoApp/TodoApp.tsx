import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import './TodoApp.scss';
import { Filter } from '../Filter';
import { TodoList } from '../TodoList';
import { useTodos } from '../../TodosProvider/useTodos';
import { FilterType } from '../../types/FilterType';
import { ActionType } from '../../types/ActionType';
import { filterTodos } from './services/filterTodos';
import { createTodo } from './services/createTodo';
import { getTodos } from '../../api/todos';

export const TodoApp: React.FC = () => {
  const { todos, setTodos } = useTodos();
  const [filter, setFilter] = useState(FilterType.All);
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let focusedEl: React.RefObject<HTMLInputElement> | null = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => focusedEl?.current?.focus(), [todos]);

  useEffect(() => {
    getTodos()
      .then(res => setTodos({ type: ActionType.GetTodos, payload: res }))
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setTimeout(() => setErrorMessage(''), 3000));
  }, [setTodos]);

  const areAllCompleted = todos.every(({ completed }) => completed);
  const uncompletedTodos = todos.filter(({ completed }) => !completed);
  const filteredTodos = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    setTodos({
      type: ActionType.AddTodo,
      payload: createTodo(normalizedTitle),
    });
    setTitle('');
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: areAllCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={() =>
                setTodos({
                  type: ActionType.LeadToOneStatus,
                  payload: !areAllCompleted,
                })
              }
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={event => setTitle(event.target.value)}
              ref={focusedEl}
            />
          </form>
        </header>

        <TodoList todos={filteredTodos} />

        {!!todos.length && (
          <footer
            onClick={() => (focusedEl = null)}
            className="todoapp__footer"
            data-cy="Footer"
          >
            <span className="todo-count" data-cy="TodosCounter">
              {uncompletedTodos.length} items left
            </span>

            <Filter filter={filter} onChange={setFilter} />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => setTodos({ type: ActionType.ClearCompleted })}
              disabled={uncompletedTodos.length === todos.length}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
