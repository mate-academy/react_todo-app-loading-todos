/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TodosBar } from './components/TodosBar';
import { TodoFilter } from './components/TodoFilter';
import { ErrorMessage } from './components/ErrorMessage';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterBy } from './types/Filter';
import { AddBar } from './components/AddBar';
import { TypeErrMes } from './types/Error';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterBy>(FilterBy.All);
  const [errorMessage, setErrorMessage] = useState<TypeErrMes | null>(null);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompleteTodos = todos.some(todo => todo.completed);

  const onDeleteErrorMessage = useCallback(() => {
    setErrorMessage(null);
  }, []);

  const filtertTodos = useMemo<Todo[]>(() => {
    switch (filter) {
      case FilterBy.All:
        return todos;
      case FilterBy.Active:
        return todos.filter(todo => !todo.completed);
      case FilterBy.Completed:
        return todos.filter(todo => todo.completed);
    }
  }, [filter, todos]);

  useEffect(() => {
    setErrorMessage(null);

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(TypeErrMes.UnableLoad));
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <AddBar />

        <TodosBar todos={filtertTodos} />

        {todos.length !== 0 && (
          <TodoFilter
            hasCompleteTodos={hasCompleteTodos}
            activeTodosCount={activeTodosCount}
            selectFilter={filter}
            onFilter={setFilter}
          />
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        onDeleteErrorMessage={onDeleteErrorMessage}
      />
    </div>
  );
};
