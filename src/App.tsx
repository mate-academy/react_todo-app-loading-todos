/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Main } from './components/main';
import { Error } from './components/error';
import { getTodos } from './api/todos';
import { User } from './types/User';

export const App: React.FC = () => {
  const user: User | null = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const newTodoField = useRef<HTMLInputElement>(null);
  const [error] = useState(false);

  const fetchTodos = async () => {
    if (user) {
      const todos: any = await getTodos(user.id);

      setData(todos);
    }
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    fetchTodos();
  }, []);

  const handleChange = (event: any) => {
    setQuery(event.target.value);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          query={query}
          handleChange={handleChange}
          newTodoField={newTodoField}
        />
        {data && (
          <Main data={data} />
        )}

        {data && (
          <Footer />
        )}

      </div>
      {error && (
        <Error />
      )}

    </div>
  );
};
