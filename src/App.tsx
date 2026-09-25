/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

function getVisibleTodos(todos: Todo[], selectedFilter: Filter) {
  switch (selectedFilter) {
    case Filter.Active:
      return todos.filter(todo => !todo.completed);
    case Filter.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [responseError, setResponseError] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => setResponseError('Unable to load todos'));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResponseError('');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [responseError]);

  const visibleTodos = getVisibleTodos(todos, selectedFilter);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

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
        {todos.length > 0 && (
          <>
            <TodoList visibleTodos={visibleTodos} />
            {/* Hide the footer if there are no todos */}
            <Footer
              activeTodosCount={activeTodosCount}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        responseError={responseError}
        onClose={() => setResponseError('')}
      />
    </div>
  );
};

// Title should not be empty
// <br />
// Unable to add a todo
// <br />
// Unable to delete a todo
// <br />
// Unable to update a todo
