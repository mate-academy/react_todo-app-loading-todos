/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Errors } from './components/Errors/Errors';
import { TodoContent } from './components/TodoContent/TodoContent';
import { FilterType } from './types/FilterType';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  const hideError = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError(ErrorType.UnableToLoadTodos);
        hideError();
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === FilterType.Active) {
      return !todo.completed;
    }

    if (filter === FilterType.Completed) {
      return todo.completed;
    }

    return true;
  });

  const handleFilter = (actualFilter: FilterType) => {
    setFilter(actualFilter);
  };

  const handleError = (thrownError: ErrorType | null) => {
    setError(thrownError);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <TodoContent>
        <TodoList todos={filteredTodos} />
        {todos.length !== 0 && (
          <Footer todos={todos} filter={filter} onFilterChange={handleFilter} />
        )}
      </TodoContent>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Errors error={error} onErrorChange={handleError} />
    </div>
  );
};
