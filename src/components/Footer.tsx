import React from 'react';
import { FilterTypes } from '../types/Filter';
import { Todo } from '../types/Todo';
import { Filter } from './Filter';

interface Props {
  todos: Todo[],
  tabs: FilterTypes[],
  selectedTabId: string,
  onTabSelected: (value: FilterTypes) => void,
}

export const Footer: React.FC<Props> = ({
  todos,
  tabs,
  selectedTabId,
  onTabSelected,
}) => {
  const notCompleted = todos.filter((todo) => todo.completed === false);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompleted.length} items left`}
      </span>

      <Filter
        tabs={tabs}
        selectedTabId={selectedTabId}
        onTabSelected={onTabSelected}
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
