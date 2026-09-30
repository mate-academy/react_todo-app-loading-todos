import { RefObject, useState } from 'react';

type Props = {
  arrow: () => void;
  ref: RefObject<HTMLInputElement>;
};

export const Head = ({ arrow, ref }: Props) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        onClick={() => arrow()}
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          defaultValue={''}
          value={inputValue}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setInputValue(event.target.value)}
          ref={ref}
        />
      </form>
    </header>
  );
};
