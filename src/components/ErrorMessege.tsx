import React from 'react';
import cn from 'classnames';

type Props = {
  visibleError: string;
  setVisibleError: (value: string) => void;
};

export const Messege: React.FC<Props> = ({ visibleError, setVisibleError }) => {
  const handleRemoveErrorMsg = () => {
    setVisibleError('');
  };

  setTimeout(() => {
    if (visibleError) {
      handleRemoveErrorMsg();
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
        aria-label="Delete"
        onClick={handleRemoveErrorMsg}
      />

      {/* show only one message at a time */}
      {visibleError}
    </div>
  );
};
