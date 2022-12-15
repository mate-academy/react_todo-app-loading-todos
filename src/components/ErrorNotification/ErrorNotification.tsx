/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { FC, useEffect } from 'react';

interface Props {
  handleSkipErrorClick: React.Dispatch<React.SetStateAction<string>>,
  message: string,
}

export const ErrorNotification: FC<Props> = ({
  handleSkipErrorClick,
  message,
}) => {
  useEffect(() => {
    setTimeout(() => {
      handleSkipErrorClick('');
    }, 3000);
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !message },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => handleSkipErrorClick('')}
      />
      <span>{message}</span>
    </div>

  );
};
