/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoFilter } from './types/TodoFilter';
import { ErrorNotification } from './types/ErrorNotification';
import { getTodos } from './api/todos';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { TodoError } from './components/TodoError/TodoError';
import { Todo } from './types/Todo';

const USER_ID = 10644;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoFilter, setTodoFilter] = useState<TodoFilter>(TodoFilter.ALL);
  const [errorNotification, setErrorNotification]
    = useState<ErrorNotification>(ErrorNotification.NONE);
  const [search, setSearch] = useState('');

  const initialTodos = useMemo(() => {
    return (todos.filter(todo => {
      switch (todoFilter) {
        case TodoFilter.ACTIVE:
          return !todo.completed;
        case TodoFilter.COMPLETED:
          return todo.completed;
        default:
          return todo;
      }
    }));
  }, [todoFilter, todos]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosData = await getTodos(USER_ID);

        setTodos(todosData);
      } catch (error) {
        setErrorNotification(ErrorNotification.LOAD);
      }
    };

    fetchData();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          search={search}
          setSearch={setSearch}
        />

        {todos.length > 0 && (
          <>
            <TodoList todos={initialTodos} />
            <Footer
              todos={initialTodos}
              todoFilter={todoFilter}
              setTodoFilter={setTodoFilter}
            />
          </>
        )}
      </div>

      {errorNotification && (
        <TodoError
          errorNotification={errorNotification}
          closeError={() => setErrorNotification(ErrorNotification.NONE)}
        />
      )}
    </div>
  );
};
