import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { HeaderForm } from './components/HeaderForm/HeaderForm';
import { Footer } from './components/Footer/Footer';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredBy, setFilteredBy] = useState(Filter.All);
  const [todosCounter, setTodosCounter] = useState(0);
  const shouldRenderFooter =
    !loading && !errorMessage && todos && todos.length > 0;

  const loadTodos = useCallback(() => {
    setLoading(true);
    getTodos()
      .then(fetchedTodo => {
        setTodos(fetchedTodo);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filteredBy) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filteredBy]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    if (todos) {
      const notCompleted = todos.filter(todo => !todo.completed).length;

      setTodosCounter(notCompleted);
    }
  }, [todos, todosCounter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <HeaderForm />

        {todos && !loading && <TodoList filteredTodos={filteredTodos} />}

        {shouldRenderFooter && (
          <Footer
            filteredBy={filteredBy}
            setFilteredBy={setFilteredBy}
            todosCounter={todosCounter}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
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

// Title should not be empty

// Unable to add a todo

// Unable to delete a todo

// Unable to update a todo
