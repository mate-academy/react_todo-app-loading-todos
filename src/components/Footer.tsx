// import React from 'react';
// import { Todo } from '../types/Todo';

// interface Props {
//   filter: 'all' | 'active' | 'completed';
//   setFilter: (filter: 'all' | 'active' | 'completed') => void;
// }

// export const Footer: React.FC<Props> = ({ filter, setFilter }) => (
//   <div className="filter">
//     <button
//       className={filter === 'all' ? 'selected' : ''}
//       onClick={() => setFilter('all')}
//     >
//       All
//     </button>
//     <button
//       className={filter === 'active' ? 'selected' : ''}
//       onClick={() => setFilter('active')}
//     >
//       Active
//     </button>
//     <button
//       className={filter === 'completed' ? 'selected' : ''}
//       onClick={() => setFilter('completed')}
//     >
//       Completed
//     </button>
//   </div>
// );

import { Todo } from '../types/Todo';

interface FooterProps {
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  todos: Todo[];
  onClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  filter,
  setFilter,
  todos,
  onClick,
}) => {
  const activeTodo = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodo} {activeTodo === 1 ? 'item' : 'items'} left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      {completedTodos > 0 && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={onClick}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
