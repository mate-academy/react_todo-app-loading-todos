import React, { ReactNode, useState } from 'react';
import cn from 'classnames';

type Props = {
  children: ReactNode
};

export const Error: React.FC<Props> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  setTimeout(() => {
    setIsVisible(false);
  }, 3000);

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !isVisible,
      })}
    >
      <button
        aria-label="none"
        type="button"
        className="delete"
        onClick={handleClick}
      />
      {children}
    </div>
  );
};
