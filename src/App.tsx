/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const input = useRef<HTMLInputElement>(null);
  const hideErrorTimer = useRef<number | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [title, setTitle] = useState('');
  const [deletingTodoIds, setDeletingTodoIds] = useState<number[]>([]);
  const [loadingError, setLoadingError] = useState({
    queryError: false,
    addError: false,
    todosError: false,
    deleteError: false,
    updateError: false,
  });

  const clearError = useCallback(() => {
    if (hideErrorTimer.current) {
      clearTimeout(hideErrorTimer.current);
      hideErrorTimer.current = null;
    }

    setLoadingError({
      queryError: false,
      addError: false,
      todosError: false,
      deleteError: false,
      updateError: false,
    });
  }, []);

  const showError = useCallback(
    (errorType: keyof typeof loadingError) => {
      if (hideErrorTimer.current) {
        clearTimeout(hideErrorTimer.current);
      }

      setLoadingError(prev => ({ ...prev, [errorType]: true }));
      hideErrorTimer.current = window.setTimeout(() => {
        clearError();
        hideErrorTimer.current = null;
      }, 3000);
    },
    [clearError],
  );

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosFromServer = (await getTodos()) as Todo[];

        setTodos(todosFromServer.slice(0, 6));
        if (input.current) {
          input.current.focus();
        }
      } catch (error) {
        showError('todosError');
      }
    };

    fetchTodos();
  }, [showError]);

  const filterTodos = useCallback((todosList: Todo[], filterBy: string) => {
    if (filterBy === 'active') {
      return todosList.filter(item => !item.completed);
    } else if (filterBy === 'completed') {
      return todosList.filter(item => item.completed);
    }

    return todosList;
  }, []);

  const visibleTodos = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter, filterTodos],
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    filterBy: string,
  ) => {
    event.preventDefault();
    setFilter(filterBy);
  };

  const anyExistingError =
    loadingError.queryError ||
    loadingError.addError ||
    loadingError.todosError ||
    loadingError.deleteError ||
    loadingError.updateError;

  const removeTodo = (id: number) => {
    setDeletingTodoIds(prev => [...prev, id]);
    setTimeout(() => {
      setTodos(prevTodos => prevTodos.filter(item => item.id !== id));
      setDeletingTodoIds(prev => prev.filter(todoId => todoId !== id));
    }, 200);
  };

  const complateTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const complateAllTodo = () => {
    if (todos.every(item => item.completed)) {
      setTodos(prevTodos =>
        prevTodos.map(item => ({ ...item, completed: false })),
      );
    } else {
      setTodos(prevTodos =>
        prevTodos.map(item => ({ ...item, completed: true })),
      );
    }
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(item => !item.completed));
  };

  const checkTodoCompleted = useCallback(() => {
    return todos.some(item => item.completed);
  }, [todos]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim().length === 0) {
      showError('addError');

      return;
    }

    const newTodoId = Date.now();

    setTodos(prevTodos => [
      ...prevTodos,
      { id: newTodoId, title, completed: false, userId: USER_ID },
    ]);
    setDeletingTodoIds(prev => [...prev, newTodoId]);
    setTitle('');
    clearError();
    setTimeout(() => {
      setDeletingTodoIds(prev => prev.filter(todoId => todoId !== newTodoId));
    }, 300);
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
              className={
                todos.every(item => item.completed)
                  ? 'todoapp__toggle-all active'
                  : 'todoapp__toggle-all'
              }
              data-cy="ToggleAllButton"
              onClick={complateAllTodo}
            />
          )}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              value={title}
              ref={input}
              onChange={handleTitleChange}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todoItem => (
            <div
              data-cy="Todo"
              className={`todo ${todoItem.completed ? 'completed' : ''}`}
              key={todoItem.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todoItem.completed}
                  onClick={() => complateTodo(todoItem.id)}
                />
              </label>
              <span data-cy="TodoTitle" className="todo__title">
                {todoItem.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => removeTodo(todoItem.id)}
              >
                ×
              </button>
              <div
                data-cy="TodoLoader"
                className={`modal overlay ${deletingTodoIds.includes(todoItem.id) ? 'is-active' : ''}`}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(item => !item.completed).length} items left
            </span>
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={event => handleClick(event, 'all')}
              >
                All
              </a>
              <a
                href="#/active"
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={event => handleClick(event, 'active')}
              >
                Active
              </a>
              <a
                href="#/completed"
                className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={event => handleClick(event, 'completed')}
              >
                Completed
              </a>
            </nav>
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={clearCompleted}
              disabled={!checkTodoCompleted() && todos.length > 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${anyExistingError ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={clearError}
        />
        {loadingError.todosError && (
          <>
            Unable to load todos
            <br />
          </>
        )}
        {loadingError.queryError && (
          <>
            Title should not be empty
            <br />
          </>
        )}
        {loadingError.addError && (
          <>
            Unable to add a todo
            <br />
          </>
        )}
        {loadingError.deleteError && (
          <>
            Unable to delete a todo
            <br />
          </>
        )}
        {loadingError.updateError && 'Unable to update a todo'}
      </div>
    </div>
  );
};
