/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { FC } from 'react';

interface ErrorMessageProps {
  hasError: boolean;
  onClose: () => void;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({
  hasError,
  onClose,
}) => {
  return (
    <div className={
      classNames('notification is-danger is-light has-text-weight-normal', {
        hidden: !hasError,
      })
    }
    >
      <button
        type="button"
        className="delete"
        onClick={onClose}
      />
      Unable to connect to server
    </div>
  );
};
