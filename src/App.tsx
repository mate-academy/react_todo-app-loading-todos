/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { TodoHeader } from './components/Todo/Header/Header';
import { TodoList } from './components/Todo/List/List';
import { ErrorMessageComponent } from './components/ErrorMessage/ErrorMessage';
import { TodoFooter } from './components/Todo/Footer/Footer';
import { FilterOption } from './types/FilterOptions';
import { ErrorType } from './types/ErrorTypes';
import { getTodos } from './api/todos';

const prepareTodos = (list: Todo[], filterBy: FilterOption) => {
  let copy = [...list];

  if (filterBy !== FilterOption.ALL) {
    copy = copy.filter(todo => {
      switch (filterBy) {
        case FilterOption.ACTIVE: {
          return !todo.completed;
        }

        case FilterOption.COMPLETED: {
          return todo.completed;
        }

        default: {
          return true;
        }
      }
    });
  }

  return copy;
};

export const App: React.FC = () => {
  const [filterBy, setFilterBy] = useState<FilterOption>(FilterOption.ALL);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>(ErrorType.DEFAULT);

  useEffect(() => {
    let timeout: number;
    const fetchTodos = async () => {
      try {
        const result = await getTodos();

        setTodos(result);
        setErrorMessage(ErrorType.DEFAULT);
      } catch (error) {
        setErrorMessage(ErrorType.FAIL_LOADING);
        timeout = window.setTimeout(() => {
          setErrorMessage(ErrorType.DEFAULT);
        }, 3000);
      }
    };

    fetchTodos();

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  // #region handlers

  const handleFilterChange = useCallback((newType: FilterOption) => {
    setFilterBy(newType);
  }, []);

  // #endregion

  const visibleTodos = useMemo(
    () => prepareTodos(todos, filterBy),
    [todos, filterBy],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoHeader />
        <TodoList todos={visibleTodos} />
        {todos.length > 0 && (
          <TodoFooter
            filterBy={filterBy}
            onFilterChange={handleFilterChange}
            todos={todos}
          />
        )}
      </div>

      <ErrorMessageComponent
        message={errorMessage}
        onMessageHide={() => setErrorMessage(ErrorType.DEFAULT)}
      />
    </div>
  );
};
