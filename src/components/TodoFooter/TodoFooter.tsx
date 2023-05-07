import { FC } from 'react';
import { FilterTodo } from '../FilterTodo';

interface Props {
  activeTodosCount: number
}

export const TodoFooter: FC<Props> = ({
  activeTodosCount,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodosCount} items left`}
      </span>

      <FilterTodo />

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
