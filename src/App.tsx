import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Error } from './utils/Error';
import { Category } from './utils/Category';
import { TodoForm } from './Components/TodoForm';
import { TodoList } from './Components/TodoList';

const USER_ID = 10156;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [isError, setIsError] = useState(false);
  const [todoError, setTodoError] = useState<Error | string>('');
  const [filterCategory, setFilterCategory] = useState(Category.All);

  const handleError = (error: Error) => {
    setIsError(true);
    setTodoError(error);

    window.setTimeout(() => {
      setIsError(false);
      setTodoError('');
    }, 3000);
  };

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      handleError(Error.LOAD);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleTodoTitle = (title: string) => {
    setTodoTitle(title);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" className="todoapp__toggle-all active" />

          <TodoForm
            title={todoTitle}
            onChangeTitle={handleTodoTitle}
          />
        </header>

        <TodoList
          todos={todos}
          category={filterCategory}
        />

        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${todos.length} items left`}
          </span>

          <nav className="filter">
            <a
              href="#/"
              className={classNames(
                'filter__link', { selected: filterCategory === Category.All },
              )}
              onClick={() => setFilterCategory(Category.All)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames(
                'filter__link',
                { selected: filterCategory === Category.Active },
              )}
              onClick={() => setFilterCategory(Category.Active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames(
                'filter__link',
                { selected: filterCategory === Category.Completed },
              )}
              onClick={() => setFilterCategory(Category.Completed)}
            >
              Completed
            </a>
          </nav>

          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
      </div>

      {isError && (
        <div className="notification is-danger is-light has-text-weight-normal">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            onClick={() => setTodoError('')}
          />
          {todoError}
        </div>
      )}
    </div>
  );
};
