/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { TodoList } from './components/TodoList';
import { addTodo, getTodos } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingError, setLoadingError] = useState('');
  const [validationError, setValidationError] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    getTodos()
      .then(todo => {
        setTodos(todo);
        setLoadingError('');
      })
      .catch(() => {
        // Clear any existing timeout before setting a new one
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setLoadingError('Unable to load todos');
        }, 3000);
      });

    return () => {
      // Cleanup timeout on component unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim()) {
      setValidationError('Title should not be empty');

      return;
    }

    addTodo(inputText)
      .then(newTodo => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
        setInputText('');
        setValidationError('');
      })
      .catch(() => {
        // Clear any existing timeout before setting a new one
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setLoadingError('Unable to add a todo');
        }, 3000);
      });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
            data-cy="ToggleAllButton"
          />

          <form onSubmit={handleAddTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              ref={inputRef}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
          </form>
        </header>

        <TodoList todos={todos} toggleTodo={toggleTodo} />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className="filter__link selected"
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className="filter__link"
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className="filter__link"
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(todo => !todo.completed)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${loadingError || validationError ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setLoadingError('');
            setValidationError('');
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          }}
        />
        {loadingError && <div>{loadingError}</div>}
        {validationError && <div>{validationError}</div>}
      </div>
    </div>
  );
};
