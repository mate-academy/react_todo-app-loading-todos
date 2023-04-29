/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Notification } from './components/Notification';
import { Filter } from './utils/Filter';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Error } from './utils/Error';
import { Loader } from './components/Loader';

const USER_ID = 9934;

const visibleTodos = (todos: Todo[], selectedFilter: Filter) => {
  switch (selectedFilter) {
    case Filter.Active:
      return todos.filter((todo) => !todo.completed);
    case Filter.Completed:
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState(Error.NoError);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError(Error.Updating))
      .finally(() => setIsLoading(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodoItems = visibleTodos(todos, selectedFilter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {isLoading ? <Loader /> : <TodoList todos={visibleTodoItems} />}

        {(!!todos.length) && (
          <Footer
            visibleTodos={visibleTodoItems}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        )}
      </div>

      {error && <Notification message={error} />}
    </div>
  );
};
