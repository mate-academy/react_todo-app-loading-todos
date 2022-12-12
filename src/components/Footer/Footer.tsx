import React from 'react';

import { Filter } from '../Filter';

export const Footer: React.FC = () => (

  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="todosCounter">
      4 items left
    </span>

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
