import { useState } from 'react';
import { NewTodo } from '../newTodo/newTodo';
import classNames from 'classnames';

type Props = {
  toggleAll: boolean;
};

export const Header: React.FC<Props> = ({ toggleAll }) => {
  const [title, setTitle] = useState('');

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', { active: toggleAll })}
        data-cy="ToggleAllButton"
      />

      <NewTodo setTitle={setTitle} title={title} />

      {/* Add a todo on form submit */}
    </header>
  );
};
