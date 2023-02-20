/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { FilterBy } from './types/FilterBy';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 6402;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);

  const getTodoFromServer = async (userId: number) => {
    try {
      const todosFromServer = await getTodos(userId);

      setTodos(todosFromServer);
    } catch (error) {
      throw new Error('Can`t load data from server');
    }
  };

  const visibleTodos = () => {
    const todosClone = todos;

    switch (filterBy) {
      case FilterBy.ACTIVE:
        return todosClone.filter(todo => todo.completed === false);

      case FilterBy.COMPLETED:
        return todosClone.filter(todo => todo.completed === true);

      case FilterBy.ALL:
        return todosClone;
      default:
        throw new Error('Unexpected filter type');
    }
  };

  useEffect(() => {
    getTodoFromServer(USER_ID);
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
          todos={visibleTodos()}
          setQuery={setQuery}
        />

        {visibleTodos && (
          <>
            <TodoList todos={visibleTodos()} />
            <Footer filterBy={filterBy} setFilterBy={setFilterBy} />
          </>
        )}
      </div>
    </div>
  );
};
