/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { LoadError } from './types/LoadError';

const USER_ID = 10895;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadError, setLoadError] = useState<LoadError>({
    status: false,
    message: '',
  });

  const fetchTodos = useCallback(async () => {
    try {
      const responce = await getTodos(USER_ID);

      if ('Error' in responce) {
        setLoadError({
          status: true,
          message: 'Unable to load a todos, pleace retry',
        });

        return;
      }

      setTodos(responce);
    } catch (error) {
      setLoadError({
        status: true,
        message: 'Unable to load a todos, check your internet connection',
      });
    } finally {
      console.log('ended fething');
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={todos} />

        {/* Hide the footer if there are no todos */}
        <Footer />
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        loadError={loadError}
        setLoadError={setLoadError}
      />
    </div>
  );
};
