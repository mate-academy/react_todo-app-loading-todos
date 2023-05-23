import React from 'react';
import '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};

export default TodoList;
