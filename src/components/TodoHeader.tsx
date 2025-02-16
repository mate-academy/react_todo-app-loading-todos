interface TodoHeaderProps {
  handleAddTodo: (title: string) => void;
  queryTodo: string;
  setQueryTodo: (queryTodo: string) => void;
  setErrorMessange: (visible: boolean) => void;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({
  handleAddTodo,
  queryTodo,
  setQueryTodo,
  setErrorMessange,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');

    if (input && input.value.trim()) {
      handleAddTodo(input.value.trim());
      input.value = '';
    } else {
      setErrorMessange(true);
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={() => handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={queryTodo}
          onChange={event => setQueryTodo(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
