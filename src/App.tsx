/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Status } from './types/Status';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [filter, setFilter] = useState<Status>(Status.All);

  const addInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromSever => {
        setTodos(todosFromSever);
        addInputRef.current?.focus();
      })
      .catch(() => {
        setErrorMsg('Unable to load todos');

        setTimeout(() => {
          setErrorMsg('');
        }, 3000);
      });
  }, []);

  const allAreCompleted = todos.every(todo => todo.completed);
  const hasTodos = todos.length > 0;

  return !USER_ID
    ? <UserWarning />
    : (
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={cn('todoapp__toggle-all', { active: allAreCompleted })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              ref={addInputRef}
            />
          </form>
        </header>

        {hasTodos && (
          <div className="todoapp__content">
            <section className="todoapp__main" data-cy="TodoList">
              <TodoList todos={todos} filter={filter} />
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <TodoFilter
                filter={filter}
                onFilterChange={setFilter}
                todos={todos}
              />
            </footer>
          </div>
        )}

        <div
          data-cy="ErrorNotification"
          className={
            cn('notification is-danger is-light has-text-weight-normal', {
              hidden: !errorMsg,
            })
          }
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setErrorMsg('')}
          />
          {errorMsg}
        </div>
      </div>
    );
};
