import React from 'react';

interface Props {
  newTodoTitle: string;
  setNewTodoTitle: (title: string) => void;
  setErrorMessage: (message: string) => void;
}

export const NewTodo: React.FC<Props> = ({
  newTodoTitle,
  setNewTodoTitle,
  setErrorMessage,
}) => {
  const handleChangeTodoTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewTodoTitle(event.target.value);
    setErrorMessage('');
  };

  return (
    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={handleChangeTodoTitle}
      />
    </form>
  );
};
