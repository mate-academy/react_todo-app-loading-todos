import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

type Props = {
  errorMessage: string;
};

export const ErrorNotification: FC<Props> = ({ errorMessage }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setIsVisible(true);
    }

    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }, [errorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !isVisible,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsVisible(false)}
      />
      {errorMessage}
    </div>
  );
};
