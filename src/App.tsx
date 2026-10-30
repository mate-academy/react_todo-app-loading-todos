/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { deleteTodos, getTodos, postTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

enum FilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>();
  const [inputField, setInputField] = useState('');

  const titileField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titileField.current) {
      titileField.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrorMessage(null);
    getTodos()
      .then(todo => {
        setTodos(todo);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => {
      setErrorMessage(null);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const hasCompleted = todos.some(todo => todo.completed);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const visibleTodos = todos.filter(todo => {
    if (filter === FilterStatus.All) {
      return true;
    }

    if (filter === FilterStatus.Active) {
      return todo.completed === false;
    }

    if (filter === FilterStatus.Completed) {
      return todo.completed === true;
    }
  });

  const filters = [
    { value: FilterStatus.All, label: 'All', href: '#/', cy: 'FilterLinkAll' },
    {
      value: FilterStatus.Active,
      label: 'Active',
      href: '#/active',
      cy: 'FilterLinkActive',
    },
    {
      value: FilterStatus.Completed,
      label: 'Completed',
      href: '#/completed',
      cy: 'FilterLinkCompleted',
    },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = inputField.trim();

    if (!trimmedTitle) {
      setErrorMessage('Title should not be empty');

      return;
    }

    const temporaryTodo: Todo = {
      id: 0,
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    };

    try {
      setIsSubmiting(true);
      setErrorMessage('');
      setTempTodo(temporaryTodo);
      const createdTodo = await postTodos({
        userId: USER_ID,
        title: trimmedTitle,
        completed: false,
      });

      setIsSubmiting(false);
      setTodos(prevTodo => [...prevTodo, createdTodo]);
      setInputField('');
      setTempTodo(null);
    } catch (error) {
      setErrorMessage('Unable to add todo');
      setTempTodo(null);
    } finally {
      setIsSubmiting(false);
      setTempTodo(null);
      setTimeout(() => {
        titileField.current?.focus();
      }, 0);
    }
  };

  function deleteTodo(todoId: number) {
    try {
      setIsSubmiting(true);
      deleteTodos(todoId).then(() => {
        setTodos(currentTodos =>
          currentTodos.filter(todo => todoId !== todo.id),
        );
      });
    } catch (error) {
      setErrorMessage('Unable to delete a todo');
    }
  }

  async function deleteCompletedTodo() {
    const completedTodo = todos.filter(todo => todo.completed);
    const completedIds = completedTodo.map(todo => todo.id);

    if (completedTodo.length === 0) {
      return;
    }

    const deletePromises = completedTodo.map(todo => deleteTodos(todo.id));

    try {
      const results = await Promise.allSettled(deletePromises);
      const failedIds: number[] = [];

      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          failedIds.push(completedIds[index]);
        }
      });

      setTodos(currentTodos =>
        currentTodos.filter(todo => {
          if (!completedIds.includes(todo.id)) {
            return true;
          }

          if (failedIds.includes(todo.id)) {
            return true;
          }

          return false;
        }),
      );

      if (failedIds.length > 0) {
        setErrorMessage('Unable to delete some todos');
      }
    } catch (error) {
      setErrorMessage('An error occurred while deleting tasks');
    }
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

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              ref={titileField}
              value={inputField}
              disabled={isSubmiting}
              onChange={event => {
                setInputField(event.target.value);
              }}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => (
            <div
              data-cy="Todo"
              key={todo.id}
              className={`todo ${todo.completed === true ? 'completed' : ''}`}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                />
              </label>

              {false ? (
                <form>
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value="Todo is being edited now"
                  />
                </form>
              ) : (
                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>
              )}

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => {
                  deleteTodo(todo.id);
                }}
              >
                ×
              </button>

              <div
                data-cy="TodoLoader"
                className={`modal overlay ${false ? 'is-active' : ''}`}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
          {tempTodo && (
            <div data-cy="Todo" className="todo">
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  disabled
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {tempTodo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              <div data-cy="TodoLoader" className="modal overlay is-active">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          )}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodosCount} ${activeTodosCount === 1 ? 'item' : 'items'} left`}
            </span>

            <nav className="filter" data-cy="Filter">
              {filters.map(({ value, label, href, cy }) => (
                <a
                  key={value}
                  href={href}
                  data-cy={cy}
                  className={`filtered__link ${filter === value ? 'selected' : ''}`}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompleted}
              onClick={deleteCompletedTodo}
            >
              Clear completed
            </button>
          </footer>
        )}

        <div
          data-cy="ErrorNotification"
          className={`notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}`}
        >
          <button data-cy="HideErrorButton" type="button" className="delete" />
          {errorMessage}
        </div>
      </div>
    </div>
  );
};
