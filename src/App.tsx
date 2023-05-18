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
import { NewTodo } from './components/NewTodo';
import { Filter } from './types/Filter';

const USER_ID = 10358;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.All);

  const loadTodos = useCallback(async () => {
    let timeoutId: NodeJS.Timeout;

    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setHasError(true);
      timeoutId = setTimeout(() => setHasError(false), 3000);
    }

    return () => (timeoutId && clearTimeout(timeoutId));
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const completedCount = todos.filter(todo => todo.completed).length;

  const filteredTodos = todos.filter(todo => {
    switch (filterBy) {
      case Filter.Completed:
        return todo.completed;

      case Filter.Active:
        return !todo.completed;

      case Filter.All:
      default:
        return true;
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
          { todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                hidden: !todos.length,
                active: completedCount,
              })}
            />
          )}

          <NewTodo />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              completedCount={completedCount}
            />
          </>
        )}
      </div>

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
