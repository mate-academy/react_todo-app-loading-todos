import React, { useState, useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoFilter } from './types/TodoFilter';
import { Errors } from './Components/Errors/Errors';
import { Header } from './Components/Header/Header';
import { TodoList } from './Components/TodoList/TodoList';
import { Footer } from './Components/Footer/Footer';

const USER_ID = 10959;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [
    todosFilterBy,
    setTodosFilterBy,
  ] = useState<TodoFilter>(TodoFilter.ALL);
  const [isErrorNotification, setIsErrorNotification] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then((todo) => setTodos(todo))
      .catch(() => setIsErrorNotification(true));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (todosFilterBy) {
        case TodoFilter.ACTIVE:
          return !todo.completed;

        case TodoFilter.COMPLETED:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [todosFilterBy, todos]);

  const isActiveTodos = useMemo(() => {
    return todos.filter((todo) => !todo.completed);
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} isActive={isActiveTodos.length} />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />

            <Footer
              filterBy={todosFilterBy}
              isActive={isActiveTodos}
              setFilterBy={setTodosFilterBy}
            />
          </>
        )}
      </div>

      {isErrorNotification && (
        <Errors
          isError={isErrorNotification}
          setError={setIsErrorNotification}
        />
      )}
    </div>
  );
};
