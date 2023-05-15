/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';

interface Props {
  setHasError: (boolean: boolean) => void
}

export const ErrorNotification:FC<Props> = ({ setHasError }) => {
  return (
    <div
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        type="button"
        className="delete"
        onClick={() => setHasError(false)}
      />
      Unable to load todos
    </div>
  );
};
