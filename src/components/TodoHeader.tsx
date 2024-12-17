type Props = {
  query: string;
  changeQuery: (query: string) => void;
};

export const TodoHeader: React.FC<Props> = ({ query, changeQuery }) => {
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
          onChange={event => {
            changeQuery(event.target.value);
          }}
        />
      </form>
    </header>
  );
};
