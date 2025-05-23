/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
//#region imports
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorNotifications } from './types/ErrorNotifications';
import { FilterBy } from './types/FIlterBy';
//#endregion
export const App: React.FC = () => {
  //#region states
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorType, setErrorType] = useState<ErrorNotifications | null>(null);
  const [filterBy, setFilterBy] = useState(FilterBy.all);
  //#endregion

  useEffect(() => {
    setErrorType(null);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorType(ErrorNotifications.loadingTodos);
      });
  }, []);

  const filteredTodos = useMemo((): Todo[] => {
    if (todos === null) {
      return [];
    }

    switch (filterBy) {
      case FilterBy.active:
        return todos.filter(todo => !todo.completed);
      case FilterBy.completed:
        return todos.filter(todo => todo.completed);
      default:
        return [...todos];
    }
  }, [todos, filterBy]);

  const todosLength = useMemo((): boolean => !!todos.length, [todos]);

  const closeNotification = useCallback(() => {
    setErrorType(null);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todosLength={todosLength} />

        {filteredTodos && <TodoList todos={filteredTodos} />}

        {/* Hide the footer if there are no todos */}
        {todos && <Footer filterBy={filterBy} changeFilterBy={setFilterBy} />}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorType={errorType}
        closeNotification={closeNotification}
      />
    </div>
  );
};
