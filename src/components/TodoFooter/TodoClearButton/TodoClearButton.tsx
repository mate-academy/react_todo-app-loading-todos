import React from 'react';
import { Todo } from '../../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoClearButton: React.FC<Props> = ({ todos }) => {
  const completedTodoLength = todos.filter(
    currentTodo => currentTodo.completed,
  ).length;

  return (
    completedTodoLength > 0 ? (
      <button
        className="clear-completed"
        type="button"
      >
        Clear completed
      </button>
    ) : null
  );
};
