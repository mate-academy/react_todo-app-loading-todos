type Props = {
  showErrorWithDelay:(errorMessage: string) => void
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  // generateId: () => number;
};

export const Header: React.FC<Props> = ({
  showErrorWithDelay,
  inputText,
  setInputText,
  // generateId,
}) => {
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputText.trim()) {
      showErrorWithDelay('Title should not be empty');
    }

    if (inputText.trim()) {
      showErrorWithDelay('Unable to add a todo');
    }
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}

      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      >
        .
      </button>

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputText}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};
