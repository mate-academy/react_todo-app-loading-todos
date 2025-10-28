/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { FILTERS, FilterType } from './constants/filters';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [filter, setFilter] = useState<FilterType>(FILTERS.all);
  const [nextId, setNextId] = useState<number>(1);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showError = (message: string) => {
    setError(message);
    setNotificationVisible(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setNotificationVisible(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      setNotificationVisible(false);
      setError('');

      try {
        const data = await getTodos();

        setTodos(data);
        const maxId = data.reduce((max, t) => Math.max(max, t.id), 0);

        setNextId(maxId + 1);
      } catch (e) {
        if (e instanceof Error && e.message.trim() !== '') {
          showError(e.message);
        } else {
          showError('Unable to load todos');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case FILTERS.active:
        return !todo.completed;
      case FILTERS.completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const allCompleted = todos.length > 0 && todos.every(t => t.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={cn('todoapp__toggle-all', { active: allCompleted })}
            data-cy="ToggleAllButton"
          />

          <NewTodo />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {loading && (
            <div className="modal overlay is-active" data-cy="Loader">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          )}

          <TodoList todos={visibleTodos} />
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            <Filter current={filter} onChange={setFilter} />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(t => !t.completed)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !notificationVisible },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setNotificationVisible(false)}
        />
        {error}
      </div>
    </div>
  );
};
