import React, { memo, useEffect } from 'react';
import classnames from 'classnames';

type Props = {
  error: string;
  onClosingErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const ErrorNotification: React.FC<Props> = memo((props) => {
  const { error, onClosingErrorMessage } = props;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClosingErrorMessage('');
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className={classnames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onClosingErrorMessage('')}
      />
      {error}
    </div>
  );
});
