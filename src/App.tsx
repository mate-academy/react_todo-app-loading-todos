/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

import { Filter } from './components/Filter';
import { Notification } from './components/Notification';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';

const FILTERS = {
  all: 'all',
  active: 'active',
  completed: 'completed',
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>(FILTERS.all);
  const [isTyping, setIsTyping] = useState(false);

  // --- Load Todos ---
  useEffect(() => {
    setLoading(true);
    setError(null);

    getTodos()
      .then(data => setTodos(data))
      .catch(() => setError('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  // --- Filtered todos ---
  const visibleTodos = todos.filter(todo => {
    if (filter === FILTERS.active) {
      return !todo.completed;
    }

    if (filter === FILTERS.completed) {
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
            {/* Active link should have the 'selected' class */}
            {/* Активне посилання повинно мати клас «вибрано» */}
            <Filter currentFilter={filter} onFilterChange={setFilter} />

            {/* this button should be disabled if there are no completed todos */}
            {/* цю кнопку слід вимкнути, якщо немає виконаних завдань */}
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

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {/* НЕ використовуйте умовний рендеринг, щоб приховати сповіщення */}
      {/* Додайте клас «hidden», щоб плавно приховати повідомлення */}
      <Notification message={error} onHide={() => setError(null)} />
    </div>
  );
};
