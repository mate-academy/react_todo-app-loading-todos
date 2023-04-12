/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { Error } from '../../types/Error';

interface Props {
  error: Error;
  setError: (error: Error) => void;
}

export const Notification: React.FC<Props> = ({ error, setError }) => (
  <div
    className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !error },
    )}
  >
    <button
      type="button"
      className="delete"
      onClick={() => setError(Error.Clear)}
    />
    Unable to get a todo
  </div>
);
