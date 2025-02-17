/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Status } from './types/Status';
import { TodoList } from './components/Todolist';
import { Error } from './types/Error';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(Status.All);
  const [errorMessage, setErrorMessage] = useState('');

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos()
      .then(res => setTodos(res))
      .catch(() => setErrorMessage(Error.UnableLoadTodos))
      .finally(() => {
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
    titleField.current?.focus();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header titleField={titleField} />
        <TodoList todos={todos} selectedFilter={selectedFilter} />

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
        className={`notification is-danger is-light has-text-weight-normal ${!errorMessage && 'hidden'}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errorMessage}
      </div>
    </div>
  );
};
