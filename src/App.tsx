/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import ErrorToast from './components/ErrorToast';
import TodoFooter from './components/TodoFooter';
import TodoItem from './components/TodoItem';
import { Todo, TodoStatus } from './types/Todo';

const USER_ID = 11033;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosContainer, setTodosContainer] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(TodoStatus.All);
  const [errorMessage, setErrorMessage] = useState('');

  const filterByStatus = (status: TodoStatus) => {
    const filtered = todosContainer.filter(todo => {
      switch (status) {
        case TodoStatus.Active:
          return !todo.completed;
        case TodoStatus.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });

    setTodos(filtered);
    setSelectedStatus(status);
  };

  const closeErrorMessage = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then((res) => {
        setTodos(res);
        setTodosContainer(res);
        setCompletedTodos(res.filter(todo => todo.completed));
      })
      .catch((error) => {
        throw error;
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
            <TodoItem todo={todo} />
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

      {errorMessage && (
        <ErrorToast
          message={errorMessage}
          onClose={closeErrorMessage}
        />
      )}
    </div>
  );
};
