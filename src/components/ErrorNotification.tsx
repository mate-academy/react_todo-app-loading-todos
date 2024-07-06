import React from 'react';
import classNames from 'classnames';

type Props = {
  hasError: boolean;
  setHasError: () => void;
  titleError: boolean;
  todosError: boolean;
};

export const ErrorNotification: React.FC<Props> = ({
  hasError,
  setHasError,
  titleError,
  todosError,
}) => (
  <div
    data-cy="ErrorNotification"
    className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: hasError === false },
    )}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => setHasError}
    />
    {todosError && (
      <>
        Unable to load todos
        <br />
      </>
    )}
    {titleError && (
      <>
        Title should not be empty
        <br />
      </>
    )}
  </div>
);
