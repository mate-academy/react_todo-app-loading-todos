import { Todo } from '../../types/Todo';
import { TodoFilter } from '../TodoFilter';

interface PropsTodoAppFooter {
  todos: Todo[];
  filtered: string,
  setFiltered(type: string): void;
}

export const TodoAppFooter = ({
  todos, filtered, setFiltered,
}: PropsTodoAppFooter) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <TodoFilter filtered={filtered} setFiltered={setFiltered} />

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
