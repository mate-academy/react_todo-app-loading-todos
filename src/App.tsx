/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 11359;

export const App: React.FC = () => {
  const [myTodos, setMyTodos] = useState<Todo[]>([]);
  const [closeError, setCloseError] = useState(false);
  const [errorMassege, setErrorMassege] = useState('');
  const [query, setQuery] = useState('All');
  const [isCompleted, setIsCompleted] = useState(false);
  const [numberActive, setNumberActive] = useState(0);

  function hideError() {
    setTimeout(() => setCloseError(true), 3000);
  }

  function isCompletedTodo() {
    const result = myTodos.find(todo => todo.completed);

    if (result) {
      return true;
    }

    return false;
  }

  function getNumberActiveTodos(items: Todo[]) {
    const activeTodos = items.filter(todo => !todo.completed);

    return activeTodos.length;
  }

  if (isCompletedTodo()) {
    setIsCompleted(true);
  }

  useEffect(() => {
    setCloseError(true);
    getTodos(USER_ID)
      .then((todos) => {
        setMyTodos(todos);
        setNumberActive(getNumberActiveTodos(todos));
      })
      .catch(() => {
        setErrorMassege('unable to load todos');
        setCloseError(false);
        hideError();
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  function filterTodos(param: string) {
    switch (param) {
      case 'Active': {
        const activeTodos = myTodos.filter(todo => !todo.completed);

        return activeTodos;
      }

      case 'Completed': {
        const completedTodos = myTodos.filter(todo => todo.completed);

        return completedTodos;
      }

      default:
        return myTodos;
    }
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <Main todos={filterTodos(query)} />

        {myTodos.length !== 0 && (
          <Footer
            changeQuery={setQuery}
            isCompleted={isCompleted}
            numberActive={numberActive}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMassege && (
        <div
          className={`notification is-danger
                   is-light
                   has-text-weight-normal
                   ${closeError && 'hidden'}`}
        >
          <button
            onClick={() => setCloseError(true)}
            type="button"
            className="delete"
          />

          {/* show only one message at a time */}
          {errorMassege}
        </div>
      )}
    </div>
  );
};
