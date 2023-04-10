import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ErrorType } from '../../types/ErrorType';
import './ErrorHide.scss';

interface Props {
  errorToShow: ErrorType;
  setErrorToShow: React.Dispatch<React.SetStateAction<ErrorType>>;
}

enum ErrorMessage {
  add = 'Unable to add a todo',
  delete = 'Unable to delete a todo',
  update = 'Unable to update a todo',
  none = '',
}

export const ErrorShow: React.FC<Props> = ({ errorToShow, setErrorToShow }) => {
  const [hasHiddenClass, setHasHiddenClass] = useState<boolean>(false);

  const hideError = () => {
    setHasHiddenClass(true);
    setTimeout(() => setErrorToShow('none'), 300);
  };

  const handleHideError = () => {
    hideError();
  };

  useEffect(() => {
    setTimeout(() => hideError(), 3000);
  }, []);

  return (
    <>
      {errorToShow !== 'none' && (
        <div
          className={classNames(
            'notification',
            'is-danger',
            'is-light',
            'has-text-weight-normal',
            { hidden: hasHiddenClass },
          )}
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            onClick={handleHideError}
          />
          { ErrorMessage[errorToShow] }
          {/* show only one message at a time */}
          {/* Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
        </div>
      )}
    </>
  );
};
