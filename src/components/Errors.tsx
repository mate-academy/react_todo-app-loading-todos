import { FC } from 'react';
import cn from 'classnames';

type Props = {
  showError: boolean,
  setShowError: (value: boolean) => void,
  errorMessage: string,
};

export const Errors: FC<Props> = ({
  showError, setShowError, errorMessage,
}) => (
  <div
    data-cy="ErrorNotification"
    className={cn(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal', {
        hidden: !showError,
      },
    )}
  >
    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => setShowError(false)}
    />
    {errorMessage}
  </div>
);
