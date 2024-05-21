import cn from 'classnames';

import { Todo } from '../types/Todo';
import { useTodosContext } from '../Context/TodosContext';
import React, { ChangeEvent, FormEvent, useEffect, useRef } from 'react';

type HeaderProps = {
  newTodo: Todo;
  submit: (e: FormEvent<HTMLFormElement>) => void;
  changeTodo: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Header: React.FC<HeaderProps> = ({
  newTodo,
  submit,
  changeTodo,
}) => {
  const { todos, isLoading, toggleAllTodos } = useTodosContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const showToggleAll = todos.length > 0;
  const isToggleButtonActive = todos.every(t => t.completed);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {showToggleAll && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: isToggleButtonActive,
          })} // active
          data-cy="ToggleAllButton"
          onClick={toggleAllTodos}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={submit}>
        <input
          ref={inputRef}
          disabled={isLoading}
          data-cy="NewTodoField"
          value={newTodo.title}
          onChange={changeTodo}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
