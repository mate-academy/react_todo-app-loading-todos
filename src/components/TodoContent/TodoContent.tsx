import React from 'react';
import { TodoHeader } from '../TodoHeader';
import { TodoBody } from '../TodoBody';
import { TodoFooter } from '../TodoFooter';

import { Todo } from '../../types/Todo';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
  todos: Todo[],
  visibleTodos: Todo[],
  filterTodos: (filterBy: FilterStatus) => void;
  filterStatus: FilterStatus,
};

export const TodoContent: React.FC<Props> = React.memo(({
  newTodoField,
  todos,
  visibleTodos,
  filterTodos,
  filterStatus,
}) => {
  const countOfTodos = todos.length;

  return (
    <div className="todoapp__content">
      <TodoHeader newTodoField={newTodoField} />

      {
        todos.length > 0
        && (
          <>
            <TodoBody todos={visibleTodos} />

            <TodoFooter
              filterTodos={filterTodos}
              filterStatus={filterStatus}
              countOfTodos={countOfTodos}
            />
          </>
        )
      }
    </div>
  );
});
