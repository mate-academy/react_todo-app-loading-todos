/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';

interface Props {
  hasError: boolean;
  onCloseError: () => void;
}

export const Error: React.FC<Props> = ({
  hasError,
  onCloseError,
}) => {
  return (
    <div className={cn(
      'notification', 'is-danger', 'is-light',
      'has-text-weight-normal', {
        'is-hidden': !hasError,
      },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={onCloseError}
      />

      {/* show only one message at a time */}
      Failed to connect to server
      {/* Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
