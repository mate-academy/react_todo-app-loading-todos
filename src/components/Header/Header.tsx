/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';

import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  isTodos: boolean;
  activeTodos: Todo[];
};

export const Header: React.FC<Props> = ({
  isTodos,
  activeTodos,
}) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTodoTitle('');
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {isTodos && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all',
            { active: !activeTodos.length })}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={event => setTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
