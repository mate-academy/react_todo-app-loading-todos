import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

export const Errors: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 3000);
  }, []);

  const onCloseClick = () => {
    setVisible(true);
  };

  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { visible },
      )}
    >
      <button
        type="button"
        className="delete"
        aria-label="Close error"
        onClick={onCloseClick}
      />
      {/* show only one message at a time */}
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
