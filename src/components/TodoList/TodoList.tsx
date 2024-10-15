import { FC, useMemo, useState } from 'react';
import './TodoList.scss';
import { Todo, StatusFilter } from '../../types';
import { filterTodos } from '../../utils';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
  statusFilter: StatusFilter;
}

export const TodoList: FC<Props> = ({ todos, statusFilter }) => {
  const [editingTodo] = useState<Todo | null>(null);
  const [loadingTodoIds] = useState<number[]>([]);

  const visibleTodos = useMemo(
    () => filterTodos(todos, statusFilter),
    [todos, statusFilter],
  );

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        const isCurrentTodoBeingEditing = editingTodo?.id === todo.id;
        const isCurrentTodoLoading = loadingTodoIds.includes(todo.id);

        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            isCurrentTodoBeingEditing={isCurrentTodoBeingEditing}
            isCurrentTodoLoading={isCurrentTodoLoading}
          />
        );
      })}
    </section>
  );
};
