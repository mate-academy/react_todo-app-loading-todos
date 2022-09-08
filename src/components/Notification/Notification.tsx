/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type Props = {
  error: string,
};

export const Notification: React.FC<Props> = ({ error }) => {
  const [opener, setOpener] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string>('');

  useEffect(() => {
    switch (error) {
      case 'ErrorAdd':
        setErrorText('Unable to add a todo');
        break;
      case 'ErrorDelete':
        setErrorText('Unable to delete a todo');
        break;
      case 'ErrorUpdate':
        setErrorText('Unable to update a todo');
        break;
      default:
    }
  }, []);

  setTimeout(() => {
    setOpener(true);
  }, 3000);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: opener },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setOpener(true)}
      />
      {errorText}
    </div>
  );
};
