import React, { memo } from 'react';

export const Loader: React.FC = memo(() => {
  return (
    <div data-cy="TodoLoader" className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
});
