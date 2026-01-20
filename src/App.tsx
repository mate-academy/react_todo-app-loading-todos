/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

import { Filter } from './component/Filter';
import { Notification } from './component/Notification';
import { NewTodo } from './component/NewTodo';
import { TodoList } from './component/TodoList';

const FILTER = {
  all: 'all',
  active: 'active',
  completed: 'completed',
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>(FILTER.all);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getTodos()
      .then(data => setTodos(data))
      .catch(() => setError('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = todos.filter(todo => {
    if (filter === FILTER.active) {
      return !todo.completed;
    }

    if (filter === FILTER.completed) {
      return todo.completed;
    }

    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.length - activeTodosCount;

  if (!USER_ID) {
    return null;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {(todos.length > 0 || isTyping) && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active:
                  todos.length > 0 && completedTodosCount === todos.length,
              })}
              data-cy="ToggleAllButton"
              disabled={completedTodosCount === 0}
            />
          )}

          <NewTodo setTodos={setTodos} onTypingChange={setIsTyping} />
        </header>

        <TodoList todos={visibleTodos} loading={loading} setTodos={setTodos} />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            <Filter currentFilter={filter} onFilterChange={setFilter} />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedTodosCount === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <Notification message={error} onHide={() => setError(null)} />
    </div>
  );
};
