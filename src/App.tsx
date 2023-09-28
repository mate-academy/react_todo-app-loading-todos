/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import * as postService from './api/todos';
import { Header } from './componens/Header';
import { TodoList } from './componens/TodoList';
import { Footer } from './componens/Footer';

const USER_ID = 11582;

enum StatusFilter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [status, setStatus] = useState<StatusFilter>(StatusFilter.ALL);
  const [errorMessege, setErrorMessege] = useState('');

  const [textTodo, setTextTodo] = useState('');

  useEffect(() => {
    postService.getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessege('Unable to load todos');
        setTimeout(() => {
          setErrorMessege('');
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  function filterTodo() {
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
  }

  const filteredTodos = filterTodo();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header
          setTextTodo={setTextTodo}
          textTodo={textTodo}
        />

        <TodoList
          todos={filteredTodos}
          setTodos={setTodos}
        />

        {todos.length > 0 && (
          <Footer
            status={status}
            setStatus={setStatus}
            todos={todos}
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
            { hidden: !errorMessege },
          )
        }

      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessege('')}
        />
        {errorMessege}

      </div>
    </div>
  );
};
