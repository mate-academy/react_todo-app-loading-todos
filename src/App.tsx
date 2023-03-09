import React, { useEffect, useMemo, useState } from 'react';

import { getTodos } from './api/todos';

import { Errors } from './types/Errors';
import { Filters } from './types/Filters';
import { TodoType } from './types/TodoType';

import TodoList from './Components/TodoList/TodoList';
import Notification from './Components/Notification/Notification';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';

const USER_ID = 6535;

function filteredTodos(filter: Filters, todos: TodoType[]) {
  switch (filter) {
    case Filters.All:
      return todos;

    case Filters.ACTIVE:
      return todos.filter((todo: TodoType) => !todo.completed);

    case Filters.COMPLETED:
      return todos.filter((todo: TodoType) => todo.completed);

    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);
  const [filter, setFilter] = useState(Filters.All);

  const fetchingTodos = async () => {
    try {
      const response = await getTodos(USER_ID);

      setTodos(response);
    } catch (error) {
      setError(true);
      setErrorMessage(Errors.UPLOAD);
    }
  };

  useEffect(() => {
    fetchingTodos();
  }, []);

  const visibleTodos = useMemo(() => (
    filteredTodos(filter, todos)
  ), [todos, filter]);

  const closeError = () => {
    setError(false);
  };

  const changeFilter = (value: Filters) => {
    if (value === filter) {
      return;
    }

    setFilter(value);
  };

  const completedTodosLength = useMemo(() => {
    return visibleTodos.filter(todo => todo.completed).length;
  }, [visibleTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          completedTodosLength={completedTodosLength}
          todosLength={todos.length}
        />

        <section className="todoapp__main">
          <TodoList todos={visibleTodos} />
        </section>

        {todos.length > 0 && (
          <Footer
            filter={filter}
            changeFilter={changeFilter}
            completedTodosLength={completedTodosLength}
          />
        )}
      </div>

      <Notification
        isError={isError}
        errorMessage={errorMessage}
        closeError={closeError}
      />
    </div>
  );
};
