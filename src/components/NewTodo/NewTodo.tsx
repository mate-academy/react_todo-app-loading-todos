import { LegacyRef } from 'react';

type Props = {
  newTodoInputRef: LegacyRef<HTMLInputElement>,
};

export const NewTodo: React.FC<Props> = ({ newTodoInputRef: newTodoField }) => {
  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        aria-label="ToggleAll"
        type="button"
        className="todoapp__toggle-all active"
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
