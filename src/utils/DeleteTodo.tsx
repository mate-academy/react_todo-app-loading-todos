import React from 'react';

type Props = {
  currentTodoId: number;
  handleTodoDeleted: (todoId: number) => void;
  isLoading: boolean;
};

export const DeleteTodo: React.FC<Props> = ({
  currentTodoId,
  handleTodoDeleted,
  isLoading,
}) => (
  <button
    type="button"
    className="todo__remove"
    data-cy="TodoDelete"
    onClick={() => handleTodoDeleted(currentTodoId)}
    disabled={isLoading}
  >
    ×
  </button>
);
