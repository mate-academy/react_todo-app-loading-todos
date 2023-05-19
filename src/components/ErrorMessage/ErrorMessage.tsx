/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';

interface Props {
  setHasError: (boolean: boolean) => void
}

export const ErrorMessage:FC<Props> = ({ setHasError }) => {
  return (
    <div
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        type="button"
        className="delete"
        onClick={() => setHasError(false)}
      />
      {/* show only one message at a time */}
      Unable to load a todo
    </div>
  );
};
