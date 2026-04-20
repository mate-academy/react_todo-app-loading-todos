import classNames from 'classnames';
import { useEffect, useState } from 'react';

export enum ErrorMessages {
  NONE = '',
  FAILED_LOAD = 'Unable to load todos',
  EMPTY_TITLE = 'Title should not be empty',
  FAILED_ADD = 'Unable to add a todo',
  FAILED_DELETE = 'Unable to delete a todo',
  FAILED_UPDATE = 'Unable to update a todo',
}

type Props = {
  errorMessage: ErrorMessages;
};

const DISPLAY_TIME = 3000;

export const ErrorNotification: React.FC<Props> = ({ errorMessage }) => {
  /*
   * Interesting! This makes an element appear spontaneously,
   * the animation doesn't apply!
   */
  /*
  const [isHidden, setIsHidden] =
    useState(errorMessage === ErrorMessages.NONE);
  useEffect(() => {
    if (!isHidden) {
      setTimeout(() => {
        setIsHidden(true);
      }, DISPLAY_TIME);
    }
  }, []);
   */

  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    if (errorMessage !== ErrorMessages.NONE) {
      setIsHidden(false);

      setTimeout(() => {
        setIsHidden(true);
      }, DISPLAY_TIME);
    }
  }, [errorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: isHidden,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsHidden(true)}
      />
      {errorMessage}
    </div>
  );
};
