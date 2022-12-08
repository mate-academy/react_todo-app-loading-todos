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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user: User | null = useContext(AuthContext);
  const [data, setData] = useState();
  const newTodoField = useRef<HTMLInputElement>(null);

  // console.log(user);
  // console.log(user.id);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    const fetchTodos = async () => {
      const todos = await getTodos(user.id);

      setData(todos);
    };

    fetchTodos();
  }, []);

  // console.log(dataUrl)

  const handleChange = (event: any) => {
    setData(event.target.value);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          data={data}
          handleChange={handleChange}
          newTodoField={newTodoField}
          // handleSubmit={handleSubmit}
        />
        {data && (
          <Main data={data} />
        )}

        {data && (
          <Footer />
        )}

      </div>

      <Error />
    </div>
  );
};

// const BASE_URL = 'https://mate.academy/students-api/todos';
// const request = (url: any) => {
//   return fetch(`${BASE_URL}${url}`)
//     .then(response => {
//       return response.json();
//     })
//     .then(result => result);
// };

// const getTodos = () => request('/todos.json');

// getTodos()
// .then(todos => {
//   setDataUrl(todos);
// });
// .finally(() => {
//   setIsLoaded(false);
// });
// }, []);

// getTodos(user.Id)
//   .then(todos => {
//     setData(todos);
//   });
