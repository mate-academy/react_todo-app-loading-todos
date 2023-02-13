/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { FilterBy } from './types/FilterBy';
import { warningTimer } from './utils/warningTimer';
import { TodoInfo } from './components/TodoInfo';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header';
import { Notification } from './components/Notification';

const USER_ID = 6316;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [hasError, setHasError] = useState(false);
  const hasActiveTodos = todos.some(todo => todo.completed === false);
  const hasCompletedTodos = todos.some(todo => todo.completed === true);

  useEffect(() => {
    const onLoadGetTodos = async () => {
      try {
        const todosData = await getTodos(USER_ID);

        setTodos(todosData);
      } catch (error) {
        setHasError(true);
        warningTimer(setHasError, false, 3000);
      }
    };

    onLoadGetTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    const filteredTodos = todos.filter(todo => {
      switch (filterBy) {
        case FilterBy.ACTIVE:
          return !todo.completed;
        case FilterBy.COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    });

    return filteredTodos;
  }, [todos, filterBy]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header hasActiveTodos={hasActiveTodos} />

        <section className="todoapp__main">
          {visibleTodos.map(todo => (
            <TodoInfo key={todo.id} todo={todo} />
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {!!todos.length && (
          <Footer
            quantity={todos.length}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            hasCompletedTodos={hasCompletedTodos}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      <Notification
        hasError={hasError}
        setHasError={setHasError}
      />
    </div>
  );
};
