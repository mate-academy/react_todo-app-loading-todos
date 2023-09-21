import React from 'react';
import classNames from 'classnames';

interface Props {
  errorMessage: string,
}

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
}) => {
  return (
    <div className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: !errorMessage },
    )}
    >
      {errorMessage}
    </div>
  );
};
