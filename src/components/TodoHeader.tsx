type Props = {
  isInput: string;
  setIsInput: React.Dispatch<React.SetStateAction<string>>;
};
export const TodoHeader: React.FC<Props> = ({ isInput, setIsInput }) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        onClick={() => {}}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={e => e.preventDefault()}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={isInput}
          onChange={event => {
            setIsInput(event.target.value);
          }}
        />
      </form>
    </header>
  );
};
