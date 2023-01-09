/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from './components/Auth/AuthContext';
import { TodosForm } from './components/TodosForm/TodosForm';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const [hideErrorNotification, setHideErrorNotification] = useState(false);
  const [errorLoad, setErrorLoad] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const user = useContext(AuthContext);

  const loadTodosFromServer = async () => {
    try {
      if (user) {
        const getTodosFromServer = await getTodos(user.id);

        setTodos(getTodosFromServer);
      }
    } catch (error) {
      setErrorLoad(true);
    }
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorLoad(false);
    }, 3000);
  }, [errorLoad]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <Routes>
        <Route path="/" element={<TodosForm todos={todos} />} />
      </Routes>

      {errorLoad && (
        <div
          data-cy="ErrorNotification"
          className={hideErrorNotification ? 'is-hidden'
            : 'notification is-danger is-light has-text-weight-normal'}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setHideErrorNotification(true)}
          />

          Unable to load a todos
        </div>
      )}
    </div>
  );
};
