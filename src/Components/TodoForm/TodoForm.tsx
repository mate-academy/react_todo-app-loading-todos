export const TodoForm: React.FC = () => {
  return (
    <header data-cy="NewTodoField" className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        aria-label="todo do"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
