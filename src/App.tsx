/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
// import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { Error } from './components/Error/Error';
import { Todo } from './types/Todo';
import { FilterOption } from './types/Filter';
import { ErrorType } from './types/Error';
import { Loader } from './components/Loader/Loader';

export const App: React.FC = () => {
  // if (!USER_ID) {
  //   return <UserWarning />;
  // }
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorType>(
    ErrorType.noError,
  );
  const [filterField, setFilterField] = useState(FilterOption.all);

  const loadData = () => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorType.loading);
        const timeoutId = setTimeout(() => {
          setErrorMessage(ErrorType.noError);
        }, 3000);

        return () => clearTimeout(timeoutId);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredTodos = todos.filter(
    todo =>
      filterField === FilterOption.all ||
      (filterField === FilterOption.completed && todo.completed) ||
      (filterField === FilterOption.active && !todo.completed),
  );

  const handleFilterBy = (filter: FilterOption) => {
    setFilterField(filter);
  };

  const handleHideError = () => {
    setErrorMessage(ErrorType.noError);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="todoapp__content">
          <TodoForm />

          <TodoList todos={filteredTodos} />

          {/* Hide the footer if there are no todos */}
          {todos.length > 0 && (
            <TodoFilter
              filterField={filterField}
              onFilter={handleFilterBy}
              todos={todos}
            />
          )}
        </div>
      )}

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error errorMessage={errorMessage} handleHideError={handleHideError} />
    </div>
  );
};
