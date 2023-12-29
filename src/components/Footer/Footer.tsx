import { FilterType } from '../../types/FilterType';
import { useTodos } from '../../context';
import { Filter } from '../Filter';

export const Footer = () => {
  const { inProgress } = useTodos();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${inProgress} ${inProgress <= 1 ? 'item' : 'items'} left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {(Object.keys(FilterType) as Array<keyof typeof FilterType>)
          .map((key) => (
            <Filter filterItem={key} key={key} />
          ))}
      </nav>

      { inProgress > 0 && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
