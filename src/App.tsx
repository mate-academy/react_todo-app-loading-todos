/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

const USER_ID = 10358;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [filterBy, setFilterBy] = useState<string>('All');

  const loadTodos = useCallback(async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setHasError(true);
      setTimeout(() => setHasError(false), 3000);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const completedCount = todos.filter(todo => todo.completed).length;

  const filteredTodos = todos.filter(todo => {
    switch (filterBy) {
      case 'Completed':
        return todo.completed;

      case 'Active':
        return !todo.completed;

      case 'All':
      default:
        return todos;
    }
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
          { todos.length && (
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

        <TodoList todos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        <Footer
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          completedCount={completedCount}
        />
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        className={classNames(
          'notification is-danger is-light has-text-weight-normal', {
            hidden: !hasError,
          },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setHasError(false)}
        />
        Unable to add a todo
      </div>
    </div>
  );
};
