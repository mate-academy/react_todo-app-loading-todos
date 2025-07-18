import { Filter } from '../filter/filter';

type Props = {
  filter: (query: string) => void;
  unCompletedCount: number | undefined;
};

export const Footer: React.FC<Props> = ({ filter, unCompletedCount }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {unCompletedCount} items left
      </span>

      <Filter filter={filter} />

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
