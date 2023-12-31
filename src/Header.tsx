import React from 'react';
import { Todo } from './types/Todo';

type Props = {
  todos: Todo[];
};

export const Header: React.FC<Props> = () => {
  return (
    <header className="todoapp__header">
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
