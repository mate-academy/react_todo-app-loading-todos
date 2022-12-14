/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import classNames from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos, addTodo } from './api/todos';
import { Todo } from './types/Todo';
import { NewTodoField } from './components/Auth/NewTodoField/NewTodoField';
import { TodoList } from './components/Auth/TodoList';
import { ErrorNotification } from './components/Auth/ErrorNotification';
import { Status } from './types/Status';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState(Status.All);

  const loadUserTodos = useCallback(() => {
    if (!user) {
      return;
    }

    setError('');

    try {
      getTodos(user.id)
        .then(setTodos);
    } catch {
      setError('Can not load todos');
    }
  }, [user]);

  useEffect(() => {
    loadUserTodos();
  }, [user]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (title.trim() !== '' && user) {
        await addTodo({
          userId: user.id,
          title: title.trim(),
          completed: false,
        });

        loadUserTodos();

        setTitle('');
      } else {
        setError('Unable to add todo');
      }
    }, [title, user],
  );

  const filterTodosByStatus = useMemo(() => (
    todos.filter(todo => {
      switch (status) {
        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        case Status.All:
        default:
          return true;
      }
    })
  ), [status, todos]);

  const getCountToDone = () => {
    let count = 0;

    todos.forEach(todo => {
      if (!todo.completed) {
        count += 1;
      }
    });

    return count;
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className="todoapp__toggle-all active"
            />
          )}

          <NewTodoField
            title={title}
            onTitleChange={setTitle}
            onSubmit={handleSubmit}
          />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={filterTodosByStatus} />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${getCountToDone()} items left`}
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  data-cy="FilterLinkAll"
                  href="#/"
                  className={classNames(
                    'filter__link',
                    {
                      selected: status === Status.All,
                    },
                  )}
                  onClick={() => setStatus(Status.All)}
                >
                  All
                </a>

                <a
                  data-cy="FilterLinkActive"
                  href="#/active"
                  className={classNames(
                    'filter__link',
                    {
                      selected: status === Status.Active,
                    },
                  )}
                  onClick={() => setStatus(Status.Active)}
                >
                  Active
                </a>
                <a
                  data-cy="FilterLinkCompleted"
                  href="#/completed"
                  className={classNames(
                    'filter__link',
                    {
                      selected: status === Status.Completed,
                    },
                  )}
                  onClick={() => setStatus(Status.Completed)}
                >
                  Completed
                </a>
              </nav>

              <button
                data-cy="ClearCompletedButton"
                type="button"
                className="todoapp__clear-completed"
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <ErrorNotification error={error} onErrorChange={setError} />
    </div>
  );
};
