import { FC, memo } from 'react';

interface Props {
  newTodoField: React.RefObject<HTMLInputElement>,
  onFocus: React.Dispatch<React.SetStateAction<boolean>>,
}

export const NewTodo: FC<Props> = memo(
  ({ newTodoField, onFocus }) => (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
        aria-label="button can toggle all toods into one state"
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onFocus={() => onFocus(true)}
        />
      </form>
    </header>
  ),
);
