/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoNotification } from './components/TodoNotification/TodoNotification';
import * as postServes from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { FilterType } from './types/enum';
import { getPreperadTodos } from './utils/helper';

export const USER_ID = 11122;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filterBy, setFilterBy] = useState<string>(FilterType.All);

  useEffect(() => {
    setIsError(false);

    postServes.getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setIsError(true);
        setErrorMessage('Unable to load a todo');
      });
  }, []);

  const addTodo = ({ title, completed, userId }: Omit<Todo, 'id'>) => {
    postServes
      .createTodo({ title, completed, userId })
      .then(newTodo => {
        setTodos(currentTodos => [...currentTodos!, newTodo]);
      })
      .catch(() => {
        setIsError(true);
        setErrorMessage('Unable to add a todo');
      });
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const hasTodos = todos?.length !== 0;
  const vidibleTodos = getPreperadTodos(todos, filterBy);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {hasTodos && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          <TodoForm
            addTodo={(newTodo) => addTodo(newTodo)}
            userId={USER_ID}
          />
        </header>

        {hasTodos && (
          <section className="todoapp__main">
            <TodoList todos={vidibleTodos} />
          </section>
        )}

        {hasTodos && (
          <TodoFooter
            todos={vidibleTodos}
            filterBy={filterBy}
            onFilterBy={setFilterBy}
          />
        )}
      </div>

      {!isError && (
        <TodoNotification
          isError={isError}
          errorMessage={errorMessage}
          isNotification={setIsError}
        />
      )}
    </div>
  );
};
