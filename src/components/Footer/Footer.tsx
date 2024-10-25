// import React from 'react';
// import { Todo } from '../../types/Todo';
// import { Status } from '../../types/Status';

// interface Props {
//   filterStatus: string;
//   setFilterStatus: (status: Status) => void;
//   todos: Todo[];
// }

// export const Footer: React.FC<Props> = ({
//   filterStatus,
//   setFilterStatus,
//   todos,
// }) => {
//   const filteredActiveTodo = todos.filter((todo: Todo) => !todo.completed);
//   const filteredCompletedTodo = todos.filter((todos: Todo) => todos.completed);

//   return (
//     <footer className="todoapp__footer" data-cy="Footer">
//       <span className="todo-count" data-cy="TodosCounter">
//         {`${filteredActiveTodo.length} items left`}
//       </span>

//       <nav className="filter" data-cy="Filter">
//         {Object.values(Status).map((status: Status) => (
//           <a
//             key={status}
//             href="#/"
//             className={`filter__link ${filterStatus === status ? 'selected' : ''}`}
//             data-cy={`FilterLink${status}`}
//             onClick={() => setFilterStatus(status)}
//           >
//             {status}
//           </a>
//         ))}
//       </nav>

//       <button
//         type="button"
//         className="todoapp__clear-completed"
//         data-cy="ClearCompletedButton"
//         disabled={!filteredCompletedTodo.length}
//       >
//         Clear completed
//       </button>
//     </footer>
//   );
// };

import React from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

interface Props {
  filterStatus: string;
  setFilterStatus: (status: Status) => void;
  todos: Todo[];
}

export const Footer: React.FC<Props> = ({
  filterStatus,
  setFilterStatus,
  todos,
}) => {
  // Rename the parameter in the filter function to avoid shadowing
  const filteredActiveTodo = todos.filter((todo: Todo) => !todo.completed);
  const filteredCompletedTodo = todos.filter(
    (completedTodo: Todo) => completedTodo.completed,
  );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${filteredActiveTodo.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Status).map((status: Status) => (
          <a
            key={status}
            href="#/"
            className={`filter__link ${filterStatus === status ? 'selected' : ''}`}
            data-cy={`FilterLink${status}`}
            onClick={() => setFilterStatus(status)}
          >
            {status}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!filteredCompletedTodo.length}
      >
        Clear completed
      </button>
    </footer>
  );
};
