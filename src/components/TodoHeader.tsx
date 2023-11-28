import { useState } from 'react';
import { TyChangeEvtInputElmt } from '../types/General';

export const TodoHeader: React.FC = () => {
  const [value, setValue] = useState('');

  // #region HANDLER
  const handleInputChange = (event: TyChangeEvtInputElmt) => {
    setValue(event.target.value);
  };
  // #endregion

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        aria-label="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};
