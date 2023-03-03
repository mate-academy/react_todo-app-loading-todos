/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import classNames from 'classnames';

import { ActiveTodoData } from '../types/ActiveTodoData';

type Props = {
  activeTodoData: ActiveTodoData,
};

export const Header: FC<Props> = ({
  activeTodoData,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: activeTodoData.hasActiveTodo },
        )}
      />

      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>

  );
};
