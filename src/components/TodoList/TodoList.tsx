import { useMemo, useState } from 'react';
import { Todo, FilterOption } from '../../types';
import { getFilteredTodos } from '../../utils';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  filterOption: FilterOption;
};

export const TodoList: React.FC<Props> = ({ todos, filterOption }) => {
  const [editingTodoId] = useState<number | null>(null);
  const [loadingTodoId] = useState<number[]>([]);

  const filtredTodos = useMemo(
    () => getFilteredTodos(todos, filterOption),
    [todos, filterOption],
  );

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filtredTodos.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={editingTodoId === todo.id}
            isLoading={loadingTodoId.includes(todo.id)}
          />
        );
      })}
    </section>
  );
};
