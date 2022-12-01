import { Todo } from '../../types/Todo';
import { Navigation } from '../Navigation/Navigation';

type Props = {
  todos: Todo[];
  filterBy: string;
  setFilterBy: (filterBy: string) => void;
};

export const Footer: React.FC<Props> = ({ todos, filterBy, setFilterBy }) => {
  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <Navigation
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
