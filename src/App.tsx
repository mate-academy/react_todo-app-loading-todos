/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';

type Filter = 'all' | 'active' | 'completed';

type TempTodo = Omit<Todo, 'id'> & { id: number };

const TEMP_TODO_ID = 0;

const getFilterFromHash = (): Filter => {
  switch (window.location.hash) {
    case '#/active':
      return 'active';

    case '#/completed':
      return 'completed';

    default:
      return 'all';
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(getFilterFromHash);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [tempTodo, setTempTodo] = useState<TempTodo | null>(null);
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const newTodoField = useRef<HTMLInputElement>(null);
  const editTodoField = useRef<HTMLInputElement>(null);
  const errorTimerId = useRef<number | null>(null);

  const hideError = React.useCallback(() => {
    setErrorMessage('');

    if (errorTimerId.current) {
      window.clearTimeout(errorTimerId.current);
      errorTimerId.current = null;
    }
  }, []);

  const showError = React.useCallback(
    (message: string) => {
      hideError();
      setErrorMessage(message);

      errorTimerId.current = window.setTimeout(() => {
        setErrorMessage('');
        errorTimerId.current = null;
      }, 3000);
    },
    [hideError],
  );

  const markTodoAsLoading = (todoId: number) => {
    setLoadingTodoIds(currentIds => [...currentIds, todoId]);
  };

  const unmarkTodoAsLoading = (todoId: number) => {
    setLoadingTodoIds(currentIds => currentIds.filter(id => id !== todoId));
  };

  useEffect(() => {
    const handleHashChange = () => setFilter(getFilterFromHash());

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    hideError();

    getTodos()
      .then(setTodos)
      .catch(() => showError('Unable to load todos'));

    return () => {
      if (errorTimerId.current) {
        window.clearTimeout(errorTimerId.current);
      }
    };
  }, [hideError, showError]);

  useEffect(() => {
    newTodoField.current?.focus();
  }, [todos.length, tempTodo, errorMessage]);

  useEffect(() => {
    editTodoField.current?.focus();
  }, [editingTodoId]);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filter]);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.length - activeTodosCount;
  const allTodosCompleted = todos.length > 0 && activeTodosCount === 0;
  const isAdding = Boolean(tempTodo);

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = newTodoTitle.trim();

    if (!trimmedTitle) {
      showError('Title should not be empty');

      return;
    }

    hideError();
    setTempTodo({
      id: TEMP_TODO_ID,
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    });

    createTodo(trimmedTitle)
      .then(todo => {
        setTodos(currentTodos => [...currentTodos, todo]);
        setNewTodoTitle('');
      })
      .catch(() => showError('Unable to add a todo'))
      .finally(() => setTempTodo(null));
  };

  const handleDeleteTodo = (todoId: number) => {
    hideError();
    markTodoAsLoading(todoId);

    deleteTodo(todoId)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        );
      })
      .catch(() => showError('Unable to delete a todo'))
      .finally(() => unmarkTodoAsLoading(todoId));
  };

  const handleUpdateTodo = (todoToUpdate: Todo, data: Partial<Todo>) => {
    hideError();
    markTodoAsLoading(todoToUpdate.id);

    return updateTodo(todoToUpdate.id, data)
      .then(updatedTodo => {
        setTodos(currentTodos =>
          currentTodos.map(todo =>
            todo.id === todoToUpdate.id ? updatedTodo : todo,
          ),
        );
      })
      .catch(() => {
        showError('Unable to update a todo');
      })
      .finally(() => unmarkTodoAsLoading(todoToUpdate.id));
  };

  const handleToggleTodo = (todo: Todo) => {
    void handleUpdateTodo(todo, { completed: !todo.completed });
  };

  const handleToggleAll = () => {
    const nextCompleted = !allTodosCompleted;
    const todosToUpdate = todos.filter(
      todo => todo.completed !== nextCompleted,
    );

    todosToUpdate.forEach(todo => {
      void handleUpdateTodo(todo, { completed: nextCompleted });
    });
  };

  const startEditing = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setEditingTitle(todo.title);
  };

  const stopEditing = () => {
    setEditingTodoId(null);
    setEditingTitle('');
  };

  const handleRenameTodo = (todo: Todo) => {
    const trimmedTitle = editingTitle.trim();

    if (!trimmedTitle) {
      handleDeleteTodo(todo.id);
      stopEditing();

      return;
    }

    if (trimmedTitle === todo.title) {
      stopEditing();

      return;
    }

    void handleUpdateTodo(todo, { title: trimmedTitle }).then(() => {
      stopEditing();
    });
  };

  const handleClearCompleted = () => {
    todos
      .filter(todo => todo.completed)
      .forEach(todo => {
        handleDeleteTodo(todo.id);
      });
  };

  const renderTodo = (todo: Todo | TempTodo) => {
    const isTemp = todo.id === TEMP_TODO_ID;
    const isLoading = isTemp || loadingTodoIds.includes(todo.id);
    const isEditing = editingTodoId === todo.id;

    return (
      <div
        key={todo.id || 'temp-todo'}
        data-cy="Todo"
        className={`todo ${todo.completed ? 'completed' : ''}`}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            disabled={isLoading || isTemp}
            onChange={() => !isTemp && handleToggleTodo(todo)}
          />
        </label>

        {isEditing && !isTemp ? (
          <form
            onSubmit={event => {
              event.preventDefault();
              handleRenameTodo(todo);
            }}
          >
            <input
              ref={editTodoField}
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={editingTitle}
              onChange={event => setEditingTitle(event.target.value)}
              onBlur={() => handleRenameTodo(todo)}
              onKeyUp={event => {
                if (event.key === 'Escape') {
                  stopEditing();
                }
              }}
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => !isTemp && startEditing(todo)}
            >
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              disabled={isLoading || isTemp}
              onClick={() => !isTemp && handleDeleteTodo(todo.id)}
            >
              ×
            </button>
          </>
        )}

        <div
          data-cy="TodoLoader"
          className={`modal overlay ${isLoading ? 'is-active' : ''}`}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    );
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${
                allTodosCompleted ? 'active' : ''
              }`}
              data-cy="ToggleAllButton"
              onClick={handleToggleAll}
            />
          )}

          <form onSubmit={handleAddTodo}>
            <input
              ref={newTodoField}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              disabled={isAdding}
              onChange={event => setNewTodoTitle(event.target.value)}
            />
          </form>
        </header>

        {(todos.length > 0 || tempTodo) && (
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map(renderTodo)}
            {tempTodo && renderTodo(tempTodo)}
          </section>
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodosCount} ${
                activeTodosCount === 1 ? 'item' : 'items'
              } left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${
                  filter === 'active' ? 'selected' : ''
                }`}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${
                  filter === 'completed' ? 'selected' : ''
                }`}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedTodosCount === 0}
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          errorMessage ? '' : 'hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={hideError}
        />
        {errorMessage}
      </div>
    </div>
  );
};
