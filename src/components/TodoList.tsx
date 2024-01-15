import React, { useMemo } from 'react';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';
import { getfilterBy } from '../utils/FilterBy';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[]
  filterBy: Filter
};

export const TodoList: React.FC<Props> = ({
  todos,
  filterBy,
}) => {
  const filteredTodos = useMemo(() => {
    return getfilterBy(todos, filterBy);
  }, [todos, filterBy]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};
