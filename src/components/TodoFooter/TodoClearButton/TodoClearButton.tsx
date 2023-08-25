import React from 'react';

type Props = {
  completed: boolean;
};

export const TodoClearButton: React.FC<Props> = ({ completed }) => {
  return (
    { completed } && (
      <button
        className="todoapp__clear-completed"
        type="button"
      >
        Clear completed
      </button>
    )
  );
};
