/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import * as postService from './api/todos';

const USER_ID = 11636;

enum StatusFilter {
  ALL = 'ALL',
  COMPLETED = 'COMPLETED',
  ACTIVE = 'ACTIVE',
}

export const App: React.FC = () => {
  const [textTodo, setTextTodo] = useState('');
  const [status, setStatus] = useState<StatusFilter>(StatusFilter.ALL);
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    postService.getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        setTimeout(() => {
          setError('');
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const todoFilter = () => {
    const filterTodos: Todo[] = [...todos].filter((todo) => {
      switch (status) {
        case StatusFilter.ACTIVE:
          return !todo.completed;

        case StatusFilter.COMPLETED:
          return todo.completed;

        default:
          return todo;
      }
    });

    return filterTodos;
  };

  const completedTodo = todos.filter(todo => !todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          textTodo={textTodo}
          setTextTodo={setTextTodo}
        />

        <TodoList
          todos={todoFilter()}
          setTodos={setTodos}
        />
        {todos.length > 0 && (
          <Footer
            status={status}
            setStatus={setStatus}
            todos={completedTodo}
          />
        )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={
          classNames(
            'notification is-danger is-light has-text-weight-normal',
            { hidden: !error },
          )
        }
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {/* show only one message at a time */}
        {error}
      </div>
    </div>
  );
};
