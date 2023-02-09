import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ErrorsEnum } from '../../types/ErrorsEnum';

type Props = {
  error: ErrorsEnum | null;
};

export const Errors: React.FC<Props> = ({ error }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className={classNames(
            'notification is-danger is-light has-text-weight-normal',
          )}
        >
          <button
            type="button"
            className="delete"
            aria-label="Close error"
            onClick={() => {
              setIsVisible(false);
            }}
          />

          {error}
        </div>
      )}
    </>
  );
};
