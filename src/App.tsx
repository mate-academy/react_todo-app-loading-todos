/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, {
  useCallback,
  useContext, useEffect, useMemo, useState,
} from 'react';
import { addTodo, getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';
import { FilterTodos } from './components/FilterTodos/FilterTodos';
import { NewTodoField } from './components/NewTodoField/NewTodoField';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorMessage } from './types/ErrorMessage';
import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.ALL);
  const [title, setTitle] = useState('');
  const [error, setError] = useState<ErrorMessage>(ErrorMessage.None);
  const activeTodos = useMemo(() => (
    todos.filter(todo => !todo.completed)
  ), [todos]);

  const loadUserTodos = useCallback(() => {
    if (!user) {
      return;
    }

    setError(ErrorMessage.None);

    try {
      getTodos(user.id)
        .then(setTodos);
    } catch {
      setError(ErrorMessage.NoTodos);
    }
  }, [user]);

  useEffect(() => {
    loadUserTodos();
  }, [user]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (title.trim() && user) {
        await addTodo({
          userId: user.id,
          title: title.trim(),
          completed: false,
        });

        await loadUserTodos();

        setTitle('');
      } else {
        setError(ErrorMessage.Add);
      }
    }, [title, user],
  );

  const visibleTodos = useMemo(() => (
    todos.filter(todo => {
      switch (status) {
        case Status.ACTIVE:
          return !todo.completed;

        case Status.COMPLITED:
          return todo.completed;

        case Status.ALL:
        default:
          return true;
      }
    })
  ), [status, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">

          {todos.length
            ? (
              <button
                data-cy="ToggleAllButton"
                type="button"
                className={classNames(
                  'todoapp__toggle-all',
                  {
                    active: !activeTodos.length,
                  },
                )}
              />
            ) : (<></>)}

          <NewTodoField
            title={title}
            onTitleChange={setTitle}
            onSubmit={handleSubmit}
          />
        </header>

        {todos.length
          ? (
            <>
              <TodoList todos={visibleTodos} />
              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="todosCounter">
                  {`${activeTodos.length} items left`}
                </span>

                <FilterTodos
                  status={status}
                  onStatusChange={setStatus}
                />

                <button
                  data-cy="ClearCompletedButton"
                  type="button"
                  className="todoapp__clear-completed"
                  style={activeTodos.length === todos.length
                    ? {
                      opacity: 0,
                      pointerEvents: 'none',
                    }
                    : {}}
                >
                  Clear completed
                </button>
              </footer>
            </>
          ) : (<></>)}
      </div>

      <ErrorNotification
        error={error}
        onErrorMessageChange={setError}
      />
    </div>
  );
};
