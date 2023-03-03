/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import { CustomError } from '../types/CustomError';

type Props = {
  customError: CustomError,
  hideError: () => void,
};

export const ErrorNotification: FC<Props> = ({ customError, hideError }) => {
  return (
    <div
      className="notification is-danger is-light has-text-weight-normal"
      hidden={!customError.active}
    >
      <button
        type="button"
        className="delete"
        onClick={hideError}
      />

      <p>
        {customError.text}
      </p>
    </div>
  );
};
