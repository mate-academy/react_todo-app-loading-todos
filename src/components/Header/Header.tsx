type Props = {
  newTodoField: React.RefObject<HTMLInputElement>,
  createTodo: () => void,
  setNewTitle: (title: string) => void,
  newTitle: string,
};

export const Header: React.FC<Props> = ({
  newTodoField,
  createTodo,
  setNewTitle,
  newTitle,
}) => {
  return (
    <header className="todoapp__header">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
      />

      <form
        onSubmit={createTodo}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
