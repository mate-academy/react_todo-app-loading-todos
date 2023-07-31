import React, { useEffect, useState } from 'react';
import { TodoHeader } from './Components/TodoHeader';
import { TodoMain } from './Components/TodoMain';
import { TodoFooter } from './Components/TodoFooter';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { ErrorNotification } from './Components/ErrorNotification';
import { Filter } from './types/Filter';
import { ErrorStatus } from './types/ErrorStatus';

const USER_ID = 11143;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState(Filter.All);
  // const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorStatus.Load);
      });
  }, []);

  const preparedTodos = [...todos]
    .filter((todo) => {
      switch (filterType) {
        case Filter.Active: return !todo.completed;
        case Filter.Completed: return todo.completed;
        default: return todo;
      }
    });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          todos={preparedTodos}
        />

        {todos && (
          <TodoMain
            todos={preparedTodos}
          />
        )}

        {todos && (
          <TodoFooter
            filterType={filterType}
            setFilterType={setFilterType}
            todos={preparedTodos}
          />
        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
