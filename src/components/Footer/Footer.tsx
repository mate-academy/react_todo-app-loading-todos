import { Todo } from '../../types/Todo';
import { Filter } from '../Filter';

type Props = {
  data: Todo[];
  setFilter: (value: string) => void;
};

export const Footer: React.FC<Props> = ({ data, setFilter }) => {
  const clearHandler = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const counter = data.filter(todo => {
    return todo.completed !== true;
  });

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {counter.length} items left
      </span>

      <Filter setFilter={setFilter} />

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearHandler}
      >
        Clear completed
      </button>
    </footer>
  );
};
