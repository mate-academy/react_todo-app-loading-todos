/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  getTodoError,
  todosService,
  TodosServiceError,
} from './api/todos';
import { Todo } from './types/Todo';
import { TodoItem } from './components/TodoItem';
import { ErrorNotification } from './components/ErrorNotification';
import { useErrorMessage } from './hooks/useErrorMessage';
import { StatusFilter, TodoStatus } from './components/StatusFilter';
import cn from 'classnames';
// import { has } from 'cypress/types/lodash';

function getFilteredTodos(todos: Todo[], { status }: { status: TodoStatus }) {
  let filteredTodos = todos;

  if (status !== TodoStatus.All) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (status) {
        case TodoStatus.Completed:
          return todo.completed;
        case TodoStatus.Active:
          return !todo.completed;
        default:
          throw new Error('Missing case in getFilteredTodos status filter');
      }
    });
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<TodoStatus>(TodoStatus.All);

  const { error, setError, resetErrorMessage } = useErrorMessage();

  useEffect(() => {
    resetErrorMessage();
    setLoading(true);

    todosService
      .list()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => {
        setError(getTodoError(TodosServiceError.UnableToLoadTodos));
      })
      .finally(() => setLoading(false));
  }, [resetErrorMessage, setError]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const showTodosAndFooter = todos.length > 0;
  const showToggleAllButton = todos.length > 0;

  const filteredTodos = getFilteredTodos(todos, { status: statusFilter });
  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);
  const activeTodosCount = activeTodos.length;

  const allCompleted = completedTodos.length === todos.length;
  const hasCompleted = completedTodos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {showToggleAllButton && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: allCompleted,
              })}
              data-cy="ToggleAllButton"
              disabled={loading}
            />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              disabled={loading}
              autoFocus
            />
          </form>
        </header>

        {showTodosAndFooter && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </section>

            {todos.length > 0 && (
              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="TodosCounter">
                  {activeTodosCount} items left
                </span>

                <StatusFilter
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                />

                <button
                  type="button"
                  className="todoapp__clear-completed"
                  data-cy="ClearCompletedButton"
                  disabled={!hasCompleted}
                >
                  Clear completed
                </button>
              </footer>
            )}
          </>
        )}
      </div>

      <ErrorNotification notification={error} onClose={resetErrorMessage} />
    </div>
  );
};
