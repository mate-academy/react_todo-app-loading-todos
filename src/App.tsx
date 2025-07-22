/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter/';
import { ErrorNotification } from './components/ErrorNotification';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { ErrorMessage } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [filtering, setFiltering] = useState<FilterType>(FilterType.all);

  const handleSetFilter = (value: FilterType) => {
    setFiltering(value);
  };

  const handleClearCompleted = () => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  const handleRemoveError = () => {
    setError(null);
  };

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    setError(null);
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => setError(ErrorMessage.LoadTodos))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        <TodoList todos={todos} isLoader={loading} filterValue={filtering} />
        {todos.length !== 0 && (
          <TodoFooter
            todos={todos}
            filterValue={filtering}
            setFilter={handleSetFilter}
            onClear={handleClearCompleted}
          />
        )}
      </div>
      <ErrorNotification isError={error} onClose={handleRemoveError} />
    </div>
  );
};
