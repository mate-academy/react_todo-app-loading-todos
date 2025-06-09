/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Error } from './components/Error/Error';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [hasErrorMessage, setHasErrorMesage] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timerId: number;

    getTodos()
      .then(setTodos)
      .catch(() => {
        setIsError(true);
        setHasErrorMesage('Unable to load todos');
        timerId = window.setTimeout(setIsError, 3000, false);
      });

    inputRef.current?.focus();

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const filterTodosByStatus = () => {
    if (statusFilter === 'all') {
      return todos;
    }

    if (statusFilter === 'active') {
      return [...todos].filter(todo => !todo.completed);
    }

    if (statusFilter === 'completed') {
      return [...todos].filter(todo => todo.completed);
    }
  };

  const countActiveItems = () => {
    return todos.filter(todo => !todo.completed).length;
    // console.log(quantityActiveItems);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList todos={filterTodosByStatus() ?? []} />
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            quantityActiveItems={countActiveItems()}
            statusFilter={statusFilter}
            onStatusFilter={setStatusFilter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error
        isError={isError}
        errorMessage={hasErrorMessage}
        onError={setIsError}
      />
    </div>
  );
};
