import {
  FC,
  useState,
  useEffect,
} from 'react';
import classNames from 'classnames';

type Props = {
  errorMessage: string;
};

export const ErrorNotification: FC<Props> = ({ errorMessage }) => {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosed(true);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [isClosed]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: isClosed },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        aria-label="delete"
        className="delete"
        onClick={() => setIsClosed(true)}
      />

      {errorMessage}
    </div>
  );
};
