import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import { FilterType } from '../../types/FilterEnum';

type Props = {
  todos: Todo[];
  filter: FilterType;
};

export const ToodList: React.FC<Props> = ({ todos, filter }) => {
  const filteredTodoList: Todo[] = useMemo(() => {
    return todos.filter(({ completed }) => {
      switch (filter) {
        case FilterType.All:
          return true;

        case FilterType.Active:
          return !completed;

        case FilterType.Completed:
          return completed;

        default:
          return true;
      }
    });
  }, [todos, filter]);

  return (
    <section>
      {filteredTodoList.map((todo: Todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
