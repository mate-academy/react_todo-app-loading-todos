/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useEffect } from 'react';

type Props = {
  errorMessage: string;
  onErrorMessage: (value: string) => void;
};

export const ErrorNotification:React.FC<Props> = ({
  errorMessage,
  onErrorMessage,
}) => {
  useEffect(() => {
    setTimeout(() => {
      onErrorMessage('');
    }, 3000);
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >

      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onErrorMessage('')}
      />
      {errorMessage}
    </div>
  );
};
