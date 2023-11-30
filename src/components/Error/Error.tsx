import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  error: string
};

export const Error: React.FC<Props> = ({ error }) => {
  const [isHidden, setIsHidden] = useState(false);

  setTimeout(() => {
    setIsHidden(true);
  }, 3000);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: isHidden },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsHidden(true)}
        aria-label="Close error notification"
      />
      {error}
    </div>
  );
};
