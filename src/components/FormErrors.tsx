/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import cn from 'classnames';

export const FormErrors: React.FC = () => {
  const [errors] = useState<string[]>([
    'Unable to add todo',
    'Unable to delete todo',
    'Unable to update todo',
  ]);

  if (errors.length === 0) {
    return null;
  }

  return (
    <div
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errors,
      })}
    >
      <button type="button" className="delete" />

      {errors.map(error => (
        <p>{error}</p>
      ))}
    </div>
  );
};
