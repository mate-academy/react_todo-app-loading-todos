/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useEffect } from 'react';

type Props = {
  isError: boolean,
  setIsError: (value: boolean) => void;
  errorText: string,
};

export const TodoErrorNotification: React.FC<Props> = ({
  isError,
  setIsError,
  errorText,
}) => {
  useEffect(() => {
    const timer = window.setTimeout(() => setIsError(false), 3000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !isError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsError(false)}
      />
      {errorText}
    </div>
  );
};
