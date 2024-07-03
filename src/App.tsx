/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos, uploadTodo } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

enum Errors {
  LOAD_TODOS = 'Unable to load todos',
  VALIDATION = 'Title should not be empty',
  ADD = 'Unable to add a todo',
  DELETE = 'Unable to delete a todo',
  UPDATE = 'Unable to update a todo',
}

enum TodoStatus {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

const TodoStatusRoutes: Record<TodoStatus, string> = {
  [TodoStatus.All]: '/',
  [TodoStatus.Active]: '/active',
  [TodoStatus.Completed]: '/completed',
};

const emptyTodo: Omit<Todo, 'id'> = {
  completed: false,
  userId: USER_ID,
  title: '',
};

const errorDelay = 3000;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Omit<Todo, 'id'>>(emptyTodo);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<TodoStatus>(
    TodoStatus.All,
  );

  const closeErrorHandler = () => {
    setError('');
  };

  const filteringTodosByStatus = useMemo(() => {
    switch (selectedStatus) {
      case TodoStatus.Active:
        return [...todos].filter(todo => todo.completed === false);

      case TodoStatus.Completed:
        return [...todos].filter(todo => todo.completed === true);

      default:
        return [...todos];
    }
  }, [selectedStatus, todos]);

  const filteringTodosByActiveStatus = useMemo(
    () => [...todos].filter(todo => todo.completed === false).length,
    [todos],
  );

  const changeTodoHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError('');
      setNewTodo(current => ({
        ...current,
        title: e.target.value,
      }));
    },
    [],
  );

  const addTodo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');

      uploadTodo(newTodo)
        .then(todo => {
          setTodos(currentTodos => [...currentTodos, todo]);
          setNewTodo(emptyTodo);
        })
        .catch(() => {
          setError(Errors.ADD);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [newTodo],
  );

  const selectedHandler = useCallback((todoStatus: TodoStatus) => {
    setSelectedStatus(todoStatus);
  }, []);

  useEffect(() => {
    if (!error.length) {
      setTimeout(() => {
        setError('');
      }, errorDelay);
    }
  }, [error]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError(Errors.LOAD_TODOS));
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
          <form onSubmit={addTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo.title}
              onChange={changeTodoHandler}
              autoFocus
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteringTodosByStatus.map(todo => (
            <div
              data-cy="Todo"
              className={classNames('todo', {
                completed: todo.completed,
              })}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              <div
                data-cy="TodoLoader"
                className={classNames('modal overlay', {
                  'is-loading': isLoading,
                })}
              >
                <div className="modal-background has-background-white-ter" />
                {isLoading && <div className="loader" />}
              </div>
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {filteringTodosByActiveStatus} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              {Object.keys(TodoStatusRoutes).map(status => (
                <a
                  key={status}
                  href={`#${TodoStatusRoutes[status as TodoStatus]}`}
                  className={classNames('filter__link', {
                    selected: selectedStatus === status,
                  })}
                  data-cy={`FilterLink${status}`}
                  onClick={() => selectedHandler(status as TodoStatus)}
                >
                  {status}
                </a>
              ))}
            </nav>

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
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: error.length === 0 },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={closeErrorHandler}
        />
        {error}
      </div>
    </div>
  );
};
