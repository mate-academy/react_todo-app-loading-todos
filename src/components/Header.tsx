/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
};

export const Header: React.FC<Props> = ({ todos }) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {todos.length && (
        <button
          type="button"
          className="todoapp__toggle-all active"
        />
      )}
      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
