/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';

import { USER_ID, getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

import { UserWarning } from './UserWarning';
import { Error } from './components/Error';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

const getFilteredTodos = (todos: Todo[], filter: FilterType): Todo[] => {
  const visibleTodos = [...todos];

  switch (filter) {
    case FilterType.ACTIVE:
      return visibleTodos.filter(todo => !todo.completed);
    case FilterType.COMPLETED:
      return visibleTodos.filter(todo => todo.completed);
    default:
      return visibleTodos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState(FilterType.ALL);
  const [error, setError] = useState('');

  const filteredTodos = getFilteredTodos(todos, filterType);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        setTimeout(() => setError(''), 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filterType={filterType}
            onChangeType={setFilterType}
          />
        )}
      </div>

      <Error error={error} setError={setError} />
    </div>
  );
};
