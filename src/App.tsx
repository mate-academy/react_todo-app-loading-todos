/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import ErrorToast from './components/ErrorToast';
import TodoFooter from './components/TodoFooter';
import TodoItem from './components/TodoItem';
import { Todo, TodoStatus } from './types/Todo';

const USER_ID = 11033;

export const App: React.FC = () => {
  const [todosContainer, setTodosContainer] = useState<Todo[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(TodoStatus.All);
  const [errorMessage, setErrorMessage] = useState('');

  const completedTodos = useMemo(() => {
    return todosContainer.filter(todo => todo.completed);
  }, [todosContainer]);

  const todos = useMemo(() => {
    return todosContainer.filter(todo => {
      switch (selectedStatus) {
        case TodoStatus.Active:
          return !todo.completed;
        case TodoStatus.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });
  }, [selectedStatus, todosContainer]);

  const filterByStatus = (status: TodoStatus) => {
    setSelectedStatus(status);
  };

  const closeErrorMessage = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then((res) => {
        setTodosContainer(res);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {todos.length > 0 && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {todos.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </section>

        {todosContainer.length > 0 && (
          <TodoFooter
            todosAmount={todosContainer.length - completedTodos.length}
            completedAmount={completedTodos.length}
            selected={selectedStatus}
            onFilter={filterByStatus}
          />
        )}
      </div>

      {errorMessage.length > 0 && (
        <ErrorToast
          message={errorMessage}
          onClose={closeErrorMessage}
        />
      )}
    </div>
  );
};
