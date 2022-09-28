/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';

type Props = {
  errorMessage: string;
};

export const ErrorNotification: React.FC<Props> = ({ errorMessage }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      />

      {errorMessage}
    </div>
  );
};
