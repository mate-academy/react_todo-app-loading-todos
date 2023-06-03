/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';

interface Props {
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
}

export const ErrorMessage: FC<Props> = ({ errorMessage, setErrorMessage }) => {
  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <button
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
      />
      {errorMessage}
    </div>
  );
};
