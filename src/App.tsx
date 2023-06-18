/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Header } from './Components/Header/Header';
import { TodoList } from './Components/TodoList/TodoList';
import { Footer } from './Components/Footer/Footer';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Error } from './types/Error';
import { Type } from './types/TodoTypes';

const USER_ID = 10788;

if (!USER_ID) {
  <UserWarning />;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedType, setSelectedType] = useState(Type.All);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<Error>(Error.NONE);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true);
        const loadedTodos = await getTodos(USER_ID);

        setTodos(loadedTodos);
      } catch (error) {
        setIsError(Error.DOWNLOAD);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    switch (selectedType) {
      case Type.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Type.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, selectedType]);

  useEffect(() => {
    if (isError) {
      setIsError(isError);

      setTimeout(() => {
        setIsError(Error.NONE);
      }, 3000);
    }
  }, [isError]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          onError={setIsError}
        />
        <TodoList
          todos={filteredTodos}
          onError={() => setIsError}
          isLoading={isLoading}
        />

        {todos.length && (
          <Footer
            todos={todos}
            selectType={selectedType}
            onClickType={setSelectedType}
          />
        )}
      </div>

      <div className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: isError === Error.NONE },
      )}
      >
        <button
          type="button"
          className="delete"
        />
        {isError}
      </div>
    </div>
  );
};
