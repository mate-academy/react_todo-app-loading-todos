/* eslint-disable jsx-a11y/control-has-associated-label */
import { ChangeEvent, FC, useState } from 'react';
import classNames from 'classnames';

type Props = {
  countOfActive: number,
};

export const Header: FC<Props> = ({ countOfActive }) => {
  const [todoTitle, setTodoTitle] = useState<string>('');

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: countOfActive,
        })}
      />

      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={handleTitle}
        />
      </form>
    </header>
  );
};
