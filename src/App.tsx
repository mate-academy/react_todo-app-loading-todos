/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todoServices from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Filter } from './types/Filter';
import classNames from 'classnames';
import { client } from './utils/fetchClient';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [errorMes, setErrorMes] = useState<string>('');
  const [changindIds, setChangingIds] = useState<number[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const showErrorMes = (message: string) => {
    setErrorMes(message);
    setTimeout(() => {
      setErrorMes('');
    }, 3000);
  };

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMes('');

    if (newTodoTitle.trim().length === 0) {
      showErrorMes('Title should not be empty');
    } else {
      setLoading(true);
      const newTodo = {
        title: newTodoTitle,
        completed: false,
        userId: todoServices.USER_ID,
      };

      setChangingIds(prev => [...prev, 0]);
      setTodos(prev => [...prev, { ...newTodo, id: 0 }]);

      client
        .post<Todo>('/todos', newTodo)
        .then(res => {
          setTodos(prev => [...prev.filter(todo => todo.id !== 0), res]);
          setNewTodoTitle('');
        })
        .catch(() => showErrorMes('Unable to add a todo'))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    todoServices
      .getTodos()
      .then(res => {
        if (res.length === 0) {
          showErrorMes('Unable to load todos');
        } else {
          setTodos(res);
        }
      })
      .catch(() => showErrorMes('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  const handleFiltering = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    trigger: Filter,
  ) => {
    e.preventDefault();
    setFilter(trigger);
  };

  const filteredTodos = useMemo(() => {
    return todoServices.filtering(todos, filter);
  }, [todos, filter]);

  if (!todoServices.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={onHandleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              ref={inputRef}
              onChange={e => setNewTodoTitle(e.target.value)}
              disabled={loading}
            />
          </form>
        </header>

        {!!todos.length && (
          <TodoList todos={filteredTodos} changindIds={changindIds} />
        )}
        {/* Hide the footer if there are no todos */}
        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filter === Filter.All,
                })}
                data-cy="FilterLinkAll"
                onClick={e => handleFiltering(e, Filter.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filter === Filter.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={e => handleFiltering(e, Filter.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filter === Filter.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={e => handleFiltering(e, Filter.Completed)}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMes.length },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMes('')}
        />
        {/* show only one message at a time */}
        {errorMes}
        {/*(
          <div>

            Unable to add a todo
            <br />
            Unable to delete a todo
            <br />
            Unable to update a todo
          </div>
        )*/}
      </div>
    </div>
  );
};
