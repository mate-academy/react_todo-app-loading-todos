import React, { useEffect, useState } from 'react';
import { TodoHeader } from './Components/TodoHeader';
import { TodoMain } from './Components/TodoMain';
import { TodoFooter } from './Components/TodoFooter';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { ErrorNotification } from './Components/ErrorNotification';

const USER_ID = 11143;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState('all');
  // const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(setErrorMessage);
  }, []);

  // const preparedTodos = [...todos]
  //   .filter((todo) => {
  //     const normalizedQuery = query.toLowerCase().trim();
  //     const normalizedTitle = todo.title.toLowerCase().trim();

  //     return query ? normalizedTitle.includes(normalizedQuery) : true;
  //   })
  //   .filter((todo) => {
  //     switch (filterType) {
  //       case 'active': return !todo.completed;
  //       case 'completed': return todo.completed;
  //       default: return todo;
  //     }
  //   });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          todos={todos}
        />

        {todos && (
          <TodoMain
            todos={todos}
          />
        )}

        {todos && (
          <TodoFooter
            filterType={filterType}
            setFilterType={setFilterType}
            todos={todos}
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
