import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { Todo } from './types/Todo';
import { ERROR_TEXT } from './constants';
import { Filters } from './types/Filters';
import { TodoList } from './components/TodoList/TodoList';
import { Filter } from './components/Filter/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<Filters>(Filters.All);

  const hideError = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const tim = setTimeout(() => setErrorMessage(''), 3000);

    return () => clearTimeout(tim);
  }, [errorMessage]);

  useEffect(() => {
    hideError();
    setIsLoading(true);
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => setErrorMessage(ERROR_TEXT.load))
      .finally(() => setIsLoading(false));
  }, []);

  const itemsLeft = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos],
  );

  const hasTodos = todos.length > 0;
  const allCompleted = hasTodos && itemsLeft === 0;

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filters.ACTIVE:
        return todos.filter(t => !t.completed);
      case Filters.COMPLETED:
        return todos.filter(t => t.completed);
      case Filters.All:
        return todos;
    }
  }, [todos, filter]);

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
            className={cn('todoapp__toggle-all', { active: allCompleted })}
            data-cy="ToggleAllButton"
            disabled={!hasTodos}
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={filteredTodos} />

        {hasTodos && !isLoading && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {itemsLeft} items left
            </span>

            <Filter value={filter} onChange={setFilter} />
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <ErrorNotification errorMessage={errorMessage} onHide={hideError} />
    </div>
  );
};
