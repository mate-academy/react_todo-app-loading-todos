/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';

import { Todo } from './types/Todo';
import { Error } from './types/Error';
import { getTodos } from './api/todos';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [errors, setErrors] = useState<Error[]>([{
    title: 'test',
    isDanger: false,
  }]);
  const [todosToRender, setTodosToRender] = useState<Todo[]>();
  const [isLoading, setIsLoading] = useState(false);

  const pushError = (title = 'Unable to load') => {
    setErrors((prev: Error[] | undefined) => {
      const newError = { // error obj can be adjusted if needed
        title,
        isDanger: true,
      };

      return prev ? [...prev, newError] : [newError];
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos().then(res => {
      setTodos(res.map(({
        id, userId, title, completed,
      }) => ({
        id, userId, title, completed,
      })));
    })
      .catch(() => pushError())
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setTodosToRender(todos);
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todosToRender={todosToRender}
          setTodosToRender={setTodosToRender}
        />
        {todos && !isLoading
          ? (
            <>
              <Main todos={todosToRender || todos} />
              <Footer
                todos={todos}
                todosToRender={todosToRender || todos}
                setTodosToRender={setTodosToRender}
              />
            </>
          )
          : !errors && <Loader />}
      </div>
      {!!errors.length
      && (
        <Notification
          errors={errors}
          setErrors={setErrors}
        />
      )}
    </div>
  );
};
