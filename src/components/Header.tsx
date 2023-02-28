import { ChangeEvent, FormEvent, RefObject } from 'react';

type Props = {
  submitHandler: (e: FormEvent<HTMLFormElement>) => void,
  inputText: string,
  isToggle: boolean,
  inputChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
  newTodoField: RefObject<HTMLInputElement>,
  toggleCompletedHandler: () => void,
};

export const Header: React.FC<Props> = ({
  submitHandler,
  inputText,
  inputChangeHandler,
  newTodoField,
  toggleCompletedHandler,
  isToggle,
}) => {
  return (
    <header className="todoapp__header">
      <button
        aria-label="Toggle all button"
        data-cy="ToggleAllButton"
        type="button"
        className={`todoapp__toggle-all ${isToggle ? 'active' : ''}`}
        onClick={toggleCompletedHandler}
      />

      <form onSubmit={submitHandler}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputText}
          onChange={inputChangeHandler}
        />
      </form>
    </header>
  );
};
