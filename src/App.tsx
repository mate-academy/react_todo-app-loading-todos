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

  const activeCount = todos.filter(todo => !todo.completed).length;

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
          { todos.length ? (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                hidden: !todos.length,
                active: activeCount,
              })}
            />
          ) : null}

          <NewTodo />
        </header>

        {todos.length
          ? (
            <>
              <TodoList todos={filteredTodos} />
              <Footer
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                activeCount={activeCount}
              />
            </>
          ) : null}
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
