/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Main } from './Components/Main';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { getFiltredTodos } from './utils/helpers';
import { FilterBy } from './types/FilterBy';
import { Notification } from './Components/Notification/Notification';

const USER_ID = 10904;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState(FilterBy.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then((todosFromServer: Todo[]) => {
        setTodos(todosFromServer);
      })
      .catch(() => setError('Unable to load toDos from server'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = getFiltredTodos(todos, filterBy);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <Main todos={visibleTodos} />

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
        )}
        {error && <Notification />}
      </div>
    </div>
  );
};
