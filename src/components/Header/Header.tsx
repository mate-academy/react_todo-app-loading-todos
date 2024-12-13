type HeaderProps = {
  query: string;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Header({ query, onInput }: HeaderProps) {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          value={query}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={onInput}
        />
      </form>
    </header>
  );
}
