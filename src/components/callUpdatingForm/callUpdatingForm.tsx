import React from 'react';
import { Todo } from '../../types/Todo';
type Props = {
  setCallUpdatingForm: React.Dispatch<React.SetStateAction<number>>;
  todo: Todo;
  setOldValueToUpdatingForm: React.Dispatch<React.SetStateAction<string>>;
};

export const CallUpdatingForm: React.FC<Props> = ({
  todo,
  setCallUpdatingForm,
  setOldValueToUpdatingForm,
}) => {
  const { title, id } = todo;

  const handleUpdatingForm = (todo__title: string, todo__id: number) => {
    setCallUpdatingForm(todo__id);
    setOldValueToUpdatingForm(todo__title);
  };

  return (
    <span
      data-cy="TodoTitle"
      className="todo__title"
      onDoubleClick={() => handleUpdatingForm(title, id)}
    >
      {title}
    </span>
  );
};
