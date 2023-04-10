/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';

import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Loader } from './component/Loader/Loader';
import { TodoList } from './component/TodoList/TodoList';
import { Footer } from './component/Footer/Footer';
import { LoadType } from './LoadType';

const USER_ID = 6908;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [typeOfLoad, setTypeOfLoad] = useState<LoadType>(LoadType.All);
  const [isLoading, setIsLoading] = useState(false);

  const getTodosFromServer = async (userId: number) => {
    try {
      setIsLoading(true);
      const getTodo = await getTodos(userId);

      setTodos(getTodo);
    } catch {
      setError('Unable to load todos');
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodosFromServer(USER_ID);
  }, []);

  const activeTodos = useMemo(() => {
    return todos.filter(({ completed }) => !completed).length;
  }, [todos]);

  const close = () => {
    setError('');
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {isLoading && (

          <Loader />
        )}

        {todos.length > 0 && (
          <>
            <TodoList
              todos={todos}
              typeOfLoad={typeOfLoad}
            />

            <Footer
              typeOfLoad={typeOfLoad}
              setTypeOfLoad={setTypeOfLoad}
              activeTodos={activeTodos}
              completedTodos={todos.length - activeTodos}
            />
          </>
        )}

      </div>

      <div className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
      >
        <button
          type="button"
          className="delete"
          onClick={close}
        />

        {`Unable to ${error} a todo`}
      </div>
    </div>
  );
};
