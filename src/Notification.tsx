import classNames from 'classnames';
import { useEffect, useState } from 'react';

type Props = {
  errorMessage: string,
};

export const Notifications: React.FC<Props> = ({
  errorMessage,
}) => {
  const [isHidden, setisHidden] = useState(true);

  useEffect(() => {
    const notificationCloser = () => {
      const timerId = window.setTimeout(() => {
        setisHidden(true);
      }, 3000);

      window.clearTimeout(timerId);
    };

    if (errorMessage.length > 0) {
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
