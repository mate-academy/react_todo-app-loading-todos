import { Todo } from '../../types/Todo';
import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';

export interface TodoFooterProps {
  filteredTodos: Todo[];
}

export const TodoList: React.FC<TodoFooterProps> = ({ filteredTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/*This is a completed todo */}
      {filteredTodos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
