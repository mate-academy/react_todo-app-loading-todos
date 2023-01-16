/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { InputForm } from './components/InputForm/InputForm';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilters } from './components/TodoFilters/TodoFilters';

export const App: React.FC = () => {
  const [errorLoad, setErrorLoad] = useState(false);
  const [isLoadError, setisLoadError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([]);

  const user = useContext(AuthContext);

  const loadTodosFromServer = async () => {
    try {
      if (user) {
        const getTodosFromServer = await getTodos(user.id);

        setTodos(getTodosFromServer);
      }
    } catch (error) {
      setisLoadError(true);
    }
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setisLoadError(false);
    }, 3000);
  }, [isLoadError]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">

        <InputForm />
        <TodoList filtredTodos={filtredTodos} />
        <TodoFilters
          todos={todos}
          setFiltredTodos={setFiltredTodos}
        />
      </div>

      {isLoadError && (
        <div
          data-cy="ErrorNotification"
          className={errorLoad ? 'is-hidden'
            : 'notification is-danger is-light has-text-weight-normal'}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setErrorLoad(true)}
          />

          Unable to load a todos
        </div>
      )}
    </div>
  );
};
