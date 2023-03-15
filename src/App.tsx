import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { TodoNotification } from './components/TodoNotification';
import { getTodos } from './api/todos';
import { FilteredBy } from './types/FilteredBy';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 6662;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [filterBy, setFilterBy] = useState<FilteredBy>(FilteredBy.ALL);
  const [isError, setIsError] = useState(false);

  const getTodosFromServer = async (userId: number) => {
    try {
      const todosFromServer = await getTodos(userId);

      setTodos(todosFromServer);
    } catch (error) {
      setIsError(true);
      throw new Error('Data can`t be load from server');
    }
  };

  const getVisibleTodos = () => {
    switch (filterBy) {
      case FilteredBy.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilteredBy.COMPLETED:
        return todos.filter(todo => todo.completed);
      case FilteredBy.ALL:
        return [...todos];
      default:
        throw new Error('Unexpected filter type');
    }
  };

  useEffect(() => {
    getTodosFromServer(USER_ID);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          query={query}
          todos={getVisibleTodos()}
          setQuery={setQuery}
        />

        {getVisibleTodos && (
          <>
            <TodoList
              todos={getVisibleTodos()}
            />
            <Footer
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />
          </>
        )}
      </div>
      {isError && (
        <TodoNotification setError={setIsError} />
      )}
    </div>
  );
};
