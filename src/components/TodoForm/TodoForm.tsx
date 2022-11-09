import React, { FC, useEffect, useState } from 'react';

type Props = {
  todoField: any;
  setTodo: (title: string) => void;
  uploadTodo: () => Promise<void>;
};

export const TodoForm: FC<Props> = ({
  todoField,
  setTodo,
  uploadTodo,
}) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const isValidTitle = newTodoTitle.trim().length;

  const changeNewTodoTitle = (title: string) => setNewTodoTitle(title);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    uploadTodo();
    changeNewTodoTitle('');
  };

  useEffect(() => {
    if (isValidTitle) {
      setTodo(newTodoTitle);
    }
  }, [newTodoTitle]);

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={todoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={(event) => changeNewTodoTitle(event.target.value)}
      />
    </form>
  );
};
