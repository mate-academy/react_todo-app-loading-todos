import { memo } from 'react';
import { TodosFilter } from '../TodosFilter';
import { ShowTodos } from '../../types/StatusTodo';

type Props = {
  activeTodosCounter: number,
  complitedTodosCounter: number,
  selectedTodos: ShowTodos,
  handleSelectedTodos: (event: React.MouseEvent<HTMLAnchorElement>) => void,
};
export const Footer:React.FC<Props> = memo(({
  activeTodosCounter,
  complitedTodosCounter,
  selectedTodos,
  handleSelectedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCounter === 1
          ? `${activeTodosCounter} item left`
          : `${activeTodosCounter} items left`}
      </span>

      <TodosFilter
        selectedTodos={selectedTodos}
        handleSelectedTodos={handleSelectedTodos}
      />

      {/* don't show this button if there are no completed todos */}
      {complitedTodosCounter > 0 && (
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
});
