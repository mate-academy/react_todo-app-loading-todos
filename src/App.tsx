/* eslint-disable jsx-a11y/control-has-associated-label */
import './styles/todoapp.scss'
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer/footer';
import { FilterStatus } from './types/FilterStatus';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';
import { ErrorNotification } from './components/Error/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [todoLoadError, setTodoLoadError] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );

  const handleGetTodos = () => {
    setTodoLoadError(false);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setTodoLoadError(true);
        setTimeout(() => {
          setTodoLoadError(false);
        }, 3000);
        throw new Error();
      });
  };

  const visibleTodos = todos?.filter(todo => {
    switch (filterStatus) {
      case FilterStatus.All:
        return todo;

      case FilterStatus.Active:
        return !todo.completed;

      case FilterStatus.Completed:
        return todo.completed;

      default:
        return;
    }
  });

  useEffect(() => {
    handleGetTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <section className="todoapp__main" data-cy="TodoList">
          {/* This is a completed todo */}
          <TodoList visibleTodos={visibleTodos} />
        </section>

        {todos && todos.length > 0 && (
          <Footer
            todos={todos}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        )}
      </div>

      <ErrorNotification todoLoadError={todoLoadError} />
    </div>
  );
};
