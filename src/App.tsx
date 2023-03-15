/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';

import { UserWarning } from './UserWarning';
import { Notification } from './components/Notification/Notification';

import { Todo } from './types/Todo';

import { getTodos } from './api/todos';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';

const USER_ID = 6476;

export enum SortType {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState('All');
  const [isError, setIsError] = useState(true);

  const visibleTodos = useMemo(() => {
    return (todos.filter((todo) => {
      switch (filterBy) {
        case SortType.ALL:
          return todos;

        case SortType.ACTIVE:
          return !todo.completed;

        case SortType.COMPLETED:
          return todo.completed;

        default:
          return [];
      }
    })
    );
  }, [filterBy, todos]);

  const noCompleteTodos = todos.some((todo) => !todo.completed);

  const loadTodosData = async () => {
    try {
      setIsError(false);
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    loadTodosData();
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              noCompleteTodos={noCompleteTodos}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />
          </>
        )}
      </div>

      {isError && (
        <Notification />
      )}

    </div>
  );
};
