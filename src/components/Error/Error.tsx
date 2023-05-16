/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

interface Props {
  hasError: boolean;
  onClose: () => void;
}

export const Error: React.FC<Props> = ({ hasError, onClose }) => {
  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          'is-hidden': !hasError,
        },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={onClose}
      />
      Failed to connect to server
    </div>
  );
};
