/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { AddNewTodo } from './components/AddNewTodo/AddNewTodo';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [errorMessage, setErrorMessage] = useState('');
  const [filterQuery, setFilterQuery] = useState('all');

  // LOAD TODOs
  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  // FILTER TODOs
  const filteredTodos = useMemo(() => {
    switch (filterQuery) {
      case 'active': {
        return todos.filter(todo => !todo.completed);
      }

      case 'completed': {
        return todos.filter(todo => todo.completed);
      }

      default: {
        return todos;
      }
    }
  }, [filterQuery, todos]);

  // COUNT TODOs
  const activeTodoCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const completedTodoCount = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  // INITIAL CHECK FOR USER ID REGISTRATION
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            // ToggleAllButton button has `active` class only if all todos are completed
            className={cn('todoapp__toggle-all', {
              active: completedTodoCount && completedTodoCount === todos.length,
            })}
            data-cy="ToggleAllButton"
          />

          <AddNewTodo />
        </header>

        <TodoList todos={filteredTodos} />

        {/* The Footer is shown ONLY when there are any todos to be listed */}
        {todos.length > 0 && (
          <Footer
            activeTodoCount={activeTodoCount}
            completedTodoCount={completedTodoCount}
            filterQuery={filterQuery}
            setFilterQuery={setFilterQuery}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
