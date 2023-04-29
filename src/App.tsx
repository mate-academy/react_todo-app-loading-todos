import React, { useEffect, useState, useMemo } from 'react';

import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Todos } from './components/Todos';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { FilteredBy } from './types/FilteredBy';

const USER_ID = 9964;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [filteredBy, setFilteredBy] = useState<FilteredBy>(FilteredBy.All);
  const [isCompletedPresent, setCompletedPresent] = useState(false);
  const [isLoadingError, setLoadingError] = useState(false);
  let timerId = 0;

  async function getTodoList() {
    setDataLoaded(false);
    setLoadingError(false);

    try {
      const todoList = await getTodos(USER_ID);

      setTodos(todoList);
      setCompletedPresent(todoList.some(todo => todo.completed));
    } catch (error) {
      setLoadingError(true);
      timerId = window.setTimeout(() => setLoadingError(false), 3000);
    } finally {
      setDataLoaded(true);
    }
  }

  const visibleTodos = useMemo(() => {
    if (!todos) {
      return null;
    }

    switch (filteredBy) {
      case FilteredBy.All:
        return todos;

      case FilteredBy.Completed:
        return todos.filter(todo => todo.completed);

      case FilteredBy.Active:
        return todos.filter(todo => !todo.completed);

      default:
        return null;
    }
  }, [filteredBy, todos]);

  useEffect(() => {
    getTodoList();
  }, []);

  const setFilter = (value: FilteredBy) => {
    setFilteredBy(value);
  };

  const removeNotification = () => {
    setLoadingError(false);
    window.clearTimeout(timerId);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!!todos?.length && isDataLoaded && (
          <>
            <section className="todoapp__main">
              <Todos
                todos={visibleTodos}
              />
            </section>

            <Footer
              setFilter={setFilter}
              filteredBy={filteredBy}
              todoAmount={todos?.length}
              isCompletedPresent={isCompletedPresent}
            />
          </>
        )}
      </div>

      <Notification
        isLoadingError={isLoadingError}
        removeNotification={removeNotification}
      />
    </div>
  );
};
