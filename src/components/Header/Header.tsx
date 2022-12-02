type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
};

export const Header: React.FC<Props> = ({ newTodoField }) => (
  <header className="todoapp__header">
    <button
      data-cy="ToggleAllButton"
      type="button"
      aria-label="Toggle All"
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
