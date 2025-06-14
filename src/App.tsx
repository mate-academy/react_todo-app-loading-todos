/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, TodoError, TodosErrors, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoItem } from './components/TodoItem';
import { FilterOptions, StatusFilter } from './components/StatusFilter';

interface GetFilteredTodosFilter {
  status: FilterOptions;
}

const getFilteredTodos = (todos: Todo[], filter: GetFilteredTodosFilter) => {
  let filteredTodos = [...todos];

  if (filter.status !== FilterOptions.All) {
    filteredTodos = filteredTodos.filter(todo => {
      if (filter.status === FilterOptions.Completed) {
        return todo.completed;
      }

      return !todo.completed;
    });
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodo, setLoadingTodo] = useState(true);
  const [errorMessage, setErrorMessage] = useState<TodoError | null>(null);
  const [statusFiltration, setStatusFiltration] = useState(FilterOptions.All);

  const handleHideErrors = useCallback(() => setErrorMessage(null), []);
  const showTheFooter = todos.length > 0;

  const filteredTodos = getFilteredTodos(todos, { status: statusFiltration });

  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodoCount = todos.length - completedTodos.length;

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(TodosErrors.UnableToLoad);
      })
      .finally(() => setLoadingTodo(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!loadingTodo && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </section>

            {showTheFooter && (
              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="TodosCounter">
                  {activeTodoCount} items left
                </span>
                {/* Active link should have the 'selected' class */}
                <StatusFilter
                  statusFiltration={statusFiltration}
                  onStatusFilterChange={setStatusFiltration}
                />
                {/* this button should be disabled if there are no completed todos */}
                <button
                  type="button"
                  className="todoapp__clear-completed"
                  data-cy="ClearCompletedButton"
                >
                  Clear completed
                </button>
              </footer>
            )}
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onHideErrors={handleHideErrors}
      />
    </div>
  );
};
