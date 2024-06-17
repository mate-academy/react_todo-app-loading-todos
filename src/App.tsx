import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import * as todosService from './api/todos';
import { UserWarning } from './UserWarning';

import { DELAY } from './constans';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos, getTodosByOptions } from './services/todos';

export const App: React.FC = () => {
  /* eslint-disable react-hooks/rules-of-hooks */
  if (!USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [option, setOption] = useState('All');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  function loadTodos() {
    setErrorMessage('');

    todosService
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');

        setTimeout(() => setErrorMessage(''), DELAY);
      })
      .finally();
  }

  useEffect(loadTodos, []);

  const todosByOption = useMemo(
    () => getTodosByOptions(option, todos),
    [option, todos],
  );
  const IsEveryCompletedTodos = useMemo(
    () => getTodos.isEveryCompleted(todos),
    [todos],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: IsEveryCompletedTodos,
              })}
              data-cy="ToggleAllButton"
            />
          )}

          <form>
            <input
              autoFocus
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList
          todos={todosByOption}
          onSelect={setSelectedTodo}
          selectedId={selectedTodo?.id}
        />

        {!!todos.length && (
          <TodoFilter todos={todos} option={option} onOption={setOption} />
        )}
      </div>

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
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
