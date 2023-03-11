import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';

type Props = {
  todosLength: number;
  completedTodosLength: number;
};

const Header: React.FC<Props> = ({
  completedTodosLength,
  todosLength,
}) => {
  const [value, setValue] = useState('');

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: completedTodosLength === todosLength },
        )}
        aria-label="select all"
      />

      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={onChangeValue}
        />
      </form>
    </header>
  );
};

export default Header;
