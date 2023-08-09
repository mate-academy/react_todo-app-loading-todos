import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoError } from './components/TodoError/TodoError';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterStatus } from './types/FilterStatus';

const USER_ID = 11276;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);

  if (isError) {
    setTimeout(() => setIsError(false), 3000);
  }

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setIsError(true);
        setErrorMessage('Unable to fetch todos');
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return !todo.completed;

      case FilterStatus.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          todos={todos}
        />
        <TodoList
          todos={filteredTodos}
        />
        {todos.length > 0 && (
          <TodoFooter
            todos={todos}
            filterStatus={filterStatus}
            onFilterStatus={setFilterStatus}
          />
        )}
      </div>

      <TodoError
        isError={isError}
        onSetError={setIsError}
        errorMessage={errorMessage}
      />
    </div>
  );
};
