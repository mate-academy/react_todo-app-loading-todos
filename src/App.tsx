/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoHeader } from './components/TodoHeader';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { Notification } from './components/Notification';
import { FilterBy } from './types/FilterBy';
import { Errors } from './types/Errors';

const USER_ID = 11246;
const URL_GET = `/todos?userId=${USER_ID}`;
const DELAY_ERROR = 3000;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.all);
  const [error, setError] = useState<Errors | null>(null);

  const applyFilter = (filter: FilterBy) => {
    setFilterBy(filter);
  };

  const todosToRender = todos.filter(todo => {
    switch (filterBy) {
      case FilterBy.active:
        return !todo.completed;
      case FilterBy.completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const activeTodos = todos.filter(todo => !todo.completed).length;

  const completedTodos = todos.filter(todo => todo.completed).length;

  useEffect(() => {
    client.get<Todo[]>(URL_GET)
      .then(dTodos => setTodos(dTodos))
      .catch(() => setError(Errors.load));
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), DELAY_ERROR);
    }
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoHeader />
        {todos.length > 0 && (
          <>
            <section className="todoapp__main">
              <TodoList todos={todosToRender} />
            </section>
            <TodoFooter
              onChangeFilter={applyFilter}
              filterSelected={filterBy}
              activeTodos={activeTodos}
              completedTodos={completedTodos}
            />
          </>
        )}
      </div>
      {error && (
        <Notification
          message={error}
          close={() => setError(null)}
        />
      )}
    </div>
  );
};
