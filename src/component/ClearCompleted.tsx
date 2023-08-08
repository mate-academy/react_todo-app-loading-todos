import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  countActiveTodos: number,
};

export const ClearCompleted: React.FC<Props> = ({
  todos,
  countActiveTodos,
}) => {
  return (
    <button
      type="button"
      className={cn('todoapp__clear-completed', {
        hidden: todos.length === countActiveTodos,
      })}
    >
      Clear completed
    </button>
  );
};
