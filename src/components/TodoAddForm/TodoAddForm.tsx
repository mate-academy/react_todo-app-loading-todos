import { LegacyRef } from 'react';

interface Props {
  newTodoField: LegacyRef<HTMLInputElement> | undefined;
  newTodoTitle: string;
  onAdd: (title:string) => void;
}

export const TodoAddForm: React.FC<Props> = ({
  newTodoField,
  newTodoTitle,
  onAdd,
}) => {
  return (
    <header className="todoapp__header">
      <button
        aria-label="Switch"
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
      />

      <form>
        <input
          value={newTodoTitle}
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={(event) => onAdd(event.target.value)}
        />
      </form>
    </header>
  );
};
