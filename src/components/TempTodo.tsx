import React from 'react';

type Props = {
  todo: {
    title: string;
  };
};

export const TempTodo: React.FC<Props> = ({ todo }) => {
  return (
    <div className="todo">
      <span className="todo__title">{todo.title}</span>

      <div className="modal overlay is-active">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
