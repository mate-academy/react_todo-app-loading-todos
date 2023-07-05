import React from 'react';
import { ErrorMessage } from '../types/ErrorMessage';

interface Props {
  newTodoTitle: string;
  setNewTodoTitle: (title: string) => void;
  setErrorMessage: (message: ErrorMessage | null) => void;
}

export const NewTodo: React.FC<Props> = ({
  newTodoTitle,
  setNewTodoTitle,
  setErrorMessage,
}) => {
  const handleTodoTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewTodoTitle(event.target.value);
    setErrorMessage(null);
  };

  return (
    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={handleTodoTitleChange}
      />
    </form>
  );
};
