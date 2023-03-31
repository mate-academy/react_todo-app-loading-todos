import { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { Filters } from '../../utils/enums';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
  filterBy: Filters;
}

export const TodoList: React.FC<Props> = ({ todos, filterBy }) => {
  const filteredTodos = useMemo(
    () => todos.filter(({ completed }) => {
      switch (filterBy) {
        case Filters.All: return true;
        case Filters.Active: return !completed;
        case Filters.Completed: return completed;
        default: return true;
      }
    }),
    [todos, filterBy],
  );

  return (
    <section className="todoapp__main">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};
