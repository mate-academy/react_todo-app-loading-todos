import { Dispatch, FC, SetStateAction } from 'react';
import { Filter } from '../Filter/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onFilterSelect: Dispatch<SetStateAction<Todo[]>>;
};

export const Footer: FC<Props> = ({ todos: filteredTodos, onFilterSelect }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        3 items left
      </span>

      <Filter onFilterSelect={onFilterSelect} todos={filteredTodos} />

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
