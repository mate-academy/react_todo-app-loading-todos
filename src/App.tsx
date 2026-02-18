/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todosServices from './api/todos';
import { Todo } from './types/Todo';
import { ErrorType } from './types/Error';
import classNames from 'classnames';
import { getTodosId } from './services/GetTodosID';
import { handleError } from './services/ErrorHandling';

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [, setIsLoading] = useState(false);

  const [all, setAll] = useState(true);
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  const todosCounter: number = useMemo(() => {
    return [...todosList].filter((todo: Todo) => todo.completed === false)
      .length;
  }, [todosList]);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const reset = () => {
    setErrorType(null);
    setTitle('');
  };

  const loadTodos = useCallback(() => {
    if (all) {
      todosServices
        .getTodos()
        .then((todos: Todo[]) => setTodosList(todos))
        .catch((error: Error) => {
          handleError(setErrorType, 'loading');
          throw error;
        });
    }

    if (active) {
      todosServices
        .getTodos()
        .then((todos: Todo[]) => {
          setTodosList(todos.filter(current => !current.completed));
        })
        .catch((error: Error) => {
          handleError(setErrorType, 'loading');
          throw error;
        });
    }

    if (completed) {
      todosServices
        .getTodos()
        .then((todos: Todo[]) => {
          setTodosList(todos.filter(current => current.completed));
        })
        .catch((error: Error) => {
          handleError(setErrorType, 'loading');
          throw error;
        });
    }
  }, [all, active, completed]);

  const addTodos = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    if (title.length <= 0) {
      handleError(setErrorType, 'empty');

      return;
    }

    const newTodos: Todo = {
      id: getTodosId(todosList),
      userId: todosServices.USER_ID,
      title: title,
      completed: false,
    };

    setActiveTodo(newTodos);

    todosServices
      .addTodos(newTodos)
      .then(() => {
        setTodosList(currentTodos => [...currentTodos, newTodos]);
        reset();
      })
      .catch((error: Error) => {
        handleError(setErrorType, 'add');
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
        setActiveTodo(null);
      });
  };

  const deleteTodo = (todoId: number) => {
    setIsLoading(true);
    todosServices
      .deleteTodos(todoId)
      .then(() => {
        setTodosList(currentTodos => {
          return currentTodos.filter(
            (currentTodo: Todo) => currentTodo.id !== todoId,
          );
        });
      })
      .catch((error: Error) => {
        handleError(setErrorType, 'delete');
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
        setActiveTodo(null);
      });
  };

  const completeTodo = (todo: Todo) => {
    const completedTodo: Todo = {
      ...todo,
      completed: !todo.completed,
    };

    setIsLoading(true);
    setActiveTodo(todo);

    todosServices
      .updateTodos(completedTodo)
      .then(() => {
        setTodosList(currentTodos => {
          const copiedTodo: Todo[] = [...currentTodos];
          const index: number = copiedTodo.findIndex(
            (current: Todo) => current.id === completedTodo.id,
          );

          copiedTodo.splice(index, 1, completedTodo);

          return copiedTodo;
        });
      })
      .catch((error: Error) => {
        handleError(setErrorType, 'update');
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
        setActiveTodo(null);
        loadTodos();
      });
  };

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  if (!todosServices.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todosList.length > 0 && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={addTodos}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={handleTitle}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todosList.map((todo: Todo) => {
            return (
              <div
                key={todo.id}
                data-cy="Todo"
                className={classNames('todo', { completed: todo.completed })}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => completeTodo(todo)}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => {
                    deleteTodo(todo.id);
                    setActiveTodo(todo);
                  }}
                >
                  ×
                </button>

                <div
                  data-cy="TodoLoader"
                  className={classNames('modal overlay', {
                    'is-active': todo.id === activeTodo?.id,
                  })}
                >
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
          {/* This is a completed todo */}
          {/* <div data-cy="Todo" className="todo completed"> */}
          {/* <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Completed Todo
            </span> */}

          {/* Remove button appears only on hover */}
          {/* <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button> */}

          {/* overlay will cover the todo while it is being deleted or updated */}
          {/* <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div> */}
          {/* </div> */}

          {/* This todo is an active todo */}
          {/* <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Not Completed Todo
            </span>
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}

          {/* This todo is being edited */}
          {/* <div data-cy="Todo" className="todo"> */}
          {/* <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label> */}

          {/* This form is shown instead of the title and remove button */}
          {/* <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div> */}
          {/* </div> */}

          {/* This todo is in loadind state */}
          {/* <div data-cy="Todo" className="todo"> */}
          {/* <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Todo is being saved now
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button> */}

          {/* 'is-active' class puts this modal on top of the todo */}
          {/* <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div> */}
          {/* </div> */}
        </section>

        {/* Hide the footer if there are no todos */}
        {todosList.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${todosCounter} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', { selected: all })}
                data-cy="FilterLinkAll"
                onClick={() => {
                  setAll(true);
                  setActive(false);
                  setCompleted(false);
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', { selected: active })}
                data-cy="FilterLinkActive"
                onClick={() => {
                  setAll(false);
                  setActive(true);
                  setCompleted(false);
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', { selected: completed })}
                data-cy="FilterLinkCompleted"
                onClick={() => {
                  setAll(false);
                  setActive(false);
                  setCompleted(true);
                }}
              >
                Completed
              </a>
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
          { hidden: !errorType },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorType(null)}
        />
        {/* show only one message at a time */}
        {errorType === 'loading' && 'Unable to load todos'}
        <br />
        {errorType === 'empty' && 'Title should not be empty'}
        <br />
        {errorType === 'add' && 'Unable to add a todo'}
        <br />
        {errorType === 'delete' && 'Unable to delete a todo'}
        <br />
        {errorType === 'update' && 'Unable to update a todo'}
      </div>
    </div>
  );
};
