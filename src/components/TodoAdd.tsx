import React from 'react';

type Props = {
  handlerFormSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>,
  newTodoField: React.RefObject<HTMLInputElement>,
  newTodoTitle: string,
  handlerInputTitle: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const TodoAdd: React.FC<Props> = ({
  handlerFormSubmit,
  newTodoField,
  newTodoTitle,
  handlerInputTitle,
}) => {
  return (
    <form onSubmit={handlerFormSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={handlerInputTitle}
      />
    </form>
  );
};
