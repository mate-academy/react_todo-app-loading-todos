import { FC } from 'react';
import { FilterTodo } from '../FilterTodo';

interface Props {
  count: number
}

export const TodoFooter: FC<Props> = ({
  count,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${count} items left`}
      </span>

      <FilterTodo />

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
