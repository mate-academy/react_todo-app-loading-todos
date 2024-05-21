import classNames from 'classnames';
import React from 'react';

interface Props {
  emptyTitle: boolean;
  setEmptyTitle: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ErrorMessage: React.FC<Props> = ({
  emptyTitle,
  setEmptyTitle,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !emptyTitle },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setEmptyTitle(false)}
      />
      Title should not be empty
    </div>
  );
};
