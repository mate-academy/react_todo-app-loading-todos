import { FilterTypes } from '../types/FilterTypes';
import { Todo } from '../types/Todo';

import { TodoFilter } from './TodoFilter';

type Props = {
  activeTodos: Todo[],
  filterValue: FilterTypes,
  setFilterValue: (newValue: FilterTypes) => void,
  todos: Todo[],
};

export const TodoFooter: React.FC<Props> = ({
  activeTodos,
  filterValue,
  setFilterValue,
  todos,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {activeTodos.length}
        {' '}
        items left
      </span>

      <TodoFilter filterValue={filterValue} setFilterValue={setFilterValue} />

      {/* don't show this button if there are no completed todos */}
      {todos.some(todo => todo.completed) && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}

    </footer>
  );
};
