/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodosList';
import { filterTodos } from './utils/filterTodos';
import { useError } from './hooks/useError';
import { AlertError } from './components/AlertError/AlertError';
import { TodoFooter } from './components/TodoFooter/TodoFooter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [filterCompleted, setFilterCompleted] = useState<boolean | null>(null);
  const { error, showError, clearError } = useError();
  const visibleTodos = filterTodos(todos, filterCompleted);
  const [value, setValue] = useState('');
  const activeTodosCount = todos
    ? todos.filter(todo => !todo.completed).length
    : 0;

  useEffect(() => {
    getTodos()
      .then(res => {
        setTodos(res);
      })
      .catch(() => {
        showError('Unable to load todos');
      });
  }, [showError]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!value) {
      showError('Title should not be empty');
    }
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

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
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </form>
        </header>
        <TodoList todos={visibleTodos} />

        {todos && todos?.length > 0 && (
          <TodoFooter
            completed={filterCompleted}
            onCompleted={filter => setFilterCompleted(filter)}
            activeTodosCount={activeTodosCount}
          />
        )}
      </div>

      <AlertError error={error} onClear={clearError} />
    </div>
  );
};
