/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { memo } from 'react';

export type Props = {
  errorNotice: boolean
  errorMessage: string
  setErrorNotice(value:boolean): void
};

export const ErrorNotification: React.FC<Props> = memo(({
  errorNotice,
  errorMessage,
  setErrorNotice,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorNotice },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorNotice(!errorMessage)}
      />

      {errorMessage}
    </div>
  );
});
