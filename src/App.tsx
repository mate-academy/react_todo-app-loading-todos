/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [preparedTodos, setPreparedTodos] = useState<Todo[] | []>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('all');
  const [todosCounter, setTodosCounter] = useState(0);
  const blockError = useRef<HTMLDivElement>(null);
  const shouldRenderFooter =
    !loading && !errorMessage && todos && todos.length > 0;

  function showingError() {
    if (blockError) {
      blockError.current?.classList.remove('hidden');
    }

    setTimeout(() => {
      if (!blockError.current?.classList.contains('hidden')) {
        blockError.current?.classList.add('hidden');
      }
    }, 3000);
  }

  const loadTodos = React.useCallback(() => {
    setLoading(true);
    getTodos()
      .then(fetchedTodo => {
        setTodos(fetchedTodo);
        setPreparedTodos(fetchedTodo);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        showingError();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    if (todos) {
      const notCompleted = todos.filter(todo => !todo.completed).length;

      setTodosCounter(notCompleted);
    }
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  function filterBy(filter: string = 'all'): Todo[] | [] {
    switch (filter) {
      case 'active':
        setPreparedTodos((currentTodos: Todo[] | []) =>
          currentTodos.filter(
            (currentTodo: Todo) => currentTodo.completed === false,
          ),
        );
        setSelected('active');

        return preparedTodos;

      case 'completed':
        setPreparedTodos((currentTodos: Todo[] | []) =>
          currentTodos.filter(
            (currentTodo: Todo) => currentTodo.completed === true,
          ),
        );
        setSelected('completed');

        return preparedTodos;

      case 'all':
        setPreparedTodos(todos || []);
        setSelected('all');

        return preparedTodos;

      default:
        return preparedTodos;
    }
  }

  function clearCompleted(todosItems: Todo[]): void {
    const cleanedTodos = todosItems.filter(
      todoItem => todoItem.completed !== true,
    );

    setTodos(cleanedTodos);
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

        {todos && !loading && (
          <TodoList
            preparedTodos={preparedTodos}
            setPreparedTodos={setPreparedTodos}
          />
        )}

        {shouldRenderFooter && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todosCounter} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${selected === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => {
                  filterBy();
                  setSelected('all');
                }}
              >
                All
              </a>
              <a
                href="#/active"
                className={`filter__link ${selected === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => filterBy('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${selected === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => filterBy('completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => clearCompleted(todos ?? [])}
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
        // eslint-disable-next-line max-len
        className="notification is-danger is-light has-text-weight-normal hidden"
        ref={blockError}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => blockError.current?.classList.add('hidden')}
        />
        {errorMessage}
      </div>
    </div>
  );
};

// Unable to load todos

// Title should not be empty

// Unable to add a todo

// Unable to delete a todo

// Unable to update a todo
