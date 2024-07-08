/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';

import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterTodos';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const [errorMassage, setErrorMassage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('all');
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  const [loadingTodoId, setLoadingTodoId] = useState<number | null>(null);
  // const [editingTitle, setEditingTitle] = useState('');
  const allCompleted = todos.every(todo => todo.completed);

  useEffect(() => {
    setLoading(true);
    todoService
      .getTodos()
      .then(todoFromServer => setTodos(todoFromServer))
      .catch(() => {
        setErrorMassage('Unable to load todos');
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }

    return;
  }, [error]);

  if (!todoService.USER_ID) {
    return <UserWarning />;
  }

  const filterTodos = todos.filter(todo => {
    switch (filter) {
      case FilterType.active:
        return !todo.completed;
      case FilterType.completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === '') {
      setErrorMassage('Title should not be empty');
      setError(true);

      return;
    }

    const newTodo = {
      userId: todoService.USER_ID,
      title: title,
      completed: false,
    };

    todoService
      .createTodo(newTodo)
      .then(newPost => {
        setTodos(currentPosts => [...currentPosts, newPost]);
      })
      .catch(() => {
        setErrorMassage('Unable to add a todo');
        setError(true);
      });
    setTitle('');
  };

  const handleComplitedToDo = (upTodo: Todo) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { id, title, completed } = upTodo;

    setLoadingTodoId(id);
    setLoadingCompleted(true);

    todoService
      .upDataTodo({ id, title, completed: !completed })
      .then(() => {
        setTodos(
          todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        );
      })

      .finally(() => {
        setLoadingCompleted(false);
        setLoadingTodoId(null);
      });
  };

  const deleteTodo = (id?: number) => {
    todoService.deleteTodo(id);

    setTodos(todos.filter(todo => todo.id !== id));
  };

  const closeErrorNotification = () => {
    setError(false);
  };

  function clearCompleated() {
    const completedTodos = todos.filter(todo => todo.completed);

    Promise.all(
      completedTodos.map(todo => todoService.deleteTodo(todo.id)),
    ).then(() => {
      setTodos(todos.filter(todo => !todo.completed));
    });
  }

  const updateTodo = (todo: Todo) => {
    // eslint-disable-next-line no-console
    console.log(todo);
    setShowUpdateInput(true);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${allCompleted && 'active'}`}
            data-cy="ToggleAllButton"
          />

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </form>
        </header>
        {filterTodos.map(todo => (
          <section key={todo.id} className="todoapp__main" data-cy="TodoList">
            <div
              data-cy="Todo"
              className={`todo ${todo.completed ? 'completed' : ''}`}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => handleComplitedToDo(todo)}
                />
              </label>

              {!showUpdateInput ? (
                <>
                  <div
                    data-cy="TodoLoader"
                    className={`modal overlay ${loadingCompleted && todo.id === loadingTodoId && 'is-active'}`}
                  >
                    <div
                      className="modal-background
                    has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>

                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() => updateTodo(todo)}
                  >
                    {todo.title}
                  </span>

                  {/* Remove button appears only on hover */}
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    ×
                  </button>
                </>
              ) : (
                <>
                  <form>
                    <input
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      value="Todo is being edited now"
                    />
                  </form>
                </>
              )}

              {loading && (
                <div data-cy="TodoLoader" className="modal overlay is-active">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              )}
            </div>
          </section>
        ))}

        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === FilterType.all ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setFilter(FilterType.all)}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filter === FilterType.active ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setFilter(FilterType.active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filter === FilterType.completed ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter(FilterType.completed)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!todos.some(todo => todo.completed)}
              onClick={clearCompleated}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={closeErrorNotification}
        />

        {errorMassage}
      </div>
    </div>
  );
};
