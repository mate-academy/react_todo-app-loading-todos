/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { FC } from 'react';

interface Props {
  hasError: boolean;
  closeErrorMessage: () => void;
}

export const Error: FC<Props> = (
  { hasError, closeErrorMessage },
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
        onClick={() => closeErrorMessage()}
      />
      Unable to connect to server
    </div>
  );
};
