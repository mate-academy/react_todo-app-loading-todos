import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { TodoList } from '../TodoList';
import { getTodos, postTodo } from '../../api/todos';
import { useTodosContext } from '../store';
import { useUncomplitedTodos } from '../../helpers/useUncomplitedTodos';
import { TodoFilter } from '../TodoFilter';
import { useComplitedTodos } from '../../helpers/useComplitedTodos';
import { ErrorOption } from '../../enum/ErrorOption';

const USER_ID = 12027;

export const TodoApp: React.FC = () => {
  const { addTodo, todos, recieveTodos } = useTodosContext();

  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState('');

  const completedTodosLength = useComplitedTodos().length;
  const uncompletedTodosLength = useUncomplitedTodos().length;

  const resetHasError = () => {
    setHasError('');
  };

  const handlerErrors = useCallback(
    (errMessage: string) => {
      setHasError(errMessage);

      setTimeout(() => resetHasError(), 3000);
    },
    [],
  );

  useEffect(() => {
    resetHasError();

    getTodos(USER_ID)
      .then(todosFS => {
        recieveTodos(todosFS);
      })
      .catch(() => handlerErrors(ErrorOption.RecivingError))
      .finally(() => setIsLoading(false));
  }, [handlerErrors, recieveTodos]);

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      handlerErrors(ErrorOption.TitleError);

      return;
    }

    const newTodo = {
      userId: USER_ID,
      title: inputValue,
      completed: false,
    };

    postTodo(newTodo)
      .then(newTodoFS => {
        addTodo(newTodoFS);
      })
      .catch(() => (
        handlerErrors(ErrorOption.AddTodoError)
      ))
      .finally(() => setInputValue(''));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            aria-label="toggleAll"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form onSubmit={onSubmitForm}>
            <input
              data-cy="NewTodoField"
              type="text"
              value={inputValue}
              onChange={event => setInputValue(event.target.value)}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {!isLoading && <TodoList />}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${uncompletedTodosLength} items left`}
            </span>

            <TodoFilter />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedTodosLength === 0}
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
          {
            hidden: !hasError,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          aria-label="hideErrorBtn"
          type="button"
          className="delete"
          onClick={resetHasError}
        />
        {hasError}
      </div>
    </div>
  );
};
