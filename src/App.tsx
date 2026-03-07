/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { USER_ID } from './api/todos';
import { getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Filter } from './types/Filter';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch {
      setErrorMessage('Unable to load todos');
    }
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === Filter.Active) {
      return !todo.completed;
    }

    if (filter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  const onFilterChange = (value: Filter) => {
    setFilter(value);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => setErrorMessage(''), 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeTodos = todos.filter(todo => !todo.completed);
  const activeTodosCount = activeTodos.length;
  const completedTodosCount = todos.length - activeTodosCount;
  const allTodosCompleted = activeTodosCount === 0 && todos.length !== 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header allTodosCompleted={allTodosCompleted} />

        <TodoList filteredTodos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <Footer
            activeTodosCount={activeTodosCount}
            completedTodosCount={completedTodosCount}
            filter={filter}
            onFilterChange={onFilterChange}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/* show only one message at a time */}
        {errorMessage}
        {/*Title should not be empty*/}
        {/*<br />*/}
        {/*Unable to add a todo*/}
        {/*<br />*/}
        {/*Unable to delete a todo*/}
        {/*<br />*/}
        {/*Unable to update a todo*/}
      </div>
    </div>
  );
};
