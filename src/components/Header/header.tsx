import { RefObject } from 'react';

type Props = {
  newTodoField: RefObject<HTMLInputElement>,
};

export const Header: React.FC<Props> = ({ newTodoField }) => (
  <header className="todoapp__header">
    <button
      aria-label="ToggleAllButton"
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
      />
    </form>
  </header>
);
