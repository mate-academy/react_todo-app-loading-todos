/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { StatusToFilterBy, Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 6999;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filterBy, setFilterBy] = useState(StatusToFilterBy.All);

  const itemsLeft = todos.filter(todo => todo.completed === false);

  const getTodosFromServer = async () => {
    setIsLoading(true);

    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setError('Server error!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const visibleTodos = todos.filter((todo) => {
    let isStatusCorrect = true;

    switch (filterBy) {
      case StatusToFilterBy.Active:
        isStatusCorrect = !todo.completed;
        break;

      case StatusToFilterBy.Completed:
        isStatusCorrect = todo.completed;
        break;

      default:
        break;
    }

    return isStatusCorrect;
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

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
          {isLoading ? (
            <Loader />
          ) : (
            <TodoList todos={visibleTodos} />
          )}
        </section>

        {/* Hide the footer if there are no todos */}
        <TodoFilter
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          itemsLeft={itemsLeft.length}
          todos={todos}
        />
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      {error && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            className="delete"
            onClick={() => setError('')}
          />
          {error}
        </div>
      )}

    </div>
  );
};
