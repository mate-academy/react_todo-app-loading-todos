/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { FC } from 'react';

interface Props {
  hasError: boolean;
  onClose: () => void;
}

export const Error: FC<Props> = (
  { hasError, onClose },
) => {
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
