/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

import { UserWarning } from './UserWarning';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { Notification } from './components/Notification/Notification';

const USER_ID = 10587;
// https://mate.academy/students-api/todos?userId=10587

export const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [todos, setTodos] = useState<Todo[] | []>([]);

  const handleCloseErrorMessage = useCallback(() => {
    setErrorMessage('');
  }, []);

  const handleLoadTodos = useCallback(async () => {
    try {
      const todosFromApi = await getTodos(USER_ID);

      setTodos(todosFromApi);
    } catch {
      setErrorMessage('Unable to load a todos');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }, []);

  useEffect(() => {
    handleLoadTodos();
  }, []);

  const handleFilterSelected = () => {
    setFilter(filter);
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  const filterTodos = useMemo(() => {
    return todos.filter((todo: Todo) => {
      switch (filter) {
        case FilterType.Completed:
          return todo.completed;
        case FilterType.Active:
          return !todo.completed;
        default:
          return todo;
      }
    });
  }, [todos, FilterType]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header hasActiveTodos={activeTodos.length > 0} />

        <TodoList visibleTodos={filterTodos} />

        {filterTodos && (
          <Footer
            filter={filter}
            filterSelected={handleFilterSelected}
            todosLength={todos.length}
            hasCompletedTodos={completedTodos.length > 0}
          />
        )}
      </div>

      {errorMessage && (
        <Notification
          errorMessage={errorMessage}
          closeErrorMessage={handleCloseErrorMessage}
        />
      )}
    </div>
  );
};
