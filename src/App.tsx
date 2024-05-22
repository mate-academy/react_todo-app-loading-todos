/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { getFilteredTodos } from './utils/getFiltredTodos';
import { FilterStatus } from './types/FilterStatus';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer/Footer';
import { Error } from './types/Error';
import cn from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(FilterStatus.All);

  const filteredTodos = getFilteredTodos(todos, selectedFilter);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos()
      .then(res => setTodos(res))
      .catch(() => setError(Error.UnableLoad))
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timeout = setTimeout(() => setError(''), 3000)

    return () => clearTimeout(timeout);
  }, [error])

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header inputRef={inputRef} todos={todos} />
        <TodoList todos={filteredTodos} />

        {todos.length !== 0 && (
          <Footer
            todos={todos}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>
    </div>
  );
};
