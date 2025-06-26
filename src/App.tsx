/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { createRef, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoItem } from './components/TodoItem';

type FilterStatus = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filterBy, setFilterBy] = useState<FilterStatus>('all');

  const newTodoFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos()
      .then(initialTodos => {
        setTodos(initialTodos);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    const filterTodos = todos.filter(todo => {
      if (filterBy === 'active') {
        return !todo.completed;
      } else if (filterBy === 'completed') {
        return todo.completed;
      } else {
        return true;
      }
    });

    setVisibleTodos(filterTodos);
  }, [todos, filterBy]);

  useEffect(() => {
    if (newTodoFieldRef.current) {
      newTodoFieldRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  const activeTodosCount = () => {
    const filterActives = todos.filter(todo => !todo.completed);

    return filterActives.length;
  };

  const allTodosCompleted = () => {
    const everyCompleted = todos.every(todo => todo.completed);

    return everyCompleted; // true / false
  };

  const onToggleTodo = (todoId: number) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const onClickFilterChange = (status: FilterStatus) => {
    setFilterBy(status);
  };

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
            className={`todoapp__toggle-all ${allTodosCompleted() ? 'active' : ''}`}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              ref={newTodoFieldRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TransitionGroup>
            {visibleTodos.map(todo => {
              const nodeRef = createRef<HTMLDivElement>();

              return (
                <CSSTransition
                  key={todo.id}
                  nodeRef={nodeRef}
                  timeout={300}
                  classNames="item"
                >
                  <div ref={nodeRef}>
                    <TodoItem todo={todo} onToggle={onToggleTodo} />
                  </div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodosCount()} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filterBy === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={e => {
                  e.preventDefault();
                  onClickFilterChange('all');
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filterBy === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={e => {
                  e.preventDefault();
                  onClickFilterChange('active');
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filterBy === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={e => {
                  e.preventDefault();
                  onClickFilterChange('completed');
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
        className={`
          notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}
          `}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
