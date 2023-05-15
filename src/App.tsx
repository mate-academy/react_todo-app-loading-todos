/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Sort } from './utils/enums';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { Header } from './components/Header';

const USER_ID = 10284;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sort, setSort] = useState(Sort.All);
  const [hasError, setHasError] = useState(false);

  const loadTodos = async () => {
    try {
      const todoList = await getTodos(USER_ID);

      setTodos(todoList);
    } catch {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = todos.filter(todo => {
    switch (sort) {
      case Sort.Active: return !todo.completed;
      case Sort.Completed: return todo.completed;
      default: return todos;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header todos={visibleTodos} />

        <TodoList todos={visibleTodos} />

        {todos.length > 0 && (
          <Footer
            todos={visibleTodos}
            filter={sort}
            setSort={setSort}
          />
        )}
      </div>

      {hasError && (
        <ErrorNotification setHasError={setHasError} />
      )}

    </div>
  );
};
