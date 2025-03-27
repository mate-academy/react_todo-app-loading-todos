import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  filteredTodos: Todo[];
  handleTodoStatusChange: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  handleTodoStatusChange,
  handleDeleteTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleTodoStatusChange={handleTodoStatusChange}
            handleDeleteTodo={handleDeleteTodo}
          />
        );
      })}
    </section>
  );
};
