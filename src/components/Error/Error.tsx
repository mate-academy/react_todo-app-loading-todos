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
        hidden: !hasError,
      },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={onCloseError}
      />
      Failed to connect to server
    </div>
  );
};
