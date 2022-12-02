import React from 'react';
import { Counter } from './Counter';
import { Filter } from './Filter';

export const Footer: React.FC = () => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <Counter />

      <Filter />

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
