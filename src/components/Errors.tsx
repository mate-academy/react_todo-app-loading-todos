/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { ErrorType } from '../types/ErrorType';

type Props = {
  errorMessage: ErrorType | null,
  error: boolean,
  setError: (error: boolean) => void,
};

export const Errors: React.FC<Props> = ({ error, errorMessage, setError }) => {
  return (
    <div
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !error,
      })}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setError(false)}
      />
      {errorMessage}
    </div>
  );
};
