/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  deleteTodo,
  getTodos,
  patchTodo,
  postTodo,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import classNames from 'classnames';

function filterTodo(todos: Todo[], query: Query) {
  if (query !== 'All') {
    const completed = query === 'Completed';

    return [...todos].filter(todo => todo.completed === completed);
  }

  return [...todos];
}

type Query = 'All' | 'Completed' | 'Active';

const ERROR_DELAY = 3000;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [query, setQuery] = useState<Query>('All');

  const setError = useCallback((msg: string) => {
    setErrorMessage(msg);

    setTimeout(() => {
      setErrorMessage('');
    }, ERROR_DELAY);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (error) {
        setError('Unable to load todos');
      }
    })();
  }, [setError]);

  const addTodo = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (title === '') {
        setError('Title should not be empty');

        return;
      }

      const preparedData = {
        userId: USER_ID,
        title,
        completed: false,
      };

      try {
        const addedTodo = await postTodo(preparedData);

        setTodos(currentTodos => {
          return [...currentTodos, addedTodo];
        });
      } catch (error) {
        setError('Unable to add a todo');
      } finally {
        setTitle('');
      }
    },
    [title, setError],
  );

  const onUpdate = useCallback(
    async (todoToUpdate: Partial<Todo> & Pick<Todo, 'id'>) => {
      try {
        await patchTodo(todoToUpdate.id, todoToUpdate);

        setTodos(currentTodos => {
          return currentTodos.map(todo => {
            if (todo.id === todoToUpdate.id) {
              return { ...todo, ...todoToUpdate };
            }

            return todo;
          });
        });
      } catch (error) {
        setError('Unable to update a todo');
      }
    },
    [setError],
  );

  const onDelete = useCallback(
    async (todoId: number) => {
      try {
        await deleteTodo(todoId);

        setTodos(currentTodos => {
          return currentTodos.filter(todo => todo.id !== todoId);
        });
      } catch (error) {
        setError('Unable to delete a todo');
      }
    },
    [setError],
  );

  const handleTitleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [],
  );

  const handleClearCompleted = useCallback(async () => {
    const completedTodos = todos.filter(todo => todo.completed);

    if (completedTodos.length === 0) {
      return;
    }

    try {
      const deletePromises = completedTodos.map(todo => onDelete(todo.id));

      await Promise.all(deletePromises);

      setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
    } catch (error) {
      setError('Unable to delete a todo');
    }
  }, [todos, onDelete, setError]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const preparedTodos = filterTodo(todos, query);

  const completedCount = filterTodo(todos, 'Completed')?.length || 0;

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
          <form onSubmit={addTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              value={title}
              placeholder="What needs to be done?"
              onChange={handleTitleInput}
            />
          </form>
        </header>

        {preparedTodos.length > 0 && (
          <TodoList
            todos={preparedTodos}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        )}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.length - completedCount} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: query === 'All',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setQuery('All')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: query === 'Active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setQuery('Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: query === 'Completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setQuery('Completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            {completedCount > 0 && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                onClick={handleClearCompleted}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: errorMessage === '' },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
