import { FC } from 'react';
import cn from 'classnames';
import { ErrorType } from '../../types/ErrorType';

interface Props {
  error: ErrorType,
  onDeleteError: () => void,

}

export const Error: FC<Props> = (props) => {
  const { error, onDeleteError } = props;

  return (
    <div className={cn(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal', {
        hidden: !error,
      },
    )}
    >
      <button
        type="button"
        className="delete"
        aria-label="close the notification"
        onClick={onDeleteError}
      />

      {`Unable to ${error} a todo`}
    </div>
  );
};
