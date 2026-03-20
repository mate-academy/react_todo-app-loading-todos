import classNames from 'classnames';
import { useMemo } from 'react';

type Props = {
  error: string;
  onErrorClose: () => void;
};

export const ErrorNotification = ({ error, onErrorClose }: Props) =>
  useMemo(
    () => (
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={onErrorClose}
        />
        {error}
      </div>
    ),
    [error, onErrorClose],
  );
