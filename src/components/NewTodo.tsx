import { FC, memo } from 'react';

interface Props {
  newTodoField: React.RefObject<HTMLInputElement>,
  onFocus: React.Dispatch<React.SetStateAction<boolean>>,
}

export const NewTodo: FC<Props> = memo(
  ({ newTodoField, onFocus }) => (
    <header className="todoapp__header">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="ToggleAllButton"
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
          onFocus={() => onFocus(true)}
        />
      </form>
    </header>
  ),
);
