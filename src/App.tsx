import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { Header } from './Components/Header';
import { Loader } from './Components/Loader';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type Filter = 'all' | 'active' | 'completed';

function chooseActіveArray(filter: Filter, todos: Todo[]) {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredButton, setFilteredButton] = useState<Filter>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => setTodos(data))
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const completedTodos = todos.filter(todo => todo.completed === true);
  const todosLeft = todos.length - completedTodos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {isLoading ? (
          <Loader />
        ) : (
          <TodoList todos={chooseActіveArray(filteredButton, todos)} />
        )}

        {todos.length > 0 && (
          <Footer
            filteredButton={filteredButton}
            filterBy={setFilteredButton}
            todosLeft={todosLeft}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
        <br />
      </div>
    </div>
  );
};
