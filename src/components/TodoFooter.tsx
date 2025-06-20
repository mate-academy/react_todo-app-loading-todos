import { useState } from 'react';
import { filterTodos } from '../utils/filterTodos';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { TodoStatus } from '../types/TodoStatus';

type TodoFooterProps = {
  todos: Todo[];
  setVisibleTodos: (filteredList: Todo[]) => void;
};

export const TodoFooter: React.FC<TodoFooterProps> = ({
  todos,
  setVisibleTodos,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<TodoStatus>(
    TodoStatus.All,
  );

  const quantityOfTasks = todos.filter(todo => todo.completed === false).length;
  const filterTypes = Object.values(TodoStatus);

  return (
    /* Hide the footer if there are no todos */
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${quantityOfTasks} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filterTypes.map((filterType, index) => (
          <a
            href="#/"
            key={index}
            className={classNames('filter__link', {
              selected: selectedStatus === filterType,
            })}
            data-cy={`FilterLink${filterType}`}
            onClick={() => {
              const filteredList = filterTodos(todos, filterType);

              setVisibleTodos(filteredList);
              setSelectedStatus(filterType);
            }}
          >
            {filterType}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
