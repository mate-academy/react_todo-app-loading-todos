import React from 'react';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
  onClearCompleted: (id: number) => void;
  itemsLeft: number;
  status: Status;
  onStatusChange: (status: Status) => void;
  haveCompletedTodos: boolean;
}

const Footer: React.FC<Props> = ({
  todos,
  onClearCompleted,
  itemsLeft,
  status,
  onStatusChange,
  haveCompletedTodos,
}) => {
  const handleClearCompleted = () => {
    const completedTodoIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    completedTodoIds.forEach(id => {
      onClearCompleted(id);
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(Status).map(value => (
          <a
            key={value}
            href={`#${value}`}
            className={`filter__link ${status === value ? 'selected' : ''}`}
            onClick={() => onStatusChange(value)}
            data-cy={`FilterLink${value}`}
          >
            {value}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      {haveCompletedTodos && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
