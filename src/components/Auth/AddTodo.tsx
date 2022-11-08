import React from 'react';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
  handleQueryOfTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  queryOfTitle: string;
  handleOnSubmit: (event:React.FormEvent<HTMLFormElement>) => void;
};

export const AddTodo: React.FC<Props> = ({
  newTodoField,
  handleQueryOfTitle,
  queryOfTitle,
  handleOnSubmit,
}) => {
  return (
    <form onSubmit={handleOnSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={queryOfTitle}
        onChange={handleQueryOfTitle}
      />
    </form>
  );
};
