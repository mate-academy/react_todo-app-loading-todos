/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

export enum FiltredValue {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setfilter] = useState<FiltredValue>(FiltredValue.All);
  const [allActive, setAllActive] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
        setErrorMessage('');
      })
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  useEffect(() => {
    setDisableBtn(!todos.some(item => item.completed));
  }, [todos]);

  const SortItems = todos.filter(todo => {
    switch (filter) {
      case FiltredValue.Active:
        return !todo.completed;
      case FiltredValue.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const handleAllActive = () => {
    setAllActive(prev => !prev);
  };

  const sum = todos.filter(todo => !todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header handle={handleAllActive} />
        <Main SortItems={SortItems} allActive={allActive} />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <Footer
            disableBtn={disableBtn}
            sum={sum}
            setfilter={setfilter}
            filter={filter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification message={errorMessage} />
    </div>
  );
};
