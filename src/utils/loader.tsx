import React from 'react';
import './loader.scss';

export const Loader: React.FC = () => {
  return (
    <div className="Loader" data-cy="loader">
      <div className="Loader__content" />
    </div>
  );
};
