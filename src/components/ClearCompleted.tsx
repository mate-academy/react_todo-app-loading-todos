import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const ClearCompleted: React.FC<Props> = ({ todos }) => {
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <>
      {hasCompleted && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </>
  );
};
