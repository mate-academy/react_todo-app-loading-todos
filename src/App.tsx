/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { FilterStatus, ErrorMessages } from './types';
import { Todo } from './types';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList';
import { filterTodos } from './utils/fiterTodos';
import { ErrorNotification } from './components/ErrorNotification';

export const USER_ID = 3653;

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [preparedTodos, setPreparedTodos] = useState<Todo[]>([]);
  const [activeFilterStatus, setActiveFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );
  const [currentError, setCurrentError] = useState<ErrorMessages | ''>('');

  const handleHideError = (): void => {
    setCurrentError('');
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true);
        const data: Todo[] = await getTodos();

        setPreparedTodos(data);
      } catch (error) {
        setCurrentError(ErrorMessages.Load);
        setTimeout(() => {
          handleHideError();
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, [currentError]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = filterTodos(preparedTodos, activeFilterStatus);

  const handleChangeFilter = (type: FilterStatus) => {
    setActiveFilterStatus(type);
  };

  const handleCheckTodo = (id: number) => {
    setPreparedTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const quantityTasksActive = preparedTodos.filter(
    todo => !todo.completed,
  ).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          quantityTasksActive={quantityTasksActive}
          todos={preparedTodos}
        />

        <TodoList
          filteredTodos={filteredTodos}
          handleOnCheckTodo={handleCheckTodo}
          isLoading={isLoading}
        />

        {preparedTodos.length > 0 && (
          <TodoFooter
            todos={preparedTodos}
            quantityTasksActive={quantityTasksActive}
            activeFilterStatus={activeFilterStatus}
            handleOnChangeFilter={handleChangeFilter}
            handleOnDeleteAllTodos={() => setPreparedTodos([])}
          />
        )}
      </div>

      <ErrorNotification
        currentError={currentError}
        handleOnHideError={handleHideError}
      />
    </div>
  );
};
