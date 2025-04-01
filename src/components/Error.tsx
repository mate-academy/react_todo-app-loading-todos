import classNames from 'classnames';
import { ErrorMessage } from '../types/Todo';

type Props = {
  errorMessage: ErrorMessage;
  onHideError: () => void;
};

export const Error: React.FC<Props> = ({
  errorMessage,
  onHideError,
}: Props) => (
  <div
    data-cy="ErrorNotification"
    className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !errorMessage },
    )}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={onHideError}
    />
    {/* show only one message at a time */}
    {errorMessage}
  </div>
);
