import React from 'react';
type Props = {
  isLoading?: boolean;
};
export const Loader: React.FC<Props> = ({ isLoading = false }) => {
  return (
    <div
      data-cy="TodoLoader"
      className={`modal overlay ${isLoading ? '' : 'hidden'}`}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader">
        {/* {isLoading && <div data-cy="TodoLoader">Loading</div>} */}
      </div>
      <div className="loader" />
    </div>
  );
};
