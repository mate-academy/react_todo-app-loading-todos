import classNames from 'classnames';
import { useState } from 'react';
import { ErrorMessage } from '../../enums/ErrorMessage';

type Props = {
  errorMessage: ErrorMessage;
};

export const ErrorNotification: React.FC<Props> = ({ errorMessage }) => {
  const [isShown, setIsShown] = useState(true);

  setTimeout(() => setIsShown(false), 3000);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !isShown },
      )}
    >
      <button
        data-cy="HideErrorButton"
        aria-label="Close"
        type="button"
        className="delete"
        onClick={() => setIsShown(false)}
      />
      {errorMessage}
    </div>
  );
};
