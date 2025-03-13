/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
// #region imports
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { FilterType } from './enums/FilterType';
// #endregion

export const App: React.FC = () => {
  // #region useState

  const [todos, setTodos] = useState<Todo[]>([]);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);
  const [selectedLink, setSelectedLink] = useState(FilterType.All);
  const [errorButton, setErrorButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [todosCounter, setTodosCounter] = useState(0);
  // #endregion

  // #region useEffect
  useEffect(() => {
    getTodos()
      .then(setAllTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (allTodos) {
      const notCompleted = allTodos.filter(todo => !todo.completed);

      setTodosCounter(notCompleted.length);
    }
  }, [selectedTodos, todos, allTodos]);

  useEffect(() => {
    switch (selectedLink) {
      case FilterType.active:
        setTodos(allTodos.filter(todo => !todo.completed));
        break;
      case FilterType.completed:
        setTodos(allTodos.filter(todo => todo.completed));
        break;
      default:
        setTodos(allTodos);
        break;
    }
  }, [selectedLink, allTodos]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);
  // #endregion

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {/* This is a completed todo */}
        <TodoList
          todos={todos}
          selectedTodos={selectedTodos}
          setSelectedTodos={setSelectedTodos}
          setAllTodos={setAllTodos}
        />

        {/* Hide the footer if there are no todos */}
        {allTodos.length > 0 && (
          <Footer
            todosCounter={todosCounter}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            todos={todos}
            setAllTodos={setAllTodos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: errorButton || errorMessage.length === 0,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorButton(true)}
        />
        {/* show only one message at a time */}
        {errorMessage.length > 0 && errorMessage}
      </div>
    </div>
  );
};
