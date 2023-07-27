import React, { useCallback } from 'react';
import { Todo } from '../../types/Todo';
import { SORT } from '../../types/SornEnum';
import { TodosFilter } from '../TodosFilter';

type Props = {
  todos: Todo[];
  updateSortField: (term: SORT) => void;
  sortField: SORT;
};

export const Footer: React.FC<Props> = ({
  todos,
  updateSortField,
  sortField,
}) => {
  const countUnfinished = useCallback(
    (listTodo: Todo[]) => {
      return listTodo.map((todo) => todo.completed).filter((todo) => !todo)
        .length;
    },
    [todos],
  );

  const countFinished = useCallback(
    (listTodo: Todo[]) => {
      return listTodo.map((todo) => todo.completed).filter((todo) => todo)
        .length;
    },
    [todos],
  );

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${countUnfinished(todos)} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <TodosFilter updateSortField={updateSortField} sortField={sortField} />
      {/* don't show this button if there are no completed todos */}
      {countFinished(todos) ? (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      ) : (
        ''
      )}
    </footer>
  );
};
