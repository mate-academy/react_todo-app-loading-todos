import classNames from 'classnames';
import { useState } from 'react';

interface HeaderProps {
  active: number;
  onChange: (value: string) => void;
}

export const Header = ({ active, onChange }: HeaderProps) => {
  const [listValue, setListValue] = useState('');
  const isAllActive = !active ? true : false;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChange(listValue);

    setListValue('');
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames(`todoapp__toggle-all `, { active: isAllActive })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={listValue}
          onChange={event => setListValue(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
