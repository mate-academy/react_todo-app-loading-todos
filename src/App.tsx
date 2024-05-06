/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, setPost } from './api/todos';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Filter } from './types/filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [tempId, setTempId] = useState<number>(0);
  const [filtered, setFiltered] = useState(Filter.all);

  useEffect(() => {
    getTodos()
      .then(todoses => {
        setTodos(todoses);
      })
      .catch(() => setError('load'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const setPosts = (newPost: Omit<Todo, 'id'>) => {
    setLoader(true);

    const newTempId = Math.floor(Math.random() * 1000000);

    setTempId(newTempId);

    setTodos(prevTodos => [
      ...(prevTodos || []),
      { ...newPost, id: newTempId },
    ]);

    setInput('');

    setPost(newPost)
      .then(Post => {
        setTodos(prevTodos =>
          prevTodos
            ? prevTodos.map(todo =>
                todo.id === newTempId ? { ...Post } : todo,
              )
            : [],
        );
        setError('');
      })

      .catch(() => setError('add'))
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          input={input}
          setInput={setInput}
          setError={setError}
          setPosts={setPosts}
          todos={todos || []}
        />
        <Main todos={todos} loader={loader} tempId={tempId} />
        {todos && (
          <Footer
            todos={todos}
            setTodos={setTodos}
            filtered={filtered}
            setFiltered={setFiltered}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        hidden={error === ''}
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {/* show only one message at a time */}
        {error === 'load' && (
          <div>
            Unable to load todos
            <br />
          </div>
        )}

        {error === 'empty' && (
          <div>
            Title should not be empty
            <br />
          </div>
        )}

        {error === 'add' && (
          <div>
            Unable to add a todo
            <br />
          </div>
        )}

        {error === 'delete' && (
          <div>
            Unable to delete a todo
            <br />
          </div>
        )}

        {error === 'update' && (
          <div>
            Unable to update a todo
            <br />
          </div>
        )}
      </div>
    </div>
  );
};
