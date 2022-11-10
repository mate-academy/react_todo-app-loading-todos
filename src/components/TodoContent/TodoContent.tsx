import React from 'react';
import { TodoHeader } from '../TodoHeader';
import { TodoBody } from '../TodoBody';
import { TodoFooter } from '../TodoFooter';

import { Todo } from '../../types/Todo';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
  todos: Todo[],
  countOfTodos: number,
  countOfLeftTodos: number,
  hasActiveTodo: boolean,
  visibleTodos: Todo[],
  filterTodos: (filterBy: FilterStatus) => void;
  filterStatus: FilterStatus,
};

export const TodoContent: React.FC<Props> = React.memo(({
  newTodoField,
  todos,
  countOfTodos,
  countOfLeftTodos,
  hasActiveTodo,
  visibleTodos,
  filterTodos,
  filterStatus,
}) => (
  <div className="todoapp__content">
    <TodoHeader
      newTodoField={newTodoField}
      countOfTodos={countOfTodos}
    />

    {todos.length > 0 && (
      <>
        <TodoBody todos={visibleTodos} />

        <TodoFooter
          filterTodos={filterTodos}
          filterStatus={filterStatus}
          countOfLeftTodos={countOfLeftTodos}
          hasActiveTodo={hasActiveTodo}
        />
      </>
    )}
  </div>
));
