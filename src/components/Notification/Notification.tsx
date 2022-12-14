import React, {useEffect} from 'react';
import classNames from 'classnames';

interface Props {
  errorMessage: string;
  onHideErrMessage: (newMessage: string) => void;
}

export const Notification: React.FC<Props> = (props) => {
  const { errorMessage, onHideErrMessage } = props;

  useEffect(() => {
    setTimeout(() => {
      onHideErrMessage('');
    }, 3000);
  }, [errorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: !errorMessage.length,
        },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onHideErrMessage('')}
      />
      {errorMessage}
    </div>
  );
};
