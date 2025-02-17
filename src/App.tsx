import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Filter } from './types/Filter';
import { Todo as TodoType } from './types/Todo';
import { Todo } from './components/Todo';
import { TodoFilter } from './components/TodoFilter';
import { ErrorMessage } from './components/ErrorMessage';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<TodoType[]>([]);
  const [filterStatus, setFilterStatus] = useState<Filter>(Filter.All);
  const [loadingError, setLoadingError] = useState(false);

  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }

    const loadTodos = async () => {
      try {
        const todos = await getTodos();

        setTodosFromServer(todos);
      } catch {
        setLoadingError(true);
      }
    };

    loadTodos();
  }, []);

  const preparedTodos = useMemo(
    () =>
      todosFromServer.filter(todo => {
        const { completed } = todo;

        switch (filterStatus) {
          case Filter.Active:
            return !completed;

          case Filter.Completed:
            return completed;

          default:
            return todo;
        }
      }),
    [todosFromServer, filterStatus],
  );

  const activeTodos = todosFromServer.filter(todo => !todo.completed);
  const isCompletedTodos = todosFromServer.some(todo => todo.completed);

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
              ref={inputElement}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
        {preparedTodos.map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </section>
        {!!todosFromServer.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodos.length} items left`}
            </span>
            <TodoFilter
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
   {/* this button should be disabled if there are no completed todos */}
   {isCompletedTodos && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>
      <ErrorMessage
        loadingError={loadingError}
        setLoadingError={setLoadingError}
      />
    </div>
  );
};
