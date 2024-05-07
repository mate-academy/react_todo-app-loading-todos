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
import { Errors } from './components/Errors/Errors';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
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
            ? prevTodos.map(
              todo => (todo.id === newTempId ? { ...Post } : todo), // eslint-disable-line prettier/prettier
            ) // eslint-disable-line prettier/prettier
            : [],
        );
        setError('');
      })

      .catch(() => setError('add'))
      .finally(() => {
        setLoader(false);
      });
  };

  const filteredTodos = todos.filter(todo => {
    if (filtered === Filter.active) {
      return !todo.completed;
    } else if (filtered === Filter.completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          input={input}
          setInput={setInput}
          setError={setError}
          setPosts={setPosts}
          todos={todos}
        />
        <Main todos={filteredTodos} loader={loader} tempId={tempId} />
        {todos.length > 0 && (
          <Footer
            todos={todos}
            setTodos={setTodos}
            filtered={filtered}
            setFiltered={setFiltered}
          />
        )}
      </div>

      <Errors error={error} setError={setError} />
    </div>
  );
};
