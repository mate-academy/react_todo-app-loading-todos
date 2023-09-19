import classNames from 'classnames';
import React from 'react';

type Props = {
  errorMessage: string,
  hasError: boolean,
  onClick: (v: boolean) => void
};

export const TodoError: React.FC<Props> = ({
  errorMessage, hasError, onClick,
}) => {
  return (
    <div
      className={
        classNames('notification is-danger is-light has-text-weight-normal', {
          hidden: hasError,
        })
      }
    >
      {/* eslint-disable */}
      <button
        type="button"
        className="delete"
        onClick={() => onClick(false)}
      />
      {/* eslint-enable */}
      {errorMessage}
    </div>
  );
};
