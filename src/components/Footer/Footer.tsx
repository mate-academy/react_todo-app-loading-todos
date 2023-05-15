import { Filter } from '../Filter';

interface Props {
  todosCount: number;
  activeTodosCount: number;
}

export const Footer: React.FC<Props> = ({ todosCount, activeTodosCount }) => {
  return (
    <footer className="todoapp__footer">
      {activeTodosCount && (
        <span className="todo-count">
          {`${activeTodosCount} items left`}
        </span>
      )}

      <Filter />

      {activeTodosCount !== todosCount && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}

    </footer>
  );
};
