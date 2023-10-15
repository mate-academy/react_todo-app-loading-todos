/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { TodoList } from '../TodoList';
import { UserWarning } from '../../UserWarning';
import * as todosServise from '../../api/todos';
import { Status } from '../../types/Status';
import { TodosContext } from '../TodosContext/TodosContext';

const USER_ID = 11667;

export const TodoApp: React.FC = () => {
  const {
    todos,
    setTodos,
    filter,
    setFilter,
  } = useContext(TodosContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [noCheckedTodosLength, setNoCheckedTodosLength] = useState(0);

  const todosCounter = () => todos.filter((todo) => !todo.completed);

  useEffect(() => {
    setLoading(true);

    todosServise.getTodos(USER_ID)
      .then(tod => {
        setTodos(tod);
        setNoCheckedTodosLength(tod.filter(
          (t) => t.completed !== true,
        ).length);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setLoading(false));
  }, [setTodos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className={cn('todoapp__toggle-all',
              { active: todosCounter().length !== todos.length })}
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </form>
        </header>

        {!loading && (
          <>
            <TodoList />

            {todosCounter().length > 0 && (
              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="TodosCounter">
                  {`${noCheckedTodosLength} items left`}
                </span>

                <nav className="filter" data-cy="Filter">
                  <a
                    href="#/"
                    data-cy="FilterLinkAll"
                    onClick={() => setFilter(Status.ALL)}
                    className={cn('filter__link',
                      { selected: filter === Status.ALL })}
                  >
                    All
                  </a>

                  <a
                    href="#/active"
                    data-cy="FilterLinkActive"
                    onClick={() => setFilter(Status.ACTIVE)}
                    className={cn('filter__link',
                      { selected: filter === Status.ACTIVE })}
                  >
                    Active
                  </a>

                  <a
                    href="#/completed"
                    data-cy="FilterLinkCompleted"
                    onClick={() => setFilter(Status.COMPLETED)}
                    className={cn('filter__link',
                      { selected: filter === Status.COMPLETED })}
                  >
                    Completed
                  </a>
                </nav>

                <button
                  type="button"
                  className="todoapp__clear-completed"
                  data-cy="ClearCompletedButton"
                >
                  Clear completed
                </button>
              </footer>
            )}
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/* Unable to load todos
          <br />
          Title should not be empty
          <br />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
        {errorMessage}
      </div>
    </div>
  );
};
