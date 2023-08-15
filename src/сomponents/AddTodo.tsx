type Props = {
  todosLength: number;
};

export const AddTodo: React.FC<Props> = ({ todosLength }) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {!!todosLength && (
        <button
          type="button"
          aria-label="Mark all Todo selected"
          className="todoapp__toggle-all active"
        />
      )}

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
