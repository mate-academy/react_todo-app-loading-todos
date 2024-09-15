/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { createTodo, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { Filter } from './types/Filter';
import { TodoItem } from './components/TodoItem';

export const USER_ID = 1414;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [userId] = useState(USER_ID);
  const [completed] = useState(false);
  //const [hasShownError, setHasShownError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos(userId)
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        const timeoutId = setTimeout(() => {
          setError('');
          //setHasShownError(true);
        }, 3000);

        return () => clearTimeout(timeoutId);
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  //userId, filter, error, hasShownError
  const reset = () => {
    setTitle('');
    setError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitle(title);

    if (!title) {
      setError('Title should not be empty');

      return;
    }

    createTodo({
      title,
      userId,
      completed,
    })
      .then(newTodo => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
        reset();
      })
      .catch(() => setError('Unable to add a todo'));
  };

  const handleToggle = (todoId: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setError('');
  };

  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const hasCompleted = todos.some(todo => todo.completed);

  const filteredTodos = todos.filter(todo => {
    if (filter === Filter.Active) {
      return !todo.completed;
    } else if (filter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      {!isloading && (
        <>
          <div className="todoapp__content">
            <header className="todoapp__header">
              {todos.length > 0 && (
                <button
                  type="button"
                  data-cy="ToggleAllButton"
                  className={classNames('todoapp__toggle-all', {
                    active: isAllCompleted,
                  })}
                />
              )}

              <form
                action="api/todos"
                method="POST"
                onSubmit={handleSubmit}
                onReset={reset}
              >
                <input
                  data-cy="NewTodoField"
                  type="text"
                  className="todoapp__new-todo"
                  placeholder="What needs to be done?"
                  value={title}
                  onChange={handleTitleChange}
                />
              </form>
            </header>

            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <TodoItem todo={todo} key={todo.id} onChange={handleToggle} />
              ))}
            </section>

            {todos.length > 0 && (
              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="TodosCounter">
                  {todos.filter(todo => !todo.completed).length} items left
                </span>

                <nav className="filter" data-cy="Filter">
                  {Object.values(Filter).map(filterValue => (
                    <a
                      key={filterValue}
                      href={`#/${filterValue}`}
                      className={classNames('filter__link', {
                        selected: filter === filterValue,
                      })}
                      data-cy={`FilterLink${filterValue.charAt(0).toUpperCase() + filterValue.slice(1)}`}
                      onClick={() => handleFilterChange(filterValue)}
                    >
                      {filterValue.charAt(0).toUpperCase() +
                        filterValue.slice(1)}
                    </a>
                  ))}
                </nav>

                <button
                  type="button"
                  className="todoapp__clear-completed"
                  data-cy="ClearCompletedButton"
                  disabled={!hasCompleted}
                >
                  Clear completed
                </button>
              </footer>
            )}
          </div>
        </>
      )}

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        <div>{error}</div>
      </div>
    </div>
  );
};
