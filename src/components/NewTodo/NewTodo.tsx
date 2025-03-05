type Prop = {
  isAllTodoCompleted: boolean;
  addTodo: string;
  setTitleError: React.Dispatch<React.SetStateAction<string>>;
  setAddTodo: React.Dispatch<React.SetStateAction<string>>;
  setActionError: React.Dispatch<React.SetStateAction<string>>;
};

export const NewTodo: React.FC<Prop> = ({
  isAllTodoCompleted,
  addTodo,
  setTitleError,
  setAddTodo,
  setActionError,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (addTodo.trim.length === 0) {
      setTitleError('Title should not be empty');
    } else {
      setActionError('Unable to add a todo');
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={
          isAllTodoCompleted
            ? 'todoapp__toggle-all active'
            : 'todoapp__toggle-all'
        }
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={event => handleSubmit(event)}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={addTodo}
          onChange={event => setAddTodo(event.target.value)}
        />
      </form>
    </header>
  );
};
