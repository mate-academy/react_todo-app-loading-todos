type HeaderProps = {
  hasTodos: boolean;
  allCompleted: boolean;
};

export const Header = ({ hasTodos, allCompleted }: HeaderProps) => {
  return (
    <header className="todoapp__header">
      {hasTodos && (
        <button
          type="button"
          className={
            allCompleted ? 'todoapp__toggle-all active' : 'todoapp__toggle-all'
          }
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
