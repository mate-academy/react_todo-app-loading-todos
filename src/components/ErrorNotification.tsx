/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
// eslint-disable-next-line import/no-cycle
import { ErrorType } from '../App';

type Props = {
  error: ErrorType | null,
  onError(type: ErrorType | null): void,
};

export const ErrorNotification: React.FC<Props> = ({ error, onError }) => {
  return (
    <div className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      {
        hidden: !error,
      },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => onError(null)}
      />
      {error === ErrorType.Get && 'Unable to load a todo'}
      {error === ErrorType.Post && 'Unable to add a todo'}
      {error === ErrorType.Delete && 'Unable to delete a todo'}
      {error === ErrorType.Patch && 'Unable to update a todo'}
    </div>
  );
};
