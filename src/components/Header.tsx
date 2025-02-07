import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[] | null;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
};

export const Header: React.FC<Props> = ({ todos, inputRef }) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: todos?.filter(todo => !todo.completed).length === 0,
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
        />
      </form>
    </header>
  );
};
