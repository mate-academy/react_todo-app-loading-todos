import React from 'react';

export const UserWarning: React.FC = () => {
  return (
    <div
      data-cy="UserWarning"
      className="notification is-warning is-light"
    >
      Please enter a valid USER_ID
    </div>
  );
};
