import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { SortTypes } from '../../types/SortTypes';
import { Nav } from '../Nav';

interface Props {
  todos: Todo[];
  onChangeFilter: (filter: SortTypes) => void;
  activeFilter: SortTypes;
}

export const Footer: FC<Props> = ({ todos, onChangeFilter, activeFilter }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <Nav
        onChangeFilter={onChangeFilter}
        activeFilter={activeFilter}
      />
    </footer>
  );
};
