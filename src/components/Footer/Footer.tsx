import { Dispatch, FC, SetStateAction } from 'react';
import { Filter } from '../Filter/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  initialTodos: Todo[];
  onFilterSelect: Dispatch<SetStateAction<Todo[]>>;
};

export const Footer: FC<Props> = ({ initialTodos, onFilterSelect }) => {
  const activeTodos = initialTodos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <Filter onFilterSelect={onFilterSelect} todos={initialTodos} />

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
