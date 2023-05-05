/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/todoList';
import { TodoForm } from './components/todoForm';
import { TodoFooter } from './components/todoFooter';
import { Notification } from './components/notification';
import { FilterBy } from './types/FilterBy';

const USER_ID = 10221;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then((fetchedTodos: Todo[]) => {
        setTodos(fetchedTodos);
      })
      .catch((fetchedError) => {
        setError(
          fetchedError?.message
            ? fetchedError.message
            : 'Something went wrong',
        );
      });
  }, []);

  function getFilterCallback(filterType: FilterBy) {
    switch (filterType) {
      case FilterBy.ACTIVE:
        return (todo: Todo) => !todo.completed;

      case FilterBy.COMPLETED:
        return (todo: Todo) => todo.completed;

      default:
        return (todo: Todo) => !!todo.id;
    }
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm />

        {todos.length ? (
          <>
            <TodoList
              todos={todos.filter(getFilterCallback(filterBy))}
            />
            <TodoFooter
              setFilterBy={setFilterBy}
              itemsQuantity={todos.filter(getFilterCallback(filterBy)).length}
            />
          </>
        ) : null}
      </div>

      <Notification
        onClose={(value: string | null) => setError(value)}
        error={error}
      />
    </div>
  );
};
