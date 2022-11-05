// import { SortParam } from '../../types/SortParam';
import { Nav } from '../Nav';

type Props = {
  numberOfCompletedTodo: number | undefined,
  // setSortBy: React.Dispatch<React.SetStateAction<SortParam>>,
};

export const Footer: React.FC<Props> = ({
  numberOfCompletedTodo,
  // setSortBy,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${numberOfCompletedTodo} items left`}
    </span>

    <Nav /* setSortBy={setSortBy} */ />

    <button
      data-cy="ClearCompletedButton"
      type="button"
      className="todoapp__clear-completed"
    >
      Clear completed
    </button>
  </footer>
);
