/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getTodos, updateTodo } from './api/todos';
import cn from 'classnames';
import { Todo } from './types/Todo';
import { TodoItem } from './TodoItem/TodoItem';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterState, setfilterState] = useState('all');
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasCompletedTodo = todos.some(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed).length;
  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterState) {
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        default:
          return todo;
      }
    });
  }, [todos, filterState]);

  function showError(message: string) {
    setErrorMessage(message);
    if (timerId.current !== null) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }

  function toggleTodo(newTodo: Todo) {
    return updateTodo({ ...newTodo, completed: !newTodo.completed })
      .then(updatedTodo => {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          ),
        );
      })
      .catch(() => {
        showError('Unable to update a todo');
      });
  }

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        showError('Unable to load todos');
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: todos.every(todo => todo.completed) === true,
            })}
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
        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => {
            return <TodoItem todo={todo} key={todo.id} onToggle={toggleTodo} />;
          })}
        </section>

        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodos} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: filterState === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setfilterState('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filterState === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setfilterState('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filterState === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setfilterState('completed')}
              >
                Completed
              </a>
            </nav>

            {hasCompletedTodo && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={!hasCompletedTodo}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
        {/* <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo*/}
      </div>
    </div>
  );
};
