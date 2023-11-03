/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filters } from './types/Filters';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Error } from './components/Error';

const USER_ID = 11839;

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState(Filters.All);
  const [isErrorActive, setIsErrorActive] = useState<boolean>(false);

  const getFilteredTodos = (filterBy: Filters) => {
    let filteredTodos: Todo[] = [...todosFromServer];

    if (filterBy === Filters.Active) {
      filteredTodos = todosFromServer.filter((todo) => !todo.completed);
    }

    if (filterBy === Filters.Completed) {
      filteredTodos = todosFromServer.filter((todo) => todo.completed);
    }

    return filteredTodos;
  };

  const onFilterChange = (newFilter: Filters) => {
    setFilter(newFilter);
  };

  const preparedTodos = getFilteredTodos(filter);
  const errors = { error };

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => setTodosFromServer(data))
      .catch((err: Error) => {
        setError(err.message);
        setIsErrorActive(true);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todosFromServer={todosFromServer} />
        <TodoList preparedTodos={preparedTodos} />

        {(preparedTodos.length || filter !== Filters.All)
          && (
            <Footer
              todosFromServer={todosFromServer}
              filter={filter}
              onFilterChange={onFilterChange}
            />
          )}

        <Error
          errors={errors}
          isErrorActive={isErrorActive}
          setIsErrorActive={setIsErrorActive}
        />
      </div>
    </div>
  );
};
