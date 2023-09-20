type Props = {
  todos: number;
};

export const TodoForm: React.FC<Props> = ({ todos }) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {todos !== 0 && (
        <button
          type="button"
          aria-label="todo do"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          data-cy="NewTodoField"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
