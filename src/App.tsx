/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoFooter } from './Components/Footer/TodoFooter';
import { TodoItem } from './Components/TodoItem/TodoItem';
import { Loader } from './Components/Loader/Loader';
import { ErrorNotification } from './Components/Error/ErrorNotification';
import { ErrorType, FilterStatus } from './types/Types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<ErrorType | ''>('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );

  const visibleTodos = todos.filter(todo => {
    if (filterStatus === FilterStatus.Active) {
      return !todo.completed;
    }

    if (filterStatus === FilterStatus.Completed) {
      return todo.completed;
    }

    return true;
  });

  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);
  const activeCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  function loadTodos() {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorType.Load))
      .finally(() => setLoading(false));
  }

  useEffect(loadTodos, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
            data-cy="ToggleAllButton"
          />
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          {loading && <Loader isLoading={loading} />}
        </section>

        {todos.length > 0 && (
          <TodoFooter
            activeCount={activeCount}
            filterStatus={filterStatus}
            hasCompleted={hasCompleted}
            onFilterChange={setFilterStatus}
          />
        )}

         <ErrorNotification
          message={errorMessage}
          onClose={() => setErrorMessage('')}
         />
      </div>
    </div>
  );
};
