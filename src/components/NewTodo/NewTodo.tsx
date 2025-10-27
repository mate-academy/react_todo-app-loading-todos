import React from 'react';

interface NewTodoProps {
  focusedInput: React.Ref<HTMLInputElement>;
  onSubmit?: () => void;
}
export const NewTodo: React.FC<NewTodoProps> = ({
  focusedInput,
  onSubmit = () => {},
}) => {
  return (
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        ref={focusedInput}
      />
    </form>
  );
};
