import React from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { FilteredTodos } from '../../utils/FilteredTodos';
import { TodoItem } from '../TodoItem';

interface TodoListProps {
  todos: Todo[];
  selectedFilter: Status;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedFilter,
}) => {
  const filteredTodos = FilteredTodos(todos, selectedFilter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
