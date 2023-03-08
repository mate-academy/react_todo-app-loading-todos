import React, { useEffect, useState } from 'react';

import { getTodos } from './api/todos';

import { Errors } from './types/Errors';
import { Filters } from './types/Filters';
import { TodoType } from './types/TodoType';

import TodoList from './Components/TodoList/TodoList';
import Notification from './Components/Notification/Notification';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';

const USER_ID = 6535;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<TodoType[]>([]);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);
  const [filter, setFilter] = useState(Filters.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(res => setTodos(res))
      .catch(() => {
        setError(true);
        setErrorMessage(Errors.UPLOAD);
      });
  }, []);

  useEffect(() => {
    let result: TodoType[];

    switch (filter) {
      case Filters.All:
        result = todos;

        break;
      case Filters.ACTIVE:
        result = todos.filter(todo => !todo.completed);

        break;
      case Filters.COMPLETED:
        result = todos.filter(todo => todo.completed);

        break;
      default:
        result = todos;
    }

    setVisibleTodos(result);
  }, [filter, todos]);

  const closeError = () => {
    setError(false);
  };

  const changeFilter = (value: Filters) => {
    if (value === filter) {
      return;
    }

    setFilter(value);
  };

  const completedTodosLength = visibleTodos
    .filter(todo => todo.completed).length;

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
