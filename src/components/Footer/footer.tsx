import React from 'react';
import { Nav } from '../Nav';

type Props = {
  numberOfCompletedTodo: number | undefined,
};

export const Footer: React.FC<Props> = React.memo(
  ({
    numberOfCompletedTodo,
  }) => (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${numberOfCompletedTodo} items left`}
      </span>

      <Nav />

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  ),
);
