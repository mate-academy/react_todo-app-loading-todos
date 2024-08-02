import React = require('react');
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
   preparedTodos: Todo[];
 }

export const TodoList: React.FC<Props> = ({ preparedTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {preparedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
