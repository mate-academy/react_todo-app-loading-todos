/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { getFiltredTodos } from './utils/getFiltredTodos';
import { FilterStatus } from './types/FilterStatus';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer/Footer';
import { Error } from './types/Error';
import cn from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(FilterStatus.All);

  const filtredTodos = getFiltredTodos(todos, selectedFilter);
  const title = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos()
      .then(res => setTodos(res))
      .catch(() => setError(Error.UnableLoad))
      .finally(() => {
        setTimeout(() => {
          setError('');
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header title={title}/>
        <TodoList todos={filtredTodos} />

        {todos.length !== 0 && (
          <Footer
            todos={todos}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />)}

      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {error}
      </div>
    </div>
  );
};
