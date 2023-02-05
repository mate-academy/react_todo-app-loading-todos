/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { ErrorPanel } from './components/ErrorPanel';

import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 6160;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [isEditing] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'active' | 'completed'
  >('all');

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const onFilterAll = () => {
    setSelectedFilter('all');
    setFilteredTodos(todos);
  };

  const onFilterActive = () => {
    setSelectedFilter('active');
    setFilteredTodos(activeTodos);
  };

  const onFilterCompleted = () => {
    setSelectedFilter('completed');
    setFilteredTodos(completedTodos);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setFilteredTodos(todosFromServer);
        setError('');
      })
      .catch(() => {
        setError('There was an error loading the content');
        setShowError(true);
      });
  }, []);

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }, [showError]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <>
          <Main isEditing={isEditing} filteredTodos={filteredTodos} />
          <Footer
            activeTodos={activeTodos}
            completedTodos={completedTodos}
            filteredTodos={filteredTodos}
            onFilterActive={onFilterActive}
            onFilterAll={onFilterAll}
            onFilterCompleted={onFilterCompleted}
            selectedFilter={selectedFilter}
          />
        </>

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {error && (
        <ErrorPanel
          errorMessage={error}
          showError={showError}
          clearError={() => setShowError(false)}
        />
      )}

    </div>
  );
};
