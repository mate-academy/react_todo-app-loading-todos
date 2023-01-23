import { FC, LegacyRef, memo } from 'react';

interface Props {
  newTodoField: LegacyRef<HTMLInputElement>;
}

export const NewTodo: FC<Props> = memo(({ newTodoField }) => {
  return (
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
});
