/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';

import type { Todo } from './types/Todo';
import type { FilterType } from './types/FilterType';

import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import ErrorNotification from './components/ErrorNotification';

import './styles/index.scss';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = React.useState<FilterType>('all');
  const [errorMessage, setErrorMessage] = React.useState('');

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(error => {
        /* eslint-disable no-console */
        console.error('Error fetching todos:', error);
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [errorMessage]);

  const visibleTodos = React.useMemo(() => {
    switch (selectedFilter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'all':
      default:
        return todos;
    }
  }, [todos, selectedFilter]);

  // function handleSubmit() {

  // }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              // onSubmit={() => handleSubmit()}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && <TodoList todos={visibleTodos} />}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        )}
      </div>

      <ErrorNotification
        message={errorMessage || 'Unable to load todos'}
        hidden={!errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
