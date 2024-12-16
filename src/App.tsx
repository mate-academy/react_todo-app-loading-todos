import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

interface Errors {
  messages: string[];
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [errors, setErrors] = useState<Errors>({ messages: [] });
  const [input, setInput] = useState('');
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout | null>(null);

  const showError = useCallback(
    (message: string) => {
      setErrors(prev => ({
        messages: [...new Set([...prev.messages, message])],
      }));
      setNotificationVisible(true);

      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }

      const timeout = setTimeout(() => {
        setErrors({ messages: [] });
        setNotificationVisible(false);
      }, 3000);

      setErrorTimeout(timeout);
    },
    [errorTimeout],
  );

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (input.trim().length === 0) {
      showError('Title should not be empty');

      return;
    }

    setInput('');
    setErrors({ messages: [] });
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getTodos();

        setTodos(todosData);
      } catch (error) {
        showError('Unable to load todos');
      } finally {
        setIsLoadingTodos(false);
      }
    };

    fetchTodos();
  }, [showError]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all"
            data-cy="ToggleAllButton"
          />
          <form onSubmit={handleFormSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </form>
        </header>

        {!isLoadingTodos && todos?.length && (
          <>
            <TodoList todos={todos} />{' '}
          </>
        )}
      </div>

      {/* Уведомление с ошибками */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light',
          'has-text-weight-normal',
          {
            hidden: !isNotificationVisible,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setNotificationVisible(false);
            setErrors({ messages: [] });
            if (errorTimeout) {
              clearTimeout(errorTimeout);
            }
          }}
        />
        {errors.messages.map((error, index) => (
          <div key={index}>{error}</div>
        ))}
      </div>
    </div>
  );
};

// Unable to load todos
// <br />
// Title should not be empty
// <br />
// Unable to add a todo
// <br />
// Unable to delete a todo
// <br />
// Unable to update a todo
