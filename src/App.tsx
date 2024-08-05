import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TodoList } from './components/TodoList';
import { addTodo, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';

enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const [loadingError, setLoadingError] = useState('');
  const [validationError, setValidationError] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const [filterSelected, setFilterSelected] = useState(Filter.All);

  const filterTodos = useMemo(() => {
    switch (filterSelected) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filterSelected]);

  useEffect(() => {
    getTodos()
      .then(todo => {
        setTodos(todo);
        setLoadingError('');
      })
      .catch(() => {
        setLoadingError('Unable to load todos');
        setTimeout(() => {
          setLoadingError('');
        }, 3000);
      });

    // Установить фокус на input поле после загрузки
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  //#region function
  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const toggleTodoAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prevTodos =>
      prevTodos.map(todo => ({ ...todo, completed: !allCompleted })),
    );
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim()) {
      setValidationError('Title should not be empty');

      setTimeout(() => {
        setValidationError('');
      }, 3000);

      return;
    }

    addTodo(inputText)
      .then(newTodo => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
        setInputText('');
        setValidationError('');
      })
      .catch(() => {
        setLoadingError('Unable to add a todo');

        setTimeout(() => {
          setLoadingError('');
        }, 3000);
      });
  };

  const clearErrors = () => {
    setLoadingError('');
    setValidationError('');
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };
  //#endregion

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
            data-cy="ToggleAllButton"
            onClick={toggleTodoAll}
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

        <TodoList todos={filterTodos} toggleTodo={toggleTodo} />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: filterSelected === Filter.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilterSelected(Filter.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filterSelected === Filter.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilterSelected(Filter.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filterSelected === Filter.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterSelected(Filter.Completed)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(todo => !todo.completed)}
              onClick={clearCompleted}
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
          onClick={clearErrors}
        />
        {loadingError && <div>{loadingError}</div>}
        {validationError && <div>{validationError}</div>}
      </div>
    </div>
  );
};
