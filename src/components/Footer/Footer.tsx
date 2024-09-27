import React from 'react';
import { Options } from '../../types/Options';
import { Todo } from '../../types/Todo';
import { FooterFilter } from '../FooterFilter';

type Props = {
  filteredTodo: Todo[];
  selected: Options;
  setSelected: (selected: Options) => void;
};

export const Footer: React.FC<Props> = ({
  filteredTodo,
  selected,
  setSelected,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {filteredTodo.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <FooterFilter selected={selected} setSelected={setSelected} />

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={Options.Completed.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
