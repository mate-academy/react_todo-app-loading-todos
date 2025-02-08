import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoList from './components/TodoList';
import ErrorHandler from './components/ErrorHandler';

enum ErrorMessages {
  UnableToLoad = 'Unable to load todos',
}

export enum Filters {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const completedTodos = todos.filter((todo: Todo) => todo.completed);

  function getVisibleTodos() {
    return todos.filter(todo => {
      switch (selectedFilter) {
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        case 'all':
        default:
          return true;
      }
    });
  }

  const visibleTodos = getVisibleTodos();

  useEffect(() => {
    getVisibleTodos();
  }, [todos, selectedFilter]);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);

    setTimeout(() => {
      setError('');
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then((res: Todo[]) => setTodos(res))
      .catch(() => handleError(ErrorMessages.UnableToLoad));
  }, []);

  const handleChangeFilter = (filter: string) => setSelectedFilter(filter);

  const lengthOfUncompletedTodos = todos.length - completedTodos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        <TodoList visibleTodos={visibleTodos} />
        {todos.length && (
          <Footer
            lengthOfUncompletedTodos={lengthOfUncompletedTodos}
            handleChangeFilter={handleChangeFilter}
            completedTodos={completedTodos}
            selectedFilter={selectedFilter}
          />
        )}
      </div>

      <ErrorHandler error={error} />
    </div>
  );
};
