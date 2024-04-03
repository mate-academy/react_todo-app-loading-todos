/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { ErrorMessages, StatusFilterValue, Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { Footer } from './components/Footer/Footer';
import { TodoContext } from './TodoContext/TodoContext';

export const App: React.FC = () => {
  const { error, showError, setShowError, displayError } =
    useContext(TodoContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>('all');

  const getPreparedTodos = () => {
    let result = [...todos];

    if (statusFilter === 'completed') {
      result = result.filter(todo => todo.completed);
    } else if (statusFilter === 'active') {
      result = result.filter(todo => !todo.completed);
    }

    return result;
  };

  const preparedTodos = getPreparedTodos();

  useEffect(() => {
    setShowError(false);
    getTodos()
      .then(setTodos)
      .catch(() => {
        displayError(ErrorMessages.TodosLoad);
      });
  }, [displayError, setShowError]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {preparedTodos.length > 0 && <TodoList todos={preparedTodos} />}
        {todos.length > 0 && (
          <Footer
            setStatusFilter={setStatusFilter}
            todos={todos}
            statusFilter={statusFilter}
          />
        )}
        {/* Hide the footer if there are no todos */}
      </div>
      <ErrorMessage message={error} show={showError} setShow={setShowError} />

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
    </div>
  );
};
