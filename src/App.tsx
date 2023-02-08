/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

enum FilterQuery {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterQuery, setFilterQuery] = useState(FilterQuery.All);
  const user = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      return;
    }

    getTodos(user.id)
      .then(loadedTodos => {
        setTodos(loadedTodos);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  const filteredTodos = [...todos].filter(todo => {
    switch (filterQuery) {
      case FilterQuery.Active:
        return !todo.completed;
      case FilterQuery.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList
          todos={filteredTodos}
        />

        <Footer
          filteredItemsCount={filteredTodos.length}
          onFilterChange={setFilterQuery}
          filterQuery={filterQuery}
        />
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onErrorMessage={setErrorMessage}
      />
    </div>
  );
};
