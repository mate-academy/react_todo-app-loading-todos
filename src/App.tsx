import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { Todos } from './components/Todos/Todos';
import { FilterEnum } from './app.constants';
import { Filter } from './components/Filter/Filter';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>();
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(FilterEnum.All);

  useEffect(() => {
    if (user) {
      setErrorMessage('');

      (async () => {
        try {
          const filterOptions = {
            [FilterEnum.All]: '',
            [FilterEnum.Active]: '&completed=true',
            [FilterEnum.Completed]: '&completed=false',
          };

          const res = await client.get<Todo[]>(
            `/todos?userId=${user.id}${filterOptions[filter]}`,
          );

          if (res.length) {
            setTodos(res);
          }
        } catch {
          setErrorMessage('Unable to load a todos');
        }
      })();
    }
  }, [user, filter]);

  const handleErrorClosing = () => (setErrorMessage(''));

  const showFooter = filter !== FilterEnum.All || Boolean(todos);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos && (
          <Todos todos={todos} />
        )}

        {showFooter && (
          <Footer
            activeTodos={todos?.filter(todo => !todo.completed).length || 0}
          >
            <Filter
              selectedFilter={filter}
              onFilterChange={setFilter}
            />
          </Footer>
        )}
      </div>

      {Boolean(errorMessage) && (
        <ErrorNotification
          message={errorMessage}
          onClose={handleErrorClosing}
          key={errorMessage}
        />
      )}
    </div>
  );
};
