import classNames from 'classnames';
import { useEffect, useState } from 'react';

type Props = {
  errorFromServer: boolean,
  setErrorFromServer: (errorFromServer: boolean) => void,
  errorMessage: string,
};

export const Notifications: React.FC<Props> = ({
  errorFromServer,
  setErrorFromServer,
  errorMessage,
}) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const notificationCloser = () => {
      const timerId = window.setTimeout(() => {
        setHidden(true);
        setErrorFromServer(false);
      }, 3000);

      window.clearTimeout(timerId);
    };

    if (errorFromServer) {
      setHidden(false);
      notificationCloser();
    } else {
      setHidden(true);
    }
  });

  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="delete"
        onClick={() => setHidden(true)}
      />
      {`Unable to ${errorMessage} a todo`}
    </div>
  );
};
