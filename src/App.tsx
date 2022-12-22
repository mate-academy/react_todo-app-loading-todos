/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { NewTodoField } from './components/Auth/NewTodoField/NewTodoField';
import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');
  const hasTodos = todos.length > 0;
  const [filterBy, setFilterBy] = useState<string>('All');

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (!user) {
      return;
    }

    getTodos(user.id)
      .then(response => {
        setTodos(response);
      })
      .catch(reject => {
        setError(`${reject}`);
        const timeout = setTimeout(() => setError(''), 3000);

        return () => {
          clearTimeout(timeout);
          setError('');
        };
      });
  }, []);

  const visibleTodos = todos.filter(todo => {
    switch (filterBy) {
      case 'Completed':
        return todo.completed === true;
      case 'Active':
        return todo.completed === false;
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {hasTodos && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className="todoapp__toggle-all active"
            />
          )}
          <NewTodoField
            newTodoField={newTodoField}
          />
        </header>
        <section className="todoapp__main" data-cy="TodoList">
          <TodoList todos={visibleTodos} />
        </section>
      </div>
      <Footer
        todos={todos}
        setFilterBy={setFilterBy}
        filterBy={filterBy}

      />
      <ErrorNotification
        error={error}
        setError={setError}
      />
    </div>
  );
};
