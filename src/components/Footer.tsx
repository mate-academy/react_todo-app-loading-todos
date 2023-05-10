import { TodoFilter } from './TodoFilter';

type Props = {
  setFilterValue: (filterValue: string) => void;
  filterValue: string;
};

export const Footer: React.FC <Props> = ({ setFilterValue, filterValue }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      <TodoFilter setFilterValue={setFilterValue} filterValue={filterValue} />
      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
