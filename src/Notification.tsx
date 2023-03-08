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
  const [isHidden, setisHidden] = useState(true);

  useEffect(() => {
    const notificationCloser = () => {
      const timerId = window.setTimeout(() => {
        setisHidden(true);
        setErrorFromServer(false);
      }, 3000);

      window.clearTimeout(timerId);
    };

    if (errorFromServer) {
      setisHidden(false);
      notificationCloser();
    } else {
      setisHidden(true);
    }
  });

  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: isHidden },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="delete"
        onClick={() => setisHidden(true)}
      />
      {`Unable to ${errorMessage} a todo`}
    </div>
  );
};
