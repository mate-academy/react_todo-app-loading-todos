/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

export type Filters = 'Completed' | 'Active' | 'All';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | undefined>();
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<Filters>('All');

  let filteredTodos: Todo[] | undefined = todos;

  const changeFilter = (name: Filters) => {
    setFilter(name);
  };

  filteredTodos = useMemo(() => {
    if (todos) {
      switch (filter) {
        case 'Completed':
          return filteredTodos?.filter(todo => todo.completed);

        case 'Active':
          return filteredTodos?.filter(todo => !todo.completed);

        case 'All':
          return todos;
      }
    }

    return undefined;
  }, [todos, filteredTodos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getTodos()
      .then(resp => {
        setTodos(resp);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <Main todos={filteredTodos} />

        {/* Hide the footer if there are no todos */}

        {todos && todos?.length > 0 && (
          <Footer
            count={todos.filter(todo => !todo.completed).length}
            setFilter={changeFilter}
            activeFilter={filter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification hidden={error} />
    </div>
  );
};
