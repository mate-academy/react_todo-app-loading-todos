/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './Components/ToDoList/ToDoList';
import { Notification } from './Components/errorNotification/errorNotification';

import { Todo } from './types/Todo';

import { getTodos } from './api/todos';
import { Footer } from './Components/Footer/Footer';

const USER_ID = 6340;

export enum FilterType {
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
        case FilterType.ACTIVE:
          return !todo.completed;

        case FilterType.COMPLETED:
          return todo.completed;

        default:
          return true;
      }
    })
    );
  }, [filterBy, todos]);

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
        {todos.length && (
          <>
            <header className="todoapp__header">

              <button type="button" className="todoapp__toggle-all active" />

              <form>
                <input
                  type="text"
                  className="todoapp__new-todo"
                  placeholder="What needs to be done?"
                />
              </form>
            </header>

            <TodoList todos={visibleTodos} />
            <Footer filterBy={filterBy} setFilterBy={setFilterBy} />
          </>
        )}
      </div>

      {isError && (
        <Notification />
      )}
    </div>
  );
};
