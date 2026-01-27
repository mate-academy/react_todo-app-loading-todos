/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import cn from 'classnames';
import { FilterOptions } from './types/filterOptions';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');

  const [filter, setFilter] = useState<FilterOptions>('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    }

    if (filter === 'active') {
      return !todo.completed;
    }

    return true;
  });

  useEffect(() => {
    setError('');

    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeTodo = todos.every(todo => todo.completed);

  const hasCompletedTodos = todos.some(todo => todo.completed);

  const activeTodoCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header activeTodo={activeTodo} />

        {todos.length > 0 && <TodoList todos={filteredTodos} />}
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            filter={filter}
            setFilter={setFilter}
            hasCompletedTodos={hasCompletedTodos}
            activeTodoCount={activeTodoCount}
          />
        )}
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
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>
    </div>
  );
};
