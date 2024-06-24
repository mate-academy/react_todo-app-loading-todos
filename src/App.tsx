/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Filter, Todo } from './types/Todo';
import cn from 'classnames';
import TodoList from './components/TodosList';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.ALL);

  // #region functions
  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = useMemo(() => {
    switch (selectedFilter) {
      case Filter.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [selectedFilter, todos]);

  const handleTodoClick = (id: number) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(newTodos);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo.trim() === '') {
      setErrorMessage('Title should not be empty');
      setIsLoading(false);
    }
  };

  const handleClearCompleted = () => {
    const activeTodos = todos.filter(todo => !todo.completed);

    setTodos(activeTodos);
  };

  const handleCleanButton = () => {
    setErrorMessage('');
  };
  // #endregion

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', { active: todos })}
              data-cy="ToggleAllButton"
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={handleChange}
            />
          </form>
        </header>

        <TodoList todos={filteredTodos} handleTodoClick={handleTodoClick} />

        {!!todos.length && (
          <Footer
            todos={todos}
            handleClearCompleted={handleClearCompleted}
            setFilter={setSelectedFilter}
            currentFilter={selectedFilter}
          />
        )}
      </div>

      {!isLoading && (
        <div
          data-cy="ErrorNotification"
          className={cn(
            'notification is-danger is-light has-text-weight-normal',
            { hidden: !errorMessage },
          )}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete hidden"
            onClick={handleCleanButton}
          />
          {errorMessage}
        </div>
      )}
    </div>
  );
};
