/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoError } from './components/TodoError/TodoError';
import { Error } from './types/Error';
import { Filter } from './types/Filter';

const USER_ID = 12007;

const preparedTodos = (todosList: Todo[], selectedFilter: Filter): Todo[] => {
  let filteredTodos = [...todosList];

  switch (selectedFilter) {
    case Filter.Active:
      filteredTodos = todosList.filter(todo => !todo.completed);
      break;

    case Filter.Completed:
      filteredTodos = todosList.filter(todo => todo.completed);
      break;
    default:
      return todosList;
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<Filter>(Filter.All);
  const [errorType, setErrorType] = useState<Error | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorType(Error.Load));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = preparedTodos(todos, filterStatus);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList
          todos={filteredTodos}
          setErrorType={setErrorType}
        />

        {!todos.length && (
          <TodoFooter
            todos={todos}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        )}
      </div>

      {errorType && (
        <TodoError
          errorType={errorType}
          setErrorType={setErrorType}
        />
      )}
    </div>
  );
};
