/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Error } from './components/Error/Error';
import { Filter } from './components/Filter/Filter';
import { Item } from './components/Todo/Todo';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 123111;

export const App: React.FC = () => {
  const [listTodo, setListTodo] = useState<Todo[]>([]);
  const [error, setError] = useState('');

  const getListTodo = useCallback(async (filter?: boolean) => {
    try {
      const result = await getTodos(USER_ID, filter);

      setListTodo(result);
    } catch (e) {
      setError('Something were wrong, please try again later');
    }
  }, []);

  useEffect(() => {
    getListTodo();
  }, []);

  const clearError = useCallback(() => setError(''), []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {
            listTodo.map((el: Todo) => <Item todo={el} key={el.id} />)
          }
        </section>

        {listTodo.length > 0
          ? (
            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${listTodo.length} items left`}
              </span>

              <Filter setFilter={getListTodo} />

              {/* don't show this button if there are no completed todos */}
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            </footer>
          ) : ''}
      </div>

      {error && <Error errorText={error} errorClear={clearError} />}
    </div>
  );
};
