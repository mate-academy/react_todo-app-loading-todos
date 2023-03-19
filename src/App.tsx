/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';
import { TodoList } from './components/TodoList';
import { ToggleButton } from './components/ToggleButton';
import { ErrorTypes } from './types/ErrorTypes';
import { FilterCases } from './types/FilterCases';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';

const USER_ID = 6683;
const url = `/todos?userId=${USER_ID}`;

const filterByStatus = (
  todos: Todo[],
  filter: FilterCases,
) => {
  switch (filter) {
    case FilterCases.Active:
      return todos.filter(({ completed }) => !completed);

    case FilterCases.Completed:
      return todos.filter(({ completed }) => completed);

    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterCases.All);
  const [error, setError] = useState(ErrorTypes.None);

  useEffect(() => {
    setTimeout(() => {
      setError(ErrorTypes.None);
    }, 3000);
  }, [error]);

  useEffect(() => {
    const fetchTodos = async () => {
      setTodos(await client.get<Todo[]>(url));
    };

    fetchTodos();
  }, []);

  const handleFilterUpdate = (newFilter: FilterCases) => {
    setFilter(newFilter);
  };

  const handleNotificationClose = () => {
    setError(ErrorTypes.None);
  };

  const filteredArray = useMemo(() => {
    return filterByStatus(todos, filter);
  }, [filter, todos]);

  const amountOfItemsLeft = todos
    .filter(({ completed }) => !completed).length;

  const isAllTodosActive = amountOfItemsLeft === 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length && (
            <ToggleButton isActive={isAllTodosActive} />
          )}

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          <TodoList todos={filteredArray} />
        </section>

        {todos.length && (
          <Footer
            amountOfItemsLeft={amountOfItemsLeft}
            amountOfItems={todos.length}
            currentFilter={filter}
            handleLinkClick={handleFilterUpdate}
          />
        )}
      </div>

      <Notification
        message={error}
        onButtonClick={handleNotificationClose}
      />
    </div>
  );
};
