import React from 'react';
import cn from 'classnames';
import { useTodos } from '../../utils/TodoContext';

export const TodoError: React.FC = () => {
  const { error } = useTodos();

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !error,
      })}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {error?.message}
    </div>
  );
};
