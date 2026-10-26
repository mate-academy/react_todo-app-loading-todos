/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { Error } from './types/Error';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import classNames from 'classnames';

const enum Filter {
  'all' = 'all',
  'active' = 'active',
  'completed' = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.all);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch {
        setError(Error.loadTodo);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    switch (filter) {
      case Filter.all:
        setFilteredTodos([...todos]);
        break;
      case Filter.active:
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      case Filter.completed:
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
    }
  }, [filter, todos]);

  const isAllTodosCompleted =
    todos.every(todo => todo.completed) && todos.length > 0;
  const isCompletedTodos = todos.some(todo => todo.completed);
  const todosCounter = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: isAllTodosCompleted,
              })}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {todosCounter} items left
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={classNames('filter__link', {
                    selected: filter === Filter.all,
                  })}
                  data-cy="FilterLinkAll"
                  onClick={() => setFilter(Filter.all)}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames('filter__link', {
                    selected: filter === Filter.active,
                  })}
                  data-cy="FilterLinkActive"
                  onClick={() => setFilter(Filter.active)}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames('filter__link', {
                    selected: filter === Filter.completed,
                  })}
                  data-cy="FilterLinkCompleted"
                  onClick={() => setFilter(Filter.completed)}
                >
                  Completed
                </a>
              </nav>

              {/* this button should be disabled if there are no completed todos */}
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={!isCompletedTodos}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <ErrorNotification error={error} />
    </div>
  );
};
