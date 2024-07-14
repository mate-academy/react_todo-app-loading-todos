/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';

import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { getTodos, USER_ID } from './api/todos';
import { Footer } from './components/Footer/Footer';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  //const [loading, setLoading] = useState(false);
  const [statusOfTodos, setStatusOfTodos] = useState(Status.all);

  function loadTodos() {
    //setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => {});
  }

  if (errorMessage) {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }

  useEffect(() => {
    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleCloseBtn = () => {
    setErrorMessage('');
  };

  let filteredTodos = todos;

  if (statusOfTodos === Status.active) {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }

  if (statusOfTodos === Status.completed) {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList todos={filteredTodos} />
          {!!todos.length && (
            <Footer
              todos={todos}
              setStatusOfTodos={setStatusOfTodos}
              statusOfTodos={statusOfTodos}
            />
          )}
        </section>
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${errorMessage ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleCloseBtn}
        />
        {/* show only one message at a time */}
        {errorMessage}
        {/* Unable to load todos */}
        {/* <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
