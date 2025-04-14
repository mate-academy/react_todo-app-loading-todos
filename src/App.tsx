/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { HeaderForm } from './components/HeaderForm/HeaderForm';
import { Footer } from './components/Footer/Footer';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [preparedTodos, setPreparedTodos] = useState<Todo[] | []>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('all');
  const [todosCounter, setTodosCounter] = useState(0);
  const shouldRenderFooter =
    !loading && !errorMessage && todos && todos.length > 0;

  const loadTodos = React.useCallback(() => {
    setLoading(true);
    getTodos()
      .then(fetchedTodo => {
        setTodos(fetchedTodo);
        setPreparedTodos(fetchedTodo);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        // showingError();
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    if (todos) {
      const notCompleted = todos.filter(todo => !todo.completed).length;

      setTodosCounter(notCompleted);
    }
  }, [todos, todosCounter, preparedTodos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <HeaderForm />

        {todos && !loading && (
          <TodoList
            preparedTodos={preparedTodos}
            setPreparedTodos={setPreparedTodos}
          />
        )}

        {shouldRenderFooter && (
          <Footer
            selected={selected}
            setSelected={setSelected}
            todosCounter={todosCounter}
            todos={todos}
            setTodos={setTodos}
            preparedTodos={preparedTodos}
            setPreparedTodos={setPreparedTodos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        // eslint-disable-next-line max-len
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !showError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setShowError(false)}
        />
        {errorMessage}
      </div>
    </div>
  );
};

// Unable to load todos

// Title should not be empty

// Unable to add a todo

// Unable to delete a todo

// Unable to update a todo
