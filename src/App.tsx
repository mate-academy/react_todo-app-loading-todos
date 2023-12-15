/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import * as fetchCl from './api/todos';
import { Header } from './components/header/Header';
import { Todoapp } from './components/Todoapp/Todoapp';

const USER_ID = 11999;

type Status = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoNameInput, setTodoNameInput] = useState('');
  const [status, setStatus] = useState<Status>('all');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCl.getTodos(USER_ID)
      .then(res => setTodos(res))
      .catch(() => setError('Unable to load todos'));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      if (status === 'active') {
        return todo.completed === false;
      }

      if (status === 'completed') {
        return todo.completed === true;
      }

      return true;
    });
  }, [todos, status]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (todoNameInput.trim()) {
      setTodos([...todos, {
        id: +new Date(),
        userId: USER_ID,
        title: todoNameInput,
        completed: false,
      }]);

      fetchCl.createTodo({
        userId: USER_ID,
        title: todoNameInput,
        completed: false,
      }).catch(() => {
        setError('Unable to add todo');
        setTimeout(() => setError(''), 3000);
      });

      setTodoNameInput('');
    } else {
      setError('Title should not be empty');
      setTimeout(() => setError(''), 3000);
    }
  };

  const countRemainingTodo = () => {
    let count = 0;

    todos.forEach(todo => {
      if (!todo.completed) {
        count += 1;
      }
    });

    return count;
  };

  const hasCompletedTodo = () => {
    return visibleTodos.some(todo => todo.completed);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          onSubmit={addTodo}
          inputValue={todoNameInput}
          changeInputValue={setTodoNameInput}
        />

        {todos
          && <Todoapp todos={visibleTodos} /> }

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${countRemainingTodo()} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: status === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setStatus('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: status === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setStatus('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: status === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setStatus('completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              {hasCompletedTodo()
                ? 'Clear completed'
                : ''}
            </button>
          </footer>
        )}
      </div>
      {error && (
        <div
          data-cy="ErrorNotification"
          className={cn(
            'notification',
            'is-danger',
            'is-light',
            'has-text-weight-normal',
            { hidden: !error },
          )}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setError('')}
          />
          {error}
        </div>
      )}
    </div>
  );
};
