/* eslint-disable jsx-a11y/control-has-associated-label */

import { ErrorType } from '../../types/ErrorType';

type Props = {
  error: ErrorType,
  setError: React.Dispatch<React.SetStateAction<ErrorType>>,
};

/* Add the 'hidden' class to hide the message smoothly */

export const ErrorMessage: React.FC<Props> = ({ error, setError }) => (
  <div className="notification is-danger is-light has-text-weight-normal">
    <button
      type="button"
      className="delete"
      onClick={() => setError(ErrorType.NONE)}
    />
    {error}
  </div>
);
