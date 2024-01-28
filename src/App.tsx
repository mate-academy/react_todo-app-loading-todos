import React, { useEffect, useMemo, useState } from 'react';

import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { getTodos } from './api/todos';

const USER_ID = 52;

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Todo[]>([])
  const [errorLoad, setErrorLoad] = useState<boolean>(false)
  const [filter, setFilter] = useState('all');

  if (!USER_ID) {
    return <UserWarning />;
  }

  useEffect(() => {
    getTodos(USER_ID)
      .then((todos) => setPosts(todos))
      .catch(() => setErrorLoad(true));
  }, []);

  const visibleTodos = useMemo(() => {
    return posts.filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default: return true;
      }
    });
  }, [posts, filter]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <Main posts={visibleTodos} />
        {posts.length > 0 && (
          <Footer
            posts={posts}
            setPosts={setPosts}
            filter={filter}
            setFilter={setFilter}
          />)}
      </div>

      {errorLoad && (<div
        data-cy="ErrorNotification"
        className={
          classNames('notification is-danger is-light has-text-weight-normal', {
            'hidden': !errorLoad,
          })
        }
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorLoad(false)}
        />
        {/* show only one message at a time */}
        Unable to load todos
        {/* <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>)}
    </div>
  );
};
