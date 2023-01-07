import { useEffect, useState } from 'react';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  message: string;
};

const Warning: React.FC<Props> = ({ message }) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (message) {
      setIsShown(true);
      setTimeout(() => {
        setIsShown(false);
      }, 3000);
    } else {
      setIsShown(false);
    }
  }, [message]);

  return (
    <div
      data-cy="ErrorNotification"
      className={
        classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !isShown },
        )
      }
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setIsShown(false);
        }}
      />

      {message}
    </div>
  );
};

export default Warning;
// Unable to add a todo
// Unable to delete a todo
// Unable to update a todo
