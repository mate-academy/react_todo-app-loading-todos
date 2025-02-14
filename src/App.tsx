/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoItem } from './components/TodoItem/TodoItem';
import classNames from 'classnames';

function filterTodo(todos: Todo[], filterBy: string) {
  const copyTodos = [...todos];

  switch (filterBy) {
    case 'all':
      return copyTodos;
    case 'complete':
      return copyTodos.filter(t => t.completed);
    case 'active':
      return copyTodos.filter(t => !t.completed);
    default:
      return copyTodos;
  }
}

let timerForErrMessage = 0;

function setNewError(err: string, setState: (v: string) => void) {
  clearTimeout(timerForErrMessage);
  setState(err);
  timerForErrMessage = window.setTimeout(() => setState(''), 3000);
}

export const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [userTodos, setUserTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inputValue.trim().length === 0) {
      setNewError('Title should not be empty', setErrorMessage);

      return;
    }

    setErrorMessage('');
  }

  const visibleTodos = filterTodo(userTodos, filterBy);
  const todoInput = useRef<HTMLInputElement>(null);

  const {
    todosListNotEmpty,
    allTodosIsComlete,
    isCompleteTodo,
    countNotComplete,
  } = useMemo(() => {
    let complete = 0;
    let active = 0;

    userTodos.forEach(t => {
      if (t.completed) {
        complete++;
      } else {
        active++;
      }
    });

    return {
      todosListNotEmpty: userTodos.length > 0,
      allTodosIsComlete: userTodos.length === complete,
      isCompleteTodo: complete > 0,
      countNotComplete: active,
    };
  }, [userTodos]);

  useEffect(() => {
    todoInput.current?.focus();
    getTodos()
      .then(res => {
        setUserTodos(res);
      })
      .catch(() => {
        setNewError('Unable to load todos', setErrorMessage);
      });
  }, []); // get user todos

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todosListNotEmpty && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: allTodosIsComlete,
              })}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={submitForm}>
            <input
              ref={todoInput}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={e => setInputValue(e.currentTarget.value)}
            />
          </form>
        </header>

        {todosListNotEmpty && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {visibleTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {countNotComplete} items left
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={classNames('filter__link', {
                    selected: filterBy === 'all',
                  })}
                  data-cy="FilterLinkAll"
                  onClick={() => setFilterBy('all')}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames('filter__link', {
                    selected: filterBy === 'active',
                  })}
                  data-cy="FilterLinkActive"
                  onClick={() => setFilterBy('active')}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames('filter__link', {
                    selected: filterBy === 'complete',
                  })}
                  data-cy="FilterLinkCompleted"
                  onClick={() => setFilterBy('complete')}
                >
                  Completed
                </a>
              </nav>

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={!isCompleteTodo}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
