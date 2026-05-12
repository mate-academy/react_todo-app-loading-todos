import React from 'react';

type Props = {
  newTodoRef: React.RefObject<HTMLInputElement>;
  creating: boolean;
  onCreate: (e: React.FormEvent) => void;
  showToggleAll: boolean;
  allActive: boolean;
  onToggleAll: () => void;
};

export const Header: React.FC<Props> = ({
  newTodoRef,
  creating,
  onCreate,
  showToggleAll,
  allActive,
  onToggleAll,
}) => (
  <header className="todoapp__header">
    {showToggleAll && (
      <button
        type="button"
        className={`todoapp__toggle-all ${allActive ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={onToggleAll}
      />
    )}

    <form onSubmit={onCreate}>
      <input
        ref={newTodoRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        defaultValue=""
        disabled={creating}
      />
    </form>
  </header>
);

export default Header;
