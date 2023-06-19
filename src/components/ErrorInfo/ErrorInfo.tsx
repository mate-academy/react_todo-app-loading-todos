/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import cn from 'classnames';
import { ErrorInfoProps } from './ErrorInfoProps';

export const ErrorInfo: FC<ErrorInfoProps> = ({
  visibleError,
  setVisibleError,
}) => {
  const removeErrorOnClick = () => {
    setVisibleError('');
  };

  setTimeout(() => {
    if (visibleError) {
      removeErrorOnClick();
    }
  }, 3000);

  return (
    <div className={cn(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      {
        hidden: !visibleError,
      },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={removeErrorOnClick}
      />

      {visibleError}

      <br />
    </div>
  );
};
